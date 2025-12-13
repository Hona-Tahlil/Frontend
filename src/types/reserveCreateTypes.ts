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
	kind: "Dog";
	species: string;
	gender: Gender;
	pictureLink: string;
}

export interface CalenderSlot {
	date: string;
	slots: number[];
}

export interface AddressInfo {
	provinceName: string;
	cityName: string;
	streetAddress: string;
	houseNumber: number;
	unit: number;
	postalCode: string;
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

export interface GetCreateRequestInfoResponse {
	services: Service[];
	addresses: AddressInfoWithId[];
	pets: [
		{
			id: 1;
			name: "Buddy";
			kind: "Dog";
			species: "Golden Retriever";
			gender: "Male";
			pictureLink: "https://example.com/images/buddy.jpg";
		},
	];
	freeCalendarSlots: [];
}
export interface ReserveCreateRequest {
	petSitterUserID: number;
	calendarSlots: CalenderSlot[];
	petIDs: number[];
	notes: string;
	addressInfo: AddressInfo;
	addressID: number;
	serviceID: number;
}
