// src/services/authService.ts

import type {
	LoginPayload,
	LoginResponse,
	SignupPayload,
	SignupResponse,
} from "@/types/authTypes";
import { postData , getData  } from "./services";
import type { PetSitterFull } from "@/types/PetSitterFull";

export const loginService = async (
	credentials: LoginPayload,
): Promise<LoginResponse> => {
	return postData({
		endPoint: `/v1/auth/login`,
		data: credentials,
	});
};

export const signupService = async (
	credentials: SignupPayload,
): Promise<SignupResponse> => {
	return postData({
		endPoint: `/v1/auth/register`,
		data: credentials,
	});
};




export const getPetSitterDetailsService = async (
	petsitterUserID: number
  ): Promise<PetSitterFull> => {
	return getData({
	  endPoint: `/petsitters/${petsitterUserID}`,
	  headers: {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
	  },
	});
  };


  
