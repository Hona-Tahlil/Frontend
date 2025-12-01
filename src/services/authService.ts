// src/services/authService.ts

import type {
	LoginPayload,
	LoginResponse,
	SignupPayload,
	SignupResponse,
	ForgetPasswordPayload,
	ForgetPasswordResponse,
} from "@/types/authTypes";
import { postData } from "./services";

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

export const forgetpasswordService = async (
	credentials: ForgetPasswordPayload,
): Promise<ForgetPasswordResponse> => {
	return postData({
		endPoint: `/v1/auth/forgot-password`,
		data: credentials,
	});
};
