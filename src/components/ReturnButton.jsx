import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const ReturnButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="fixed top-4 left-4 flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition z-50"
    >
      <FaArrowLeft />
      Volver al Menú
    </button>
  );
};

export default ReturnButton;
