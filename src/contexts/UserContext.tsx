import React, { createContext, useContext, useState } from "react";

interface UserContextType {
  userPhoto: string;
  setUserPhoto: (photo: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userPhoto, setUserPhoto] = useState<string>("");

  return (
    <UserContext.Provider value={{ userPhoto, setUserPhoto }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
