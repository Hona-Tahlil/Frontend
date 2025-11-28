import type { spiecesResponse } from "@/types/PetRegister/registerTypes";
import { getData, postData } from "./services";

export const getPetSpeciesService = async (): Promise<spiecesResponse> => {
	return getData({
		endPoint: `/pets/kinds/:petKind/species`,
	});
};

