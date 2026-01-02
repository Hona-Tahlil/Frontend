export const RequestStatus = {
  Pending: 1,
  Accepted: 2,
  Paid: 3,
  Finished: 4,
  Canceled: 5,
  Dismissed: 6,
  Conflict: 7,
} as const;

export type RequestStatus = (typeof RequestStatus)[keyof typeof RequestStatus];

export type RequestSearchFilter = {
  field: string;
  op: "=" | "!=" | ">" | "<" | ">=" | "<=" | "IN";
  value: string | number | boolean | Array<string | number>;
};

export type RequestSearchSort = {
  field: "created_at";
  dir: "ASC" | "DESC";
};

export interface SearchRequestsPayload {
  page: number;
  count: number;
  filters: RequestSearchFilter[];
  sorts: RequestSearchSort[];
}

export interface RequestServiceInfo {
  id: number;
  type: string;
  description: string;
  price: number;
}

export interface RequestStatusInfo {
  num: RequestStatus;
  name: string;
}

export interface SearchRequestsApiItem {
  requestID: number;
  petSitterUserID: number;
  petSitterFirstName: string;
  petSitterLastName: string;
  service: RequestServiceInfo;
  totalPrice: number;
  status: RequestStatusInfo;
  updatedAt: string;
}

export interface RequestsPaginationMeta {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface SearchRequestsApiResponse {
  statusCode: number;
  message: string;
  data: {
    data: SearchRequestsApiItem[];
    pagination: RequestsPaginationMeta;
  };
}
