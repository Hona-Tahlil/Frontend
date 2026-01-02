export type PetSitterFull = {
  personalInfo: {
    id: number;
    email: string;
    isEmailVerified: boolean;

    firstName: string;
    lastName: string;

    address: {
      id: number;
      provinceName: string;
      cityName: string;
      streetAddress: string;
      houseNumber: number;
      unit: number | null;
      postalCode: string | null;
    };

    phone: string;
    isPhoneVerified: boolean;

    gender: string;
    birthDate: string | null;
    pictureLink: string;

    
  };

  documents: {
    certificate_files: string[] | null;
    files: string[] | null;
  };

  skills: {
    bio: string;
    pet_kinds: {
      num: number;
      name: string;
    }[];
    services: {
      id: number;
      type: string;
      description: string | null;
      price: number;
    }[];
  };

  status: number;
  onboarding_step: number;
  created_at: string;
};
