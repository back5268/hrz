import { create } from 'zustand';

const useDataState = create((set, get) => ({
  accounts: [],
  departments: [],
  positions: [],
  jobPositions: [],
  setAccounts: (accounts) => set({ accounts }),
  setDepartments: (departments) => set({ departments }),
  setPositions: (positions) => set({ positions }),
  setJobPositions: (jobPositions) => set({ jobPositions })
}));

const getDataState = () => useDataState.getState();
export { useDataState, getDataState };
