import { create } from 'zustand';

const useDataState = create((set, get) => ({
  accounts: [],
  setAccounts: (accounts) => set({ accounts }),
}));

const getDataState = () => useDataState.getState();
export { useDataState, getDataState };
