import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFetch } from "../hook/useFetch";
import { SongDataInterface } from "../helper/interface";
import { setAllSongData, setSong } from "../store/slice/BaseSlice";

export default function MusicList() {
  const dispatch = useDispatch();
  const { data, fetchData, isLoading } = useFetch<SongDataInterface[]>();

  useEffect(() => {
    fetchData("http://localhost:4000/music");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setAllSongData(data));
      localStorage.setItem("allData", JSON.stringify(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleMusicClick = (id: number) => {
    if (data) {
      const clickedSong = data.filter((song) => song.id === id);
      dispatch(setSong(clickedSong[0]));
      localStorage.setItem("selectedMusic", JSON.stringify(clickedSong[0]));
    }
  };

  return (
    <div className="w-96 h-screen bg-gray-100">
      <p className="text-2xl font-semibold p-8">My Library</p>
      <div className="fixed w-96 overflow-y-auto h-5/6">
        {isLoading ? (
          <p>Loading...</p>
        ) : data ? (
          data.map((dataList) => (
            <div
              className="py-5 px-8 cursor-pointer"
              key={dataList.id}
              onClick={() => handleMusicClick(dataList.id)}
            >
              <div className="flex items-center">
                <img src={dataList.artwork} className="w-16" />
                <div className="ml-5">
                  <p className="font-semibold text-base">{dataList.title}</p>
                  <p className="text-xs mt-1">{dataList.artist}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No music found</p>
        )}
      </div>
    </div>
  );
}
