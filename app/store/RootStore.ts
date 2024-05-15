// import { storage } from "app/utils/storage"
import ZustandStorage from "app/utils/storage/storage"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { useShallow } from "zustand/react/shallow"
import {
  AuthenticationStore,
  authenticationStoreSelector,
  createAuthenticationSlice,
} from "./AuthenticationStore"
import { EpisodeStore, createEpisodeSlice, episodeStoreSelector } from "./EpisodeStore"

export interface RootStore extends AuthenticationStore, EpisodeStore {
  _hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
}

export const useStore = create<RootStore>()(
  persist(
    (...a) => ({
      ...createAuthenticationSlice(...a),
      ...createEpisodeSlice(...a),
      // add your state slices here

      _hasHydrated: false,
      setHasHydrated: (state) => {
        const set = a[0]
        set({
          _hasHydrated: state,
        })
      },
    }),
    {
      name: "zustand-app",
      storage: createJSONStorage(() => ZustandStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    },
  ),
)

export const useAuthenticationStore = () => useStore(useShallow(authenticationStoreSelector))
export const useEpisodeStore = () => useStore(useShallow(episodeStoreSelector))
