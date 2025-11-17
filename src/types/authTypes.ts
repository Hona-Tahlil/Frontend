export interface LoginPayload {
	email: string;
	password: string;
	rememberMe: boolean;
}

export interface LoginResponse {
	statusCode: number;
	messages?: LoginResponseErrors;
	message?: string;
	data?: LoginResponseData;
}

export interface LoginResponseErrors {
	email?: string;
	password?: string;
}

export interface LoginResponseData {
	accessToken: string;
	permissions: PermissionResponse[];
}

export interface PermissionResponse {
	id: number;
	name: string;
	description: string;
}
