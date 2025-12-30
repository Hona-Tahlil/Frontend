import { getData , putData } from "../services";
import type { PetSitterFull } from "@/types/PetSitterFull";
import type { PetSitterDetailsResponse } from "@/types/PetSitter/PetSitterDetailsResponse";
import type {
  ChangePetSitterStatusPayload,
  ChangePetSitterStatusResponse,
} from "@/types/PetSitter/changeStatusTypes";



export const changePetSitterStatusService = async (
  payload: ChangePetSitterStatusPayload,
): Promise<ChangePetSitterStatusResponse> => {
  return putData({
    endPoint: `/v1/petsitters/change-status`, // 👈 دقیقا همون endpointی که تو Postman داری
    data: payload,
  });
};

export const VerifySittersService = async () => {
  return getData({
    endPoint: "/v1/petsitters", 
  });
};

export const getPetSitterDetailsService = async (
  id: number
): Promise<PetSitterDetailsResponse> => {
  return getData({
    endPoint: `/v1/petsitters/${id}`,
  });
};
