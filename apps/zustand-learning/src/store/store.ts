import { create } from "zustand";

export interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completedDates: string[];
  createdAt: string;
}

interface HabitState {
  habits: Habit[];
  isLoading: boolean;
  error: string | null;
  addHabit: (name: string, frequency: "daily" | "weekly") => void;
  removeHabit: (id: string) => void;
  toggleHabit: (id: string, date: string) => void;
  fetchHabits: () => Promise<void>;
}

const useHabitStore = create<HabitState>()((set) => ({
  habits: [],
  isLoading: false,
  error: null,
  addHabit: (name, frequency) =>
    set((state) => ({
      habits: [
        ...state.habits,
        {
          id: Date.now().toString(),
          name,
          frequency,
          completedDates: [],
          createdAt: new Date().toISOString(),
        },
      ],
    })),
  removeHabit: (id) =>
    set((state) => ({
      habits: state.habits.filter((habit) => habit.id !== id),
    })),
  toggleHabit: (id, date) =>
    set((state) => ({
      habits: state.habits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completedDates: habit.completedDates.includes(date)
                ? habit.completedDates.filter((d) => d !== date)
                : [...habit.completedDates, date],
            }
          : habit,
      ),
    })),
  fetchHabits: async () => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockHabits: Habit[] = [
        {
          id: "1",
          name: "Read",
          frequency: "daily",
          completedDates: [],
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Exercise",
          frequency: "daily",
          completedDates: [],
          createdAt: new Date().toISOString(),
        },
      ];
      set({ habits: mockHabits, isLoading: false });
    } catch (error) {
      console.error("Error fetching habits:", error);
      set({ error: "Failed to fetch habits", isLoading: false });
    }
  },
}));

export default useHabitStore;
