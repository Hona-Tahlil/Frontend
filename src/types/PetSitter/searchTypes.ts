export type SearchFilter = {
    field: string;
    op: "=" | "!=" | ">" | "<" | ">=" | "<=";
    value: string | number;
  };
  
  export type SearchSort = {
    field: string;
    dir: "ASC" | "DESC";
  };
  
  export type SearchPetSittersPayload = {
    page: number;
    count: number;
    filters: SearchFilter[];
    sorts: SearchSort[];
  };
  
  export type PetSitterListItem = {
    id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    status: number;
    onboarding_step: number;
    created_at: string;
  };
  
  export type SearchPetSittersResponse = {
    statusCode: number;
    message: string;
    data: {
      data: PetSitterListItem[];
      pagination: {
        currentPage: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
      };
    };
  };
  