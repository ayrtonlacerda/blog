import create from 'zustand'

interface User {
  auth: boolean | object
  setAuth: (by: boolean | object) => void
  reset: () => void
}

export const useUser = create<User>(set => ({
  auth: null,
  setAuth: (data) => set({ auth: data }),
  reset: () => set({ auth: null})
}))