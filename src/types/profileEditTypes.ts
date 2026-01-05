export type ProvinceCitySummaryProps = {
  provinceId?: string;
  cityId?: string;
  className?: string;
};

export type ProfileFormValues = {
  userprof: File | string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  province: string;
  city: string;
  streetAddress: string;
  houseNumber: string;
  unit: string;
  postalCode: string;
  phone: string;
  email: string;
  bio: string;
};
