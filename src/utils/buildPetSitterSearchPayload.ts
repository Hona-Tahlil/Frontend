import type { FilterState, SortField, SortDirection } from "@/types/explorePetSitter";
import type { SearchPetSittersPayload } from "@/types/PetSitter/searchPetSitters";

export function buildPetSitterSearchPayload(params: {
  filters: FilterState;
  page: number;
  pageSize: number;
  sortField: SortField;
  sortDirection: SortDirection;
}): SearchPetSittersPayload {
  const { filters, page, pageSize, sortField, sortDirection } = params;

  const out: SearchPetSittersPayload["filters"] = [];

  if (filters.searchQuery) {
    out.push({ field: "name", op: "LIKE", value: filters.searchQuery });
  }

  if (filters.city && filters.city !== "همه شهرها") {
    out.push({ field: "city", op: "=", value: filters.city });
  }

  if (filters.serviceType) {
    out.push({ field: "services", op: "IN", value: [filters.serviceType] });
  }

  if (filters.pets.length) {
    out.push({ field: "pets", op: "IN", value: filters.pets });
  }

  const [minPrice, maxPrice] = filters.priceRange;
  out.push(
    { field: "pricePerNight", op: ">=", value: minPrice },
    { field: "pricePerNight", op: "<=", value: maxPrice }
  );

  if (filters.timeFrom) {
    out.push({ field: "availableFrom", op: ">=", value: filters.timeFrom });
  }

  if (filters.timeTo) {
    out.push({ field: "availableTo", op: "<=", value: filters.timeTo });
  }

  if (filters.date) {
    out.push({ field: "availableDates", op: "IN", value: [filters.date] });
  }

  return {
    page,
    count: pageSize,
    filters: out,
    sorts: [
      {
        field: sortField,
        dir: sortDirection === "asc" ? "ASC" : "DESC",
      },
    ],
  };
}
