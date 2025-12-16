import type {
	GetCreateRequestInfoRequest,
	GetCreateRequestInfoResponse,
	Pet,
	ReserveCreateRequest,
	ReserveCreateResponse,
} from "@/types/reserveCreateTypes";
import { getData, postData } from "./services";

export const getCreateRequestInfo = async (
	credentials: GetCreateRequestInfoRequest,
): Promise<GetCreateRequestInfoResponse> => {
	return getData({
		endPoint: `/v1/requests/`,
		params: { petSitterUserID: credentials.petSitterUserID },
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
