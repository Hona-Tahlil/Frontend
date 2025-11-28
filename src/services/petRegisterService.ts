import type {  SpiecesResponse } from "@/types/PetRegister/registerTypes";
import { getData, postData } from "./services";

export const getPetSpeciesService = async (kindId : number): Promise<SpiecesResponse> => {
	return getData({
		endPoint: `/pets/kinds/${kindId}/species`,
	});
};

