export interface SignupPayload {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
}

export interface SignupResponse {
	statusCode: number;
	messages?: SignupResponseErrors;
	message?: string;
}

export interface SignupResponseErrors {
	name: string;
	email?: string;
	password?: string;
}
