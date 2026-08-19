import { create } from "zustand";
import type { Airport, Budget, Duration, Pace } from "./season.ts";

export type WizardStep = 1 | 2 | 3 | 4;

export type PlannerState = {
  step: WizardStep;
  arrivalDate: string;
  duration: Duration;
  airport: Airport;
  arrivalTime: string;
  departureTime: string;
  flightIn: string;
  flightOut: string;
  circuitId: string | null;
  pace: Pace;
  budget: Budget;
  adults: number;
  children: number;
  santa: boolean | null;
  set: (patch: Partial<PlannerState>) => void;
  reset: () => void;
};

const today = new Date();
const iso = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() + 21))
  .toISOString()
  .slice(0, 10);

const initial: Omit<PlannerState, "set" | "reset"> = {
  step: 1,
  arrivalDate: iso,
  duration: 7,
  airport: "HEL",
  arrivalTime: "14:30",
  departureTime: "18:10",
  flightIn: "",
  flightOut: "",
  circuitId: null,
  pace: "equilibre",
  budget: "confort",
  adults: 2,
  children: 0,
  santa: null,
};

export const usePlanner = create<PlannerState>((set) => ({
  ...initial,
  set: (patch) => set(patch),
  reset: () => set(initial),
}));
