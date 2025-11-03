// src/services/authService.ts

import type { SignupPayload, SignupResponse } from "@/types/authTypes";
import { postData } from "./services";

// Login function

export const signupService = async (
	credentials: SignupPayload,
): Promise<SignupResponse> => {
	return postData({
		endPoint: `/v1/auth/register`,
		data: credentials,
	});
};
