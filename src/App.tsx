import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SidebarProvider } from "./contexts/SidebarContext";
import Login from "./components/auth/Login";
import Cadastro from "./components/auth/Cadastro";
import RecuperarSenha from "./components/auth/RecSenha";
import Dashboard from "./pages/Dashboard";
import Categorias from "./pages/Categorias";

const App: React.FC = () => {
  return (
    <SidebarProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/recuperar-senha" element={<RecuperarSenha />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/categorias" element={<Categorias />} />
          </Routes>
        </div>
      </Router>
    </SidebarProvider>
  );
};

export default App;
