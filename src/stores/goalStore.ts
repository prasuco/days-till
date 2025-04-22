// create a store that will write to localStorage and read from localStorage
// i can store multiple goals. each goal has a name and a target date
import { create } from "zustand/react";

import { v4 as uuidv4 } from 'uuid';
import { persist } from "zustand/middleware";

interface IGoalStore {
    goals: Array<{
        id: string;
        name: string;
        targetDate: Date;
    }>;
    addGoal: (name: string, targetDate: Date) => void;
    removeGoal: (name: string) => void;

    selectedGoal: string | null;
    setSelectedGoal: (id: string | null) => void;
}

export const useGoalStore = create<IGoalStore>()(
    persist(
        (set) => ({
            goals: [],
            addGoal: (name, targetDate) => {
                set((state) => ({
                    goals: [...state.goals, { id: uuidv4(), name, targetDate }],
                }));
            },
            removeGoal: (id: string) => {
                set((state) => ({
                    goals: state.goals.filter((goal) => goal.id !== id),
                }));
            },
            selectedGoal: null,
            setSelectedGoal: (id: string | null) => {
                set({ selectedGoal: id });
            },

        }),
        { 'name': 'goal-store' }
    )
);


