import { Injectable } from '@nestjs/common';
import { BaseModel } from '../interface';
import { PrismaService } from 'libs/shared/database/prisma/prisma.service';

export interface FindManyOptions {
  where?: any;
  select?: any;
  include?: any;
  orderBy?: any;
  skip?: number;
  take?: number;
  cursor?: any;
}

export interface FindOneOptions {
  where: any;
  select?: any;
  include?: any;
}

export interface UpdateOptions<T = any> {
  where: any;
  data: Partial<T>;
  select?: any;
  include?: any;
}

export interface DeleteOptions {
  where: any;
}

@Injectable()
export abstract class BaseRepository<T extends BaseModel> {
  protected abstract readonly modelName: string;

  constructor(protected readonly prisma: PrismaService) {}

  /**
   * Get the Prisma model dynamically
   */
  protected get model() {
    return (this.prisma as any)[this.modelName];
  }

  /**
   * Create a new record
   */
  async create(
    data: Omit<
      T,
      | 'id'
      | 'createdAt'
      | 'updatedAt'
      | 'deletedAt'
    >,
    options?: { select?: any; include?: any },
  ): Promise<T> {
    return this.model.create({
      data,
      ...options,
    });
  }

  /**
   * Find many records (excludes soft-deleted by default)
   */
  async findMany(
    options?: FindManyOptions & { includeSoftDeleted?: boolean },
  ): Promise<T[]> {
    const {
      includeSoftDeleted = false,
      where = {},
      ...restOptions
    } = options || {};

    const whereClause = includeSoftDeleted
      ? where
      : { ...where, deletedAt: null };

    return this.model.findMany({
      where: whereClause,
      ...restOptions,
    });
  }

  /**
   * Find one record (excludes soft-deleted by default)
   */
  async findOne(
    options: FindOneOptions & { includeSoftDeleted?: boolean },
  ): Promise<T | null> {
    const { includeSoftDeleted = false, where, ...restOptions } = options;

    const whereClause = includeSoftDeleted
      ? where
      : { ...where, deletedAt: null };

    return this.model.findFirst({
      where: whereClause,
      ...restOptions,
    });
  }

  /**
   * Find one record by ID (excludes soft-deleted by default)
   */
  async findById(
    id: string,
    options?: { select?: any; include?: any; includeSoftDeleted?: boolean },
  ): Promise<T | null> {
    const { includeSoftDeleted = false, ...restOptions } = options || {};

    const whereClause = includeSoftDeleted ? { id } : { id, deletedAt: null };

    return this.model.findFirst({
      where: whereClause,
      ...restOptions,
    });
  }

  /**
   * Find unique record (excludes soft-deleted by default)
   */
  async findUnique(
    options: FindOneOptions & { includeSoftDeleted?: boolean },
  ): Promise<T | null> {
    const { includeSoftDeleted = false, where, ...restOptions } = options;

    // For findUnique, we need to use findFirst with additional deletedAt filter
    // since findUnique doesn't support complex where clauses
    return this.findOne({ where, includeSoftDeleted, ...restOptions });
  }

  /**
   * Update a record
   */
  async update(options: UpdateOptions<T>): Promise<T> {
    const { where, data, ...restOptions } = options;

    return this.model.update({
      where: { ...where, deletedAt: null },
      data: {
        ...data,
        updatedAt: new Date(),
      },
      ...restOptions,
    });
  }

  /**
   * Update by ID
   */
  async updateById(
    id: string,
    data: Partial<T>,
    options?: { select?: any; include?: any },
  ): Promise<T> {
    return this.update({
      where: { id },
      data,
      ...options,
    });
  }

