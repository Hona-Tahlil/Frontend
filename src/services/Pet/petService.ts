import type { GetPetByIdResponse } from "@/types/Pet/petServiceTypes";
import { getData } from "../services";



export const getPetByIdService = async (
    id: number
): Promise<GetPetByIdResponse> => {
    return getData({
        endPoint: `/v1/pets/${id}`,
    });
};
