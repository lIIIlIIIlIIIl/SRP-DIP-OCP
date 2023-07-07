import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { TodoProvider } from "./context/TodoContext";
import { HttpClient } from "./httpClient";
import { LocalTokenRepository } from "./repository/LocalTokenRepository";
import { AuthService } from "./service/AuthService";
import { LocalTodoService, TodoService } from "./service/TodoService";

const localTokenRepository = new LocalTokenRepository();
const httpClient = new HttpClient(
  import.meta.env.VITE_FIREBASE_BASE_URL,
  localTokenRepository
);

const authService = new AuthService(httpClient, localTokenRepository);
const todoService = new TodoService(httpClient);
const localTodoService = new LocalTodoService();

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider authService={authService}>
    <TodoProvider todoService={todoService}>
      <App />
    </TodoProvider>
  </AuthProvider>
);
