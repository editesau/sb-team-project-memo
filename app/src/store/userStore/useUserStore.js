import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export const useUserStore = create(devtools(immer(persist((set) => ({
  accessToken: '',
  setAccessToken: (token) => set(() => ({ accessToken: token })),
  clearAccessToken: () => set(() => ({ accessToken: '' })),
}), { name: 'access_token' }))))
