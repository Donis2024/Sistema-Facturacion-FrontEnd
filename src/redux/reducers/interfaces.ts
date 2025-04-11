export interface ApiFetchResponse<T> {
    statusCode: number;
    content: {
      page: number;
      totalPages: number;
      elements: number;
      totalElements: number;
      items: Array<T>;
    };
  }
  
  export interface ApiCreateResponse<T> {
    statusCode: number;
    content: T;
  }

  
  export interface ApiUpdateResponse<T> extends ApiCreateResponse<T> {}