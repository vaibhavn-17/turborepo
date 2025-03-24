import React from "react";
import useHabitStore, { Habit } from "../store/store";

const HabitList: React.FC = () => {
  const { habits, removeHabit, toggleHabit } = useHabitStore();
  console.log(habits);

  const today = new Date().toISOString().split("T")[0];

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

  return (
    <div className="flex flex-col gap-4 mt-4">
      {habits.map((habit) => (
        <div
          key={habit.id}
          className="p-4 bg-white shadow-md rounded-md border border-gray-200"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center">
            <div>
              <h2 className="text-lg font-semibold">{habit.name}</h2>
              <p className="text-sm text-gray-500">
                {habit.frequency.charAt(0).toUpperCase() +
                  habit.frequency.slice(1)}
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                className={`px-4 py-2 cursor-pointer text-sm font-medium rounded-md ${
                  habit.completedDates.includes(today)
                    ? "bg-green-500 text-white"
                    : "bg-blue-500 text-white"
                }`}
                onClick={() => toggleHabit(habit.id, today)}
              >
                {habit.completedDates.includes(today)
                  ? "Completed"
                  : "Mark Complete"}
              </button>
              <button
                className="px-4 py-2 cursor-pointer text-sm font-medium bg-red-500 text-white rounded-md"
                onClick={() => removeHabit(habit.id)}
              >
                Remove
              </button>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm">Current Streak: {getStreak(habit)} days</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${(getStreak(habit) / 30) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HabitList;
