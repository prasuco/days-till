// create a store that will write to localStorage and read from localStorage
// i can store multiple goals. each goal has a name and a target date
import { create } from "zustand/react";

import { v4 as uuidv4 } from 'uuid';
import { persist } from "zustand/middleware";


export interface Goal {

    id: string;
    name: string;
    targetDate: Date;

}
interface IGoalStore {
    goals: Goal[];
    addGoal: (name: string, targetDate: Date) => void;
    removeGoal: (name: string) => void;

    selectedGoal: Goal | null;
    setSelectedGoal: (id: string | null) => void;
}

export const useGoalStore = create<IGoalStore>()(
    persist(
        (set, get) => ({
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
                const goal = get().goals.find((goal) => goal.id === id);

                if (goal) {
                    return set((state) => ({
                        selectedGoal: goal,
                    }));
                } else {
                    return set((state) => ({
                        selectedGoal: null,
                    }));
                }



            },

        }),
        { 'name': 'goal-store' }
    )
);


