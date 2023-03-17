import React, { createContext, useContext, useReducer } from "react";
import { getActions, reducer } from "./reducer";
import { CommentsState } from "./types";
import { Fetching } from "../../types";
import { ContextProviderProps } from "../types";

export const defaultState: CommentsState = {
  comments: [],
  fetching: Fetching.NOT_FETCHED,
};

const CommentsContext = createContext({
  state: defaultState,
  actions: getActions(() => {}),
});

export const useCommentsContext = () => useContext(CommentsContext);

export const AppContextProvider = ({ children }: ContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  return (
    <CommentsContext.Provider
      value={{
        state,
        actions: getActions(dispatch),
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};
