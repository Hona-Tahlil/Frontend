export const Gender = {
	Male: 1,
	Female: 2,
};
export type Gender = (typeof Gender)[keyof typeof Gender];
export const GenderString: Record<Gender, string> = {
	[Gender.Male]: "مرد",
	[Gender.Female]: "زن",
};
export const StringToGender: Record<string, Gender> = {
	مرد: Gender.Male,
	زن: Gender.Female,
};
export interface PersonalInfo extends AccessTokenPayload {
	FirstName: string;
	LastName: string;
	Email: string;
	Gender: Gender;
	BirthDate: string;
	PhoneNumber: string;
	Province: string;
	City: string;
	Address: string;
	Pelak: string;
	Vahed: string;
	PostalCode: string;
}
export interface UploadDocuments extends AccessTokenPayload {
	CertificateFile: File[] | null;
	File: File[] | null;
}
export interface Documents extends AccessTokenPayload {
	CertificateFile: string[] | null;
	File: string[] | null;
}

export const PetKind = {
	Dog: 1,
	Cat: 2,
	Rabbit: 3,
	Bird: 4,
};
export const StringToPetKind: Record<string, PetKind> = {
	سگ: PetKind.Dog,
	گربه: PetKind.Cat,
	خرگوش: PetKind.Rabbit,
	پرنده: PetKind.Bird,
};

export type PetKind = (typeof PetKind)[keyof typeof PetKind];
export const ServiceType = {
	Walking: 1,
	Watching: 2,
};
export type ServiceType = (typeof ServiceType)[keyof typeof ServiceType];
export interface SubmitSkillsPayload extends AccessTokenPayload {
	Bio: string;
	Petkinds: PetKind[];
	Services: ServiceType[];
}

export const PetSitterStatus = {
	Review: 1,
	Documents: 3,
	Skills: 2,
	Done: 4,
};
export type PetSitterStatus =
	(typeof PetSitterStatus)[keyof typeof PetSitterStatus];
const OnboardingStep = {};
type OnboardingStep = keyof typeof OnboardingStep;
export interface PetSitterStatusResponse {
	Status: PetSitterStatus;
	OnboardingStep: OnboardingStep;
}

export interface AccessTokenPayload {
	accessToken: string;
}
