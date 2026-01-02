// src/stores/useProfileStore.ts

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UserState } from "../../types/userTypes";




const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      firstName: null,
      lastName: null,
      email: null,
      accessToken: null,

      setProfile: (profile) =>
        set((prev) => ({
          ...prev,
          ...profile,
        })),

        setAccessToken: (accessToken: string | undefined) =>
        set((prev) => ({ ...prev, accessToken })),



      isAuthenticated: () => Boolean(get().accessToken),

      logout: () =>
        set(() => ({
          firstName: null,
          lastName: null,
          email: null,
          accessToken: null,
        })),
    }),
    {
      name: "profile-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useUserStore;
