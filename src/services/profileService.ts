import { getData, putImageData } from "./services";
import type {
  ProfileResponse,
  UpdateProfileResponse,
} from "@/types/profileTypes";

export const getProfileService = async (): Promise<ProfileResponse> => {
  return getData({
    endPoint: `/v1/profile/`,
  });
};

export const updateProfileService = async (
  formData: FormData,
): Promise<UpdateProfileResponse> => {
  return putImageData({
    endPoint: `/v1/profile/`,
    data: formData,
  });
};
