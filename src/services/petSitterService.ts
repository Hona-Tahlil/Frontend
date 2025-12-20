import type {
  SearchPetSittersPayload,
  SearchPetSittersResponse,
} from "@/types/PetSitter/searchPetSitters";
import { postData } from "./services";
// import useUserStore from "@/store/userStore/userStore";

// const token = useUserStore.getState().accessToken;

/* -------------------- search pet sitters -------------------- */

export const searchPetSittersService = async (
  payload: SearchPetSittersPayload
): Promise<SearchPetSittersResponse> => {
  return postData({
    endPoint: "/search/petsitters",
    data: payload,
  });
};
