export type QueryObjectI = Record<string, unknown>;

export type SelectOptionsI = {
  select?: QueryObjectI;
  include?: QueryObjectI;
};

export type FindManyOptionsI = SelectOptionsI & {
  where?: QueryObjectI;
  orderBy?: QueryObjectI | QueryObjectI[];
  skip?: number;
  take?: number;
  cursor?: QueryObjectI;
  includeSoftDeleted?: boolean;
};

export type FindOneOptionsI = SelectOptionsI & {
  where: QueryObjectI;
  includeSoftDeleted?: boolean;
};

export type UpdateOptionsI<T> = SelectOptionsI & {
  where: QueryObjectI;
  data: Partial<T>;
};

export type DeleteOptionsI = {
  where: QueryObjectI;
};

export type RepositoryDelegateI<T> = {
  create(args: QueryObjectI): Promise<T>;
  findMany(args: QueryObjectI): Promise<T[]>;
  findFirst(args: QueryObjectI): Promise<T | null>;
  update(args: QueryObjectI): Promise<T>;
  updateMany(args: QueryObjectI): Promise<{ count: number }>;
  delete(args: QueryObjectI): Promise<T>;
  deleteMany(args: QueryObjectI): Promise<{ count: number }>;
  count(args: QueryObjectI): Promise<number>;
  upsert(args: QueryObjectI): Promise<T>;
};

export type CreateDataI<T> = Omit<
  T,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type PaginatedResultI<T> = {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};
