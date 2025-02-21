import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheck, FaTrash } from "react-icons/fa";

const ReturnButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/")}
      className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
    >
      <FaArrowLeft />
      Volver
    </button>
  );
};

const TodoList = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen  text-white">
      <ReturnButton />
      <h1 className="text-3xl font-bold mb-8">To-Do List</h1>
      <div className="w-96 bg-gray-800 p-6 rounded-lg shadow-lg border border-red-500">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Nueva tarea"
            className="flex-grow p-2 rounded bg-gray-700 text-white border border-red-500"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-red-600 rounded text-white hover:bg-red-700"
          >
            Agregar
          </button>
        </div>
        <ul className="space-y-2">
          {tasks.map((task, i) => (
            <li
              key={i}
              className={`flex justify-between items-center p-2 rounded border ${task.completed ? "bg-gray-600 text-gray-400 line-through" : "bg-gray-700 text-white"}`}
            >
              <span className="select-none">{task.text}</span>
              <div className="flex gap-2">
                <button onClick={() => toggleTask(i)} className="text-green-400 hover:text-green-600">
                  <FaCheck />
                </button>
                <button onClick={() => deleteTask(i)} className="text-red-400 hover:text-red-600">
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
