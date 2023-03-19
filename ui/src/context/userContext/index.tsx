import { createContext, useContext, useState } from "react";
import { ContextProviderProps } from "../types";
import { UserModel } from "../../types";

export const defaultState = {};

const UserContext = createContext({
  user: defaultState,
  setUser: (user: UserModel) => {},
});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState(defaultState);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
