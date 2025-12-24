export interface accessToken {
	accessToken: string;
}
const Gender = {
	Male: 1,
	Female: 2,
};

type Gender = (typeof Gender)[keyof typeof Gender];

const PetKind = {
	Dog: 1,
	Cat: 2,
	BItd: 3,
	Rabbit: 4,
};

type PetKind = (typeof PetKind)[keyof typeof PetKind];
export interface Pet {
	id: number;
	name: string;
	kind: PetKind;
	species: string;
	gender: Gender;
	pictureLink: string;
}

export interface CalenderSlot {
	date: string;
	slots: number[];
}

export interface Days {
	[key: string]: string;
}

export interface AddressInfo {
	provinceName: string;
	cityName: string;
	streetAddress: string;
	houseNumber: string;
	unit: string;
	postalCode?: string;
}

export interface AddressInfoWithId extends AddressInfo {
	id: string;
}

export interface Service {
	id: number;
	type: string;
	description: string | null;
	price: number;
}
export interface GetCreateRequestInfoRequest {
	accessToken: string;
	petSitterUserID: number;
}
export interface GetRequestInfoRequest {
	accessToken: string;
	requestID: number;
}

export interface GetCreateRequestInfoResponse {
	services: Service[];
	addresses: AddressInfoWithId[];
	pets: Pet[];
	freeCalendarSlots: CalenderSlot[];
}
export interface GetRequestInfoResponse {
	requestID: number;
	petSitterUserID: number;
	petSitterFirstName: string;
	petSitterLastName: string;
	userFirstName: string;
	userLastName: string;
	service: Service;
	pets: Pet[];
	calendarSlots: CalenderSlot[];
	notes: string;
	totalPrice: number;
	address: AddressInfo;
	status: string;
	transferID?: number;
}
export interface ReserveCreateRequest {
	petSitterUserID: number;
	calendarSlots: CalenderSlot[];
	petIDs: number[];
	notes: string;
	addressInfo: AddressInfo;
	addressID: number;
	serviceID: number;
	accessToken: string;
}
export interface ReserveEditRequest
	extends Omit<ReserveCreateRequest, "petSitterUserID"> {
	requestID: number;
}
export interface ReserveCreateResponse {
	petSitterUserID: number;
	calendarSlots: CalenderSlot[];
	petIDs: number[];
	notes: string;
	addressInfo: AddressInfo;
	addressID: number;
	serviceID: number;
}
