import type {
  SearchRequestsApiResponse,
  SearchRequestsPayload,
} from "@/types/Requests/searchRequests";
import { postData } from "../services";

export const searchRequestsService = async (
  payload: SearchRequestsPayload,
): Promise<SearchRequestsApiResponse> => {
  return postData({
    endPoint: "/v1/requests/search",
    data: payload,
  });
};
