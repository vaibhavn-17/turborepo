import React, { useEffect } from "react";
import "./index.css";
import AddHabitForm from "./components/add-habit-form";
import HabitList from "./components/habit-list";
import HabitStats from "./components/habit-stats";
import useHabitStore from "./store/store";

const App: React.FC = () => {
  const { fetchHabits } = useHabitStore();

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  return (
    <div className="container mx-auto px-4">
      <div className="my-8">
        <h1 className="text-4xl font-bold text-center mb-6">Habit Tracker</h1>
        <AddHabitForm />
        <HabitList />
        <HabitStats />
      </div>
    </div>
  );
};

export default App;
