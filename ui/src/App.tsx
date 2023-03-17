import React, { useCallback } from "react";
import "./App.css";
import { getComments } from "./api/apiGateWay";
import {
  AppContextProvider,
  useCommentsContext,
} from "./context/commentsContext";
import { Fetching } from "./types";
import { CommentsTable } from "./components/Commets/CommentsTable";

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <header className="App-header">
          <CommentsTable />
        </header>
      </AppContextProvider>
    </div>
  );
}

export default App;
