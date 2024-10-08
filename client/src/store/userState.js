import { create } from 'zustand';

export const INITIAL_USER_INFO = {
};

const useUserState = create((set, get) => ({
  userInfo: INITIAL_USER_INFO,
  isAuthenticated: false,
  role: false,
  loadingz: false,
  setUserInfo: (data) => set({ userInfo: data, isAuthenticated: true, role: data.role }),
  clearUserInfo: () => set({ userInfo: INITIAL_USER_INFO, isAuthenticated: false, role: false }),
  setLoadingz: () => {
    const loading = get().loadingz;
    set({ loadingz: !loading });
  }
}));

const getUserState = () => useUserState.getState();
export { useUserState, getUserState };
