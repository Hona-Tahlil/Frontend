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
	provinceName: number;
	cityName: number;
	streetAddress: string;
	houseNumber: number;
	unit: number;
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
	statusCode: number;
	message: string;
	data: GetCreateRequestInfo;
}

export interface GetCreateRequestInfo {
	services: Service[];
	addresses: AddressInfoWithId[];
	pets: Pet[];
	freeCalendarSlots: CalenderSlot[];
	petSitterFirstName: string;
	petSitterLastName: string;
}
export interface GetRequestInfoResponse {
	statusCode: number;
	message: string;
	data: RequestInfo;
}
export interface RequestPet {
	id: number;
	name: string;
	kind: string;
	species: string;
	gender: string;
	pictureLink: string;
	birthDate: string;
	isAdult: boolean;
}
export interface RequestCalendarSlot {
	id: number;
	date: string;
	slots: number[];
	status: number;
}
export interface RequestComment {
	commentID?: number;
	id?: number;
	commentId?: number;
	userID: number;
	userFirstName: string;
	userLastName: string;
	updatedAt: string;
	text: string | null;
	rating: number;
}
export interface RequestAddress {
	id: number;
	provinceName: string;
	cityName: string;
	streetAddress: string;
	houseNumber: number;
	unit: number;
	postalCode: string | null;
}
export interface RequestInfo {
	requestID: number;
	petSitterUserID: number;
	petSitterFirstName: string;
	petSitterLastName: string;
	userFirstName: string;
	userLastName: string;
	service: Service;
	pets: RequestPet[];
	calendarSlots: RequestCalendarSlot[];
	notes: string;
	totalPrice: number;
	comment: RequestComment | null;
	address: RequestAddress;
	status: { num: number; name: string };
	transferID: number | null;
	updatedAt: string;
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
	extends Omit<
		ReserveCreateRequest,
		"petSitterUserID" | "addressInfo" | "addressID"
	> {
	requestID: number;
	addressInfo?: AddressInfo;
	addressID?: number;
}
export interface ReserveCreateResponse {
	statusCode: number;
	message: string;
}

export interface CreateCommentRequest {
	accessToken: string;
	requestID: number;
	text: string;
	rating: number;
}

export interface EditCommentRequest {
	accessToken: string;
	commentID: number;
	text: string;
	rating: number;
}

export interface CreateCommentResponse {
	statusCode: number;
	message: string;
}
