export interface UserState extends UserBasicData{
	

  accessToken: string | null;
  setAccessToken: (accessToken: string | undefined) => void;

  setProfile: (profile: Partial<UserBasicData>) => void;

  // handy derived state helpers
  isAuthenticated: () => boolean;
  logout: () => void;
}

export type UserBasicData = {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
};
