import React from "react";
import useHabitStore, { Habit } from "../store/store";

const HabitStats: React.FC = () => {
  const { habits, isLoading, error } = useHabitStore();

  const getTotalHabits = () => habits.length;

  const getCompletedToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return habits.filter((habit) => habit.completedDates.includes(today))
      .length;
  };

  const getLongestStreak = () => {
    const getStreak = (habit: Habit) => {
      let streak = 0;
      const currentDate = new Date();

      while (true) {
        const dateString = currentDate.toISOString().split("T")[0];
        if (habit.completedDates.includes(dateString)) {
          streak++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break;
        }
      }

      return streak;
    };

    return Math.max(...habits.map(getStreak), 0);
  };

  if (isLoading) {
    return <div className="w-full h-2 bg-gray-200 animate-pulse"></div>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mt-4">
      <h2 className="text-lg font-semibold mb-4">Habit Statistics</h2>
      <div className="flex flex-col gap-2">
        <p className="text-base">Total Habits: {getTotalHabits()}</p>
        <p className="text-base">Completed Today: {getCompletedToday()}</p>
        <p className="text-base">Longest Streak: {getLongestStreak()} days</p>
      </div>
    </div>
  );
};

export default HabitStats;
