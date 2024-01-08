"use client";
import React, { createContext, useContext, useState } from "react";

type AuthProviderProps = {
  fullName: string;
  showUserName: (name: string) => void;
};

const AuthContext = createContext<AuthProviderProps | undefined>({
  fullName: "",
  showUserName: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [fullName, setFullName] = useState("");

  const showUserName = (name: string) => {
    console.log("showing username", name);
    setFullName(name);
  };

  return (
    <AuthContext.Provider value={{ fullName, showUserName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
