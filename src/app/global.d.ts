import { AxiosResponse } from 'axios';

// structural => nominal
export declare class TaggedProtector<Tag extends string> {
  protected __tag: Tag;
}

export type Nominal<T, Tag extends string> = T & TaggedProtector<Tag>;

// http状态码
export type HttpStatusCode =
  | 200
  | 400
  | 401
  | 403
  | 404
  | 408
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505;

// http response data structure
export interface ResponseMain<DataContent> {
  Code: HttpStatusCode;
  Data: DataContent;
  Message: string | undefined;
  Success: boolean;
}

export interface Fetch<P, R> {
  (params: P): AxiosResponse<ResponseMain<R>>;
}
