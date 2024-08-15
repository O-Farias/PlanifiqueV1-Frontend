import React, { createContext, useState, useContext } from "react";

// Definindo o tipo do contexto SidebarContextType
interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
}

// Criando o contexto SidebarProvider e o hook useSidebar
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Criando o Provider SidebarProvider que irá prover o contexto SidebarContext
export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(true); // Inicialmente aberto

  // Definindo o valor do contexto e o método toggleSidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Criando o Hook useSidebar que irá consumir o contexto SidebarContext
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
