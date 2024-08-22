import React, { createContext, useContext, useState } from "react";

interface UserContextType {
  userPhoto: string;
  userName: string;
  setUserPhoto: (photo: string) => void;
  setUserName: (name: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userPhoto, setUserPhoto] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  return (
    <UserContext.Provider
      value={{ userPhoto, userName, setUserPhoto, setUserName }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }
  return context;
};
