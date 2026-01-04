export interface CancelRequestPayload {
	requestID: number;
}

export interface CancelRequestResponse {
	statusCode: number;
	message?: string;
}
