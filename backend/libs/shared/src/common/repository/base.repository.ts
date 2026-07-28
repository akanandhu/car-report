import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma/prisma.service';
import { BaseModel } from '../interface';
import {
  CreateDataI,
  DeleteOptionsI,
  FindManyOptionsI,
  FindOneOptionsI,
  PaginatedResultI,
  QueryObjectI,
  RepositoryDelegateI,
  SelectOptionsI,
  UpdateOptionsI,
} from './base-repository.types';

export type {
  FindManyOptionsI,
  FindOneOptionsI,
  PaginatedResultI,
  UpdateOptionsI,
} from './base-repository.types';

@Injectable()
export abstract class BaseRepository<T extends BaseModel> {
  protected abstract readonly modelName: string;
  protected readonly softDeleteEnabled: boolean = true;

  constructor(protected readonly prisma: PrismaService) {}

  protected get model(): RepositoryDelegateI<T> {
    // Prisma has no common delegate type for dynamically selected models.
    const delegates = this.prisma as unknown as Record<
      string,
      RepositoryDelegateI<T>
    >;
    return delegates[this.modelName];
  }

  private activeWhere(
    where: QueryObjectI = {},
    includeSoftDeleted = false,
  ): QueryObjectI {
    return !this.softDeleteEnabled || includeSoftDeleted
      ? where
      : { ...where, deletedAt: null };
  }

  private requireSoftDelete(operation: string): void {
    if (!this.softDeleteEnabled) {
      throw new Error(
        `${operation} is not supported on model '${this.modelName}' (no deletedAt column)`,
      );
    }
  }

  async create(data: CreateDataI<T>, options?: SelectOptionsI): Promise<T> {
    return this.model.create({ data, ...options });
  }

  async findMany(options: FindManyOptionsI = {}): Promise<T[]> {
    const { includeSoftDeleted = false, where = {}, ...rest } = options;
    return this.model.findMany({
      where: this.activeWhere(where, includeSoftDeleted),
      ...rest,
    });
  }

  async findOne(options: FindOneOptionsI): Promise<T | null> {
    const { includeSoftDeleted = false, where, ...rest } = options;
    return this.model.findFirst({
      where: this.activeWhere(where, includeSoftDeleted),
      ...rest,
    });
  }

  async findFirst(options: FindOneOptionsI): Promise<T | null> {
    return this.findOne(options);
  }

  async findById(
    id: string,
    options: SelectOptionsI & { includeSoftDeleted?: boolean } = {},
  ): Promise<T | null> {
    const { includeSoftDeleted = false, ...rest } = options;
    return this.model.findFirst({
      where: this.activeWhere({ id }, includeSoftDeleted),
      ...rest,
    });
  }

  async findUnique(options: FindOneOptionsI): Promise<T | null> {
    return this.findOne(options);
  }

  async update(options: UpdateOptionsI<T>): Promise<T> {
    const { where, data, ...rest } = options;
    return this.model.update({
      where: this.activeWhere(where),
      data: { ...data, updatedAt: new Date() },
      ...rest,
    });
  }

  async updateById(
    id: string,
    data: Partial<T>,
    options?: SelectOptionsI,
  ): Promise<T> {
    return this.update({ where: { id }, data, ...options });
  }

  async updateMany(
    where: QueryObjectI,
    data: Partial<T>,
  ): Promise<{ count: number }> {
    return this.model.updateMany({
      where: this.activeWhere(where),
      data: { ...data, updatedAt: new Date() },
    });
  }

  async softDelete(options: DeleteOptionsI): Promise<T> {
    this.requireSoftDelete('Soft delete');
    return this.model.update({
      where: this.activeWhere(options.where),
      data: { deletedAt: new Date(), updatedAt: new Date() },
    });
  }

  async softDeleteById(id: string): Promise<T> {
    return this.softDelete({ where: { id } });
  }

  async softDeleteMany(where: QueryObjectI): Promise<{ count: number }> {
    this.requireSoftDelete('Soft delete');
    return this.model.updateMany({
      where: this.activeWhere(where),
      data: { deletedAt: new Date(), updatedAt: new Date() },
    });
  }

  async restore(options: DeleteOptionsI): Promise<T> {
    this.requireSoftDelete('Restore');
    return this.model.update({
      where: { ...options.where, deletedAt: { not: null } },
      data: { deletedAt: null, updatedAt: new Date() },
    });
  }

  async restoreById(id: string): Promise<T> {
    return this.restore({ where: { id } });
  }

  async restoreMany(where: QueryObjectI): Promise<{ count: number }> {
    this.requireSoftDelete('Restore');
    return this.model.updateMany({
      where: { ...where, deletedAt: { not: null } },
      data: { deletedAt: null, updatedAt: new Date() },
    });
  }

  async hardDelete(options: DeleteOptionsI): Promise<T> {
    return this.model.delete({ where: options.where });
  }

  async hardDeleteById(id: string): Promise<T> {
    return this.hardDelete({ where: { id } });
  }

  async hardDeleteByIds(ids: string[]): Promise<{ count: number }> {
    return this.hardDeleteMany({ id: { in: ids } });
  }

  async hardDeleteMany(where: QueryObjectI): Promise<{ count: number }> {
    return this.model.deleteMany({ where });
  }

  async count(
    where: QueryObjectI = {},
    includeSoftDeleted = false,
  ): Promise<number> {
    return this.model.count({
      where: this.activeWhere(where, includeSoftDeleted),
    });
  }

  async exists(
    where: QueryObjectI,
    includeSoftDeleted = false,
  ): Promise<boolean> {
    return (await this.count(where, includeSoftDeleted)) > 0;
  }

  async upsert(
    where: QueryObjectI,
    create: CreateDataI<T>,
    update: Partial<T>,
    options?: SelectOptionsI,
  ): Promise<T> {
    return this.model.upsert({
      where,
      create,
      update: { ...update, updatedAt: new Date() },
      ...options,
    });
  }

  async findSoftDeleted(
    options: Omit<FindManyOptionsI, 'where'> & {
      where?: QueryObjectI;
    } = {},
  ): Promise<T[]> {
    this.requireSoftDelete('Find soft deleted');
    const { where = {}, ...rest } = options;
    return this.model.findMany({
      where: { ...where, deletedAt: { not: null } },
      ...rest,
    });
  }

  async paginate(
    page = 1,
    limit = 10,
    options: FindManyOptionsI = {},
  ): Promise<PaginatedResultI<T>> {
    const { includeSoftDeleted = false, where = {}, ...rest } = options;
    const whereClause = this.activeWhere(where, includeSoftDeleted);
    const [data, total] = await Promise.all([
      this.model.findMany({
        where: whereClause,
        skip: (page - 1) * limit,
        take: limit,
        ...rest,
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
}
