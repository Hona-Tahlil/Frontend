import type { GetNamEmailResponse } from "@/types/navbarTypes";
import { getData } from "./services";

export const getNameEmailService = async (
): Promise<GetNamEmailResponse> => {
    return getData({
        endPoint: `/v1/profile/identity`,
    });
};
