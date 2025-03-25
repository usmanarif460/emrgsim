import { create } from "zustand";

type DataPlan = {
  id: string;
  name: string;
  data: number;
  data_unit: string;
  duration: number;
  duration_unit: string;
  price: number;
  price_currency: string;
};

type DataPlanStore = {
  selectedPlan: DataPlan | null;
  setSelectedPlan: (plan: DataPlan) => void;
};

export const useDataPlanStore = create<DataPlanStore>((set) => ({
  selectedPlan: null,
  setSelectedPlan: (plan) => set({ selectedPlan: plan }),
}));
