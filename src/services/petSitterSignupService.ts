import type {
	AccessTokenPayload,
	Documents,
	DocumentsResponse,
	PersonalInfo,
	PersonalInfoResponse,
	PetSitterStatusResponse,
	SubmitSkillsPayload,
	UploadDocuments,
} from "@/types/petSitterSignupApiTypes";
import {
	getData,
	postData,
	postImageData,
	putData,
	putImageData,
} from "./services";

export const createPetSitterData = async (
	credentials: AccessTokenPayload,
): Promise<PetSitterStatusResponse> => {
	return postData({
		endPoint: `/v1/petsitter/register/`,
		data: {},
		headers: { Authorization: `Bearer ${credentials.accessToken}` },
	});
};

export const submitPersonalInfo = async (
	credentials: PersonalInfo,
): Promise<void> => {
	const { accessToken, ...data } = credentials;
	return putData({
		endPoint: `/v1/petsitter/register/personal`,
		data: data,
		headers: { Authorization: `Bearer ${accessToken}` },
	});
};
export const getPersonalInfo = async (
	credentials: AccessTokenPayload,
): Promise<PersonalInfoResponse> => {
	return getData({
		endPoint: `/v1/petsitter/register/personal`,
		headers: { Authorization: `Bearer ${credentials.accessToken}` },
	});
};
export const uploadDocuments = async (
	credentials: UploadDocuments,
): Promise<void> => {
	const { accessToken, ...data } = credentials;
	return putImageData({
		endPoint: `/v1/petsitter/register/documents`,
		data: data,
		headers: { Authorization: `Bearer ${accessToken}` },
	});
};

export const getDocuments = async (
	credentials: AccessTokenPayload,
): Promise<DocumentsResponse> => {
	return getData({
		endPoint: `/v1/petsitter/register/documents`,
		headers: { Authorization: `Bearer ${credentials.accessToken}` },
	});
};

export const submitSkills = async (
	credentials: SubmitSkillsPayload,
): Promise<void> => {
	const { accessToken, ...data } = credentials;
	return putData({
		endPoint: `/v1/petsitter/register/skills`,
		data: data,
		headers: { Authorization: `Bearer ${accessToken}` },
	});
};

export const getStatus = async (
	credentials: AccessTokenPayload,
): Promise<PetSitterStatusResponse> => {
	return getData({
		endPoint: `/v1/petsitter/register/status`,
		headers: { Authorization: `Bearer ${credentials.accessToken}` },
	});
};

interface testOne {
	nice: string;
}
export const testSubmit = async (credentials: testOne): Promise<void> => {
	return postImageData({
		endPoint: `/v1/petsitter/register/skills`,
		data: credentials,
	});
};
