import type {
	GetCreateRequestInfoRequest,
	GetCreateRequestInfoResponse,
	GetRequestInfoRequest,
	GetRequestInfoResponse,
	ReserveCreateRequest,
	ReserveCreateResponse,
	ReserveEditRequest,
} from "@/types/reserveCreateTypes";
import { getData, postData, putData } from "./services";

export const getCreateRequestInfo = async (
	credentials: GetCreateRequestInfoRequest,
): Promise<GetCreateRequestInfoResponse> => {
	return getData({
		endPoint: `/v1/requests/`,
		params: { petSitterUserID: credentials.petSitterUserID },
		headers: { Authorization: `Bearer ${credentials.accessToken}` },
	});
};
export const getRequestInfo = async (
	credentials: GetRequestInfoRequest,
): Promise<GetRequestInfoResponse> => {
	return getData({
		endPoint: `/v1/requests/${credentials.requestID}`,
		headers: { Authorization: `Bearer ${credentials.accessToken}` },
	});
};
export const createRequest = async (
	credentials: ReserveCreateRequest,
): Promise<ReserveCreateResponse> => {
	const { accessToken, ...body } = credentials;
	return postData({
		endPoint: `/v1/requests/`,
		data: body,
		headers: { Authorization: `Bearer ${accessToken}` },
	});
};
export const editRequest = async (
	credentials: ReserveEditRequest,
): Promise<ReserveCreateResponse> => {
	const { accessToken, ...body } = credentials;
	return putData({
		endPoint: `/v1/requests/`,
		data: body,
		headers: { Authorization: `Bearer ${accessToken}` },
	});
};
