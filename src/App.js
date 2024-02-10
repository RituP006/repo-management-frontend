import logo from "./logo.svg";
import "./App.css";
import RepoTable from "./components/RepoTable";

function App() {
  return (
    <div className="App">
      <h1 className="heading">Merge Overview</h1>
      <div className="repoTable">
        <RepoTable />
      </div>
    </div>
  );
}

export default App;
