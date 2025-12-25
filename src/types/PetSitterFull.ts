export type PetSitterFull = {
    personalInfo: {
      first_name: string;
      last_name: string;
      email: string;
      gender: string;
      phone_number: string;
      province: string;
      city: string;
      address: string;
      house_number: number;
      unit: number;
      status: string;
      onboarding_step: string;
    };
    documents: {
      certificate_files: string[];
      files: string[];
    };
    skills: {
      bio: string;
      pet_kinds: { num: string; name: string }[];
      services: {
        id: number;
        type: string;
        description: string | null;
        price: number;
      }[];
    };
  };
  