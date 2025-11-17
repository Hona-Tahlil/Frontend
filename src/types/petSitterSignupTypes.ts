enum Gender {
	Male = 1,
	Female = 2,
}
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

enum Petkind {
	Dog = 1,
	Cat = 2,
	Rabbit = 3,
	Bird = 4,
}
enum Service {
	Walking = 1,
	Watching = 2,
}
export interface SubmitSkillsPayload {
	Bio: string;
	Petkinds: Petkind[];
	Services: Service[];
}

enum PetSitterStatus {}
enum OnboardingStep {}
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
