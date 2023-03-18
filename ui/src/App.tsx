import "./App.css";
import { AppContextProvider } from "./context/commentsContext";
import { CommentsTable } from "./components/Commets/CommentsTable";
import { ButtonsContainer } from "./components/Buttons/ButtonsContainer";

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <header className="App-header">
          <ButtonsContainer />
          <CommentsTable />
        </header>
      </AppContextProvider>
    </div>
  );
}

export default App;
