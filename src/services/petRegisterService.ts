import type {  RegisterPayLoad, RegisterResponse, SpiecesResponse } from "@/types/PetRegister/registerTypes";
import { getData, postData, postImageData } from "./services";

export const getPetSpeciesService = async (kindId : number): Promise<SpiecesResponse> => {
	return getData({
		endPoint: `/v1/pets/kinds/${kindId}/species`,
	});
};

export const registerPetService = async (
	credentials: RegisterPayLoad,
): Promise<RegisterResponse> => {
	return postImageData({
		endPoint: `/v1/pets/`,
		data: credentials,
	});
};


