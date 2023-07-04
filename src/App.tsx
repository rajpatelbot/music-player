import "./App.css";
import MusicCard from "./components/MusicCard";
import MusicList from "./components/MusicList";

function App() {
  return (
    <>
      <div className="flex w-full">
        <MusicList />
        <MusicCard />
      </div>
    </>
  );
}

export default App;
