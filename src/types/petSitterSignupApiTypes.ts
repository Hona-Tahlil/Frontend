export const Gender = {
	Male: 1,
	Female: 2,
};
export type Gender = (typeof Gender)[keyof typeof Gender];
export interface SubmitPersonalInfoPayload {
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
export interface UploadDocumentsPayload {
	CertificateFile: File[] | null;
	File: File[] | null;
}

export const PetKind = {
	Dog: 1,
	Cat: 2,
	Rabbit: 3,
	Bird: 4,
};

export type PetKind = (typeof PetKind)[keyof typeof PetKind];
export const ServiceType = {
	Walking: 1,
	Watching: 2,
};
export type ServiceType = (typeof ServiceType)[keyof typeof ServiceType];
export interface SubmitSkillsPayload {
	Bio: string;
	Petkinds: PetKind[];
	Services: ServiceType[];
}

const PetSitterStatus = {};
type PetSitterStatus = keyof typeof PetSitterStatus;
const OnboardingStep = {};
type OnboardingStep = keyof typeof OnboardingStep;
export interface PetSitterStatusResponse {
	Status: PetSitterStatus;
	OnboardingStep: OnboardingStep;
}

export interface PersonalInfoRespnse
	extends SubmitPersonalInfoPayload,
		PetSitterStatusResponse {}
export interface DocumentRespnse
	extends UploadDocumentsPayload,
		PetSitterStatusResponse {}
