import type {
	CancelRequestPayload,
	CancelRequestResponse,
} from "@/types/Requests/cancelRequest";
import { putData } from "../services";

export const cancelRequestService = async (
	payload: CancelRequestPayload,
): Promise<CancelRequestResponse> => {
	return putData({
		endPoint: "/v1/requests/cancel",
		data: payload,
	});
};
