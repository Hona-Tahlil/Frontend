import type { GetPetByIdResponse, UpdatePetInfoResponse } from "@/types/Pet/petServiceTypes";
import { getData, putData, putImageData } from "../services";



export const getPetByIdService = async (
    id: number
): Promise<GetPetByIdResponse> => {
    return getData({
        endPoint: `/v1/pets/${id}`,
    });
};


export const updatePetInfoByIdService = async (
	formData: FormData,
): Promise<UpdatePetInfoResponse> => {
    return putImageData({
        endPoint: `/v1/pets/`,
        data: formData,
    });
};