  /**
   * Update many records
   */
  async updateMany(where: any, data: Partial<T>): Promise<{ count: number }> {
    return this.model.updateMany({
      where: { ...where, deletedAt: null },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  /**
   * Soft delete a record
   */
  async softDelete(options: DeleteOptions): Promise<T> {
    const { where } = options;

    return this.model.update({
      where: { ...where, deletedAt: null },
      data: {
        deletedAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  /**
   * Soft delete by ID
   */
  async softDeleteById(id: string): Promise<T> {
    return this.softDelete({ where: { id } });
  }

  /**
   * Soft delete many records
   */
  async softDeleteMany(where: any): Promise<{ count: number }> {
    return this.model.updateMany({
      where: { ...where, deletedAt: null },
      data: {
        deletedAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  /**
   * Restore a soft-deleted record
   */
  async restore(options: DeleteOptions): Promise<T> {
    const { where } = options;

    return this.model.update({
      where: { ...where, deletedAt: { not: null } },
      data: {
        deletedAt: null,
        updatedAt: new Date(),
      },
    });
  }

  /**
   * Restore by ID
   */
  async restoreById(id: string): Promise<T> {
    return this.restore({ where: { id } });
  }

  /**
   * Restore many records
   */
  async restoreMany(where: any): Promise<{ count: number }> {
    return this.model.updateMany({
      where: { ...where, deletedAt: { not: null } },
      data: {
        deletedAt: null,
        updatedAt: new Date(),
      },
    });
  }

  /**
   * Hard delete a record (permanently remove from database)
   */
  async hardDelete(options: DeleteOptions): Promise<T> {
    const { where } = options;
    return this.model.delete({ where });
  }

  /**
   * Hard delete by ID
   */
  async hardDeleteById(id: string): Promise<T> {
    return this.hardDelete({ where: { id } });
  }

  async hardDeleteByIds(ids: string[]): Promise<{ count: number }> {
    return this.hardDeleteMany({ id: { in: ids } });
  }

  /**
   * Hard delete many records
   */
  async hardDeleteMany(where: any): Promise<{ count: number }> {
    return this.model.deleteMany({ where });
  }

  /**
   * Count records (excludes soft-deleted by default)
   */
  async count(where?: any, includeSoftDeleted = false): Promise<number> {
    const whereClause = includeSoftDeleted
      ? where
      : { ...where, deletedAt: null };

    return this.model.count({ where: whereClause });
  }

  /**
   * Check if record exists (excludes soft-deleted by default)
   */
  async exists(where: any, includeSoftDeleted = false): Promise<boolean> {
    const count = await this.count(where, includeSoftDeleted);
    return count > 0;
  }

  /**
   * Upsert a record
   */
  async upsert(
    where: any,
    create: Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
    update: Partial<T>,
    options?: { select?: any; include?: any },
  ): Promise<T> {
    return this.model.upsert({
      where,
      create,
      update: {
        ...update,
        updatedAt: new Date(),
      },
      ...options,
    });
  }

  /**
   * Find all soft-deleted records
   */
  async findSoftDeleted(
    options?: Omit<FindManyOptions, 'where'> & { where?: any },
  ): Promise<T[]> {
    const { where = {}, ...restOptions } = options || {};

    return this.model.findMany({
      where: { ...where, deletedAt: { not: null } },
      ...restOptions,
    });
  }

  /**
   * Get paginated results
   */
  async paginate(
    page: number = 1,
    limit: number = 10,
    options?: FindManyOptions & { includeSoftDeleted?: boolean },
  ): Promise<{
    data: T[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  }> {
    const {
      includeSoftDeleted = false,
      where = {},
      ...restOptions
    } = options || {};

    const skip = (page - 1) * limit;
    const whereClause = includeSoftDeleted
      ? where
      : { ...where, deletedAt: null };

    const [data, total] = await Promise.all([
      this.model.findMany({
        where: whereClause,
        skip,
        take: limit,
        ...restOptions,
      }),
      this.model.count({ where: whereClause }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  // /**
  //  * Execute a transaction
  //  */
  // async transaction<R>(fn: (prisma: any) => Promise<R>): Promise<R> {
  //   return this.prisma.$transaction(fn);
  // }

  // /**
  //  * Execute raw query
  //  */
  // async raw<R = any>(query: string, ...values: any[]): Promise<R> {
  //   return this.prisma.$queryRawUnsafe(query, ...values);
  // }
}
