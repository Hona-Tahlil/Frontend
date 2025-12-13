import type { Pet } from "@/types/reserveCreateTypes";
import { getData, postData } from "./services";

export const getPets = async (accessToken: string): Promise<Pet[]> => {
	return getData({
		endPoint: `/v1/pets`,
		headers: { Authorization: `Bearer ${accessToken}` },
	});
};
