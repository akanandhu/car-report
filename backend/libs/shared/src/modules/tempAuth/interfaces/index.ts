import { Request } from 'express';

export interface ApiConsumer {
  userId: string;
  roles: string[];
  permissions: string[];
  profileId: string;
  profileIds?: string[];
}

export interface ApiRequest extends Request {
  user: ApiConsumer;
}
