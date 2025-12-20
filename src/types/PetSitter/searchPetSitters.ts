import type { PetSitter } from "@/types/PetSitter";

/* ---------- payloadی که به بک می‌فرستیم ---------- */

export type SearchFilter = {
  field: string;
  op: "=" | "!=" | ">" | "<" | ">=" | "<=" | "LIKE" | "IN";
  value: string | number | boolean | string[] | number[];
};


export type SearchSort = {
  field: string;
  dir: "ASC" | "DESC";
};

export interface SearchPetSittersPayload {
  page: number;
  count: number;
  filters?: SearchFilter[];
  sorts?: SearchSort[];
}

/* ---------- response بک ---------- */

export interface SearchPetSittersResponse {
  items: PetSitter[];
  total: number;
}
