import type {
	AccessTokenPayload,
	DocumentRespnse,
	PersonalInfoRespnse,
	PetSitterStatusResponse,
	SubmitPersonalInfoPayload,
	SubmitSkillsPayload,
	UploadDocumentsPayload,
} from "@/types/petSitterSignupApiTypes";
import { getData, postData, putData } from "./services";

export const createPetSitterData = async (
	credentials: AccessTokenPayload,
): Promise<void> => {
	return postData({
		endPoint: `/v1/petsitter/register`,
		data: {},
		headers: { Authorization: `Bearer ${credentials.accessToken}` },
	});
};

export const submitPersonalInfo = async (
	credentials: SubmitPersonalInfoPayload,
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
): Promise<PersonalInfoRespnse> => {
	return getData({
		endPoint: `/v1/petsitter/register/personal`,
		headers: { Authorization: `Bearer ${credentials.accessToken}` },
	});
};
export const uploadDocuments = async (
	credentials: UploadDocumentsPayload,
): Promise<void> => {
	const { accessToken, ...data } = credentials;
	return putData({
		endPoint: `/v1/petsitter/register/documents`,
		data: data,
		headers: { Authorization: `Bearer ${accessToken}` },
	});
};

export const getDocuments = async (
	credentials: AccessTokenPayload,
): Promise<DocumentRespnse> => {
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
		endPoint: `/v1/petsitter/register/skills`,
		headers: { Authorization: `Bearer ${credentials.accessToken}` },
	});
};
