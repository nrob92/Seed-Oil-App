import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./Components/NavBar";

import { AppContextProvider } from "./Contexts/AppContext";

function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <NavBar />
        <Routes>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/" element={<Home />}></Route>
        </Routes>
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;
