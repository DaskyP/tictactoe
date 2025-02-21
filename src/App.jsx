import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainMenu from "./pages/Main";
import TodoList from "./pages/TodoList";
import Game from "./pages/TicTacToe";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/tic-tac-toe" element={<Game />} />
        <Route path="/todo-list" element={<TodoList />} />
      </Routes>
    </Router>
  );
};

export default App;
