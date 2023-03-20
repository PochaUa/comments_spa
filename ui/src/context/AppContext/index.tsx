import React, { createContext, useContext, useReducer } from "react";
import { getActions, reducer } from "./reducer";
import { AppState } from "./types";
import { Fetching, UserModel } from "../../types";
import { ContextProviderProps } from "../types";

export const defaultState: AppState = {
  user: JSON.parse(localStorage.getItem("user") || "{}"),
  comments: [],
  fetching: Fetching.NOT_FETCHED,
};

const AppContext = createContext({
  state: defaultState,
  actions: getActions(() => {}),
});

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }: ContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  return (
    <AppContext.Provider
      value={{
        state,
        actions: getActions(dispatch),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
