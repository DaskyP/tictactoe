import { useNavigate } from "react-router-dom";

const MainMenu = () => {
  const navigate = useNavigate();

  const routes = {
    "Tic-Tac-Toe": "/tic-tac-toe",
    "Tic-Tac-Toe vs PC": "/tictacpc",
    "To-Do List": "/todo-list"
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-12">Bienvenido</h1>
      <div className="flex gap-8">
        {Object.keys(routes).map((item) => (
          <div 
            key={item}
            onClick={() => navigate(routes[item])}
            className="w-48 h-36 flex items-center justify-center bg-gray-800 rounded-lg 
                       border-2 border-red-500 shadow-lg shadow-red-500/50 
                       cursor-pointer hover:scale-110 transition-transform duration-300 text-lg font-semibold tracking-wide"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainMenu;
