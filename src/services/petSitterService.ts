import { postData } from "./services";
import type {
  SearchPetSittersPayload,
  SearchPetSittersResponse,
} from "@/types/PetSitter/searchTypes";


export const searchPetSittersService = async (
  payload: SearchPetSittersPayload,
): Promise<SearchPetSittersResponse> => {
  return postData({
    endPoint: "v1/petsitters/search",
    data: payload,
  });
};
