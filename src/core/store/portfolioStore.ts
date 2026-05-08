import { create } from "zustand";

interface PortfolioState {
  focusedProjectId: string | null;
  activeProjectId: string | null;
  setFocusedProjectId: (projectId: string | null) => void;
  setActiveProjectId: (projectId: string | null) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  focusedProjectId: null,
  activeProjectId: null,
  setFocusedProjectId: (projectId) => set({ focusedProjectId: projectId }),
  setActiveProjectId: (projectId) => set({ activeProjectId: projectId }),
}));
