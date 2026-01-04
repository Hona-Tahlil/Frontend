export type ProfileAddress = {
  id: number;
  provinceName: string | null;
  cityName: string | null;
  streetAddress: string | null;
  houseNumber: number | null;
  unit: number | null;
  postalCode: string | null;
};

export type ProfileData = {
  id: number;
  email: string | null;
  isEmailVerified: boolean;
  firstName: string | null;
  lastName: string | null;
  address: ProfileAddress | null;
  phone: string | null;
  isPhoneVerified: boolean;
  gender: string | null;
  birthDate: string | null;
  pictureLink: string | null;
};

export type ProfileResponse = {
  statusCode: number;
  message: string;
  data: ProfileData;
};

export type UpdateProfileResponse = {
  statusCode: number;
  message: string;
  data: null;
};
