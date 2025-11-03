export interface SignupPayload {
	name: string;
	lastname: string;
	email: string;
	password: string;
}

export interface SignupResponse {
	statusCode: number;
	messages?: LoginResponseErrors;
	message?: string;
}

export interface SignupResponseErrors {
	name: string;
	email?: string;
	password?: string;
}
