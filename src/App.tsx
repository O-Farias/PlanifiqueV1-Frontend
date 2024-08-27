import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SidebarProvider } from "./contexts/SidebarContext";
import { UserProvider } from "./contexts/UserContext";
import Login from "./components/auth/Login";
import Cadastro from "./components/auth/Cadastro";
import RecuperarSenha from "./components/auth/RecSenha";
import Dashboard from "./pages/Dashboard";
import Categorias from "./pages/Categorias";
import Perfil from "./pages/Perfil";
import Transacoes from "./pages/Transacoes";

const App: React.FC = () => {
  return (
    <SidebarProvider>
      <UserProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/recuperar-senha" element={<RecuperarSenha />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/transacoes" element={<Transacoes />} />
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </SidebarProvider>
  );
};

export default App;
