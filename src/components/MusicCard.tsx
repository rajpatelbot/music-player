import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BsFillSkipBackwardFill, BsFillSkipForwardFill } from "react-icons/bs";
import { BiSkipPreviousCircle, BiSkipNextCircle } from "react-icons/bi";
import { StateInterface } from "../helper/interface";
import { setSong } from "../store/slice/BaseSlice";

export default function MusicCard() {
  const dispatch = useDispatch();
  const song = useSelector((state: StateInterface) => state.base.songData);
  const allSongs = useSelector(
    (state: StateInterface) => state.base.allSongData
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(song.url));
  const [percentage, setPercentage] = useState<number | null>(null);
  const [currTime, setCurrTime] = useState<string>("0:00");
  const [totalTime, setTotalTime] = useState<string>("0:00");
  const [savedTime, setSavedTime] = useState<number>(0);

  useEffect(() => {
    audio.src = song.url;

    if (isPlaying) {
      audio.play();
    }
  }, [audio, isPlaying, song.url]);

  useEffect(() => {
    audio.addEventListener("timeupdate", (e) => {
      const { currentTime, duration } = e.target as HTMLAudioElement;
      const total_mins = Math.floor(duration / 60);
      const curr_mins = Math.floor(currentTime / 60);

      let total_secs: string | number = Math.floor(duration % 60);
      let curr_sec: string | number = Math.floor(currentTime % 60);
      if (curr_sec < 10) curr_sec = "0" + curr_sec;
      if (total_secs < 10) total_secs = "0" + total_secs;

      setCurrTime(`${curr_mins}:${curr_sec}`);

      if (!isNaN(curr_sec as number) && !isNaN(total_secs as number)) {
        setTotalTime(`${total_mins}:${total_secs}`);
      }

      const percentage: number = (currentTime / duration) * 100;
      setPercentage(percentage);
    });
  }, [audio]);

  const handlePlay = () => {
    if (!isPlaying) {
      if (savedTime > 0) {
        audio.currentTime = savedTime;
        setSavedTime(0);
      }
      audio.play();
    } else {
      audio.pause();
      setSavedTime(audio.currentTime);
    }
    setIsPlaying(!isPlaying);
  };

  const handleNextPlay = () => {
    const currIndex = allSongs.findIndex((s) => s.id === song.id);
    const nextIndex = (currIndex + 1) % allSongs.length;
    const nextSong = allSongs[nextIndex];
    dispatch(setSong(nextSong));
    setIsPlaying(true);
  };

  const handlePrevPlay = () => {
    const currIndex = allSongs.findIndex((s) => s.id === song.id);
    const prevIndex = (currIndex - 1 + allSongs.length) % allSongs.length;
    const prevSong = allSongs[prevIndex];
    dispatch(setSong(prevSong));
    setIsPlaying(true);
  };

  const handlePrevSkip = () => {
    const currentTime = (audio.currentTime -= 5);
    const curr_mins = Math.floor(currentTime / 60);
    const curr_sec = Math.floor(currentTime % 60);
    setCurrTime(`${curr_mins}:${curr_sec}`);
    setSavedTime(audio.currentTime);
  };

  const handleNextSkip = () => {
    const currentTime = (audio.currentTime += 5);
    const curr_mins = Math.floor(currentTime / 60);
    const curr_sec = Math.floor(currentTime % 60);
    setCurrTime(`${curr_mins}:${curr_sec}`);
    setSavedTime(audio.currentTime);
  };

  return (
    <div className="h-max w-80 bg-slate-50 rounded shadow-md m-auto py-3">
      {allSongs.length > 0 ? (
        <div className="flex flex-col h-full justify-center">
          <p className="text-xl font-semibold text-center text-sky-600">
            {song.title}
          </p>
          <p className="text-base text-center mt-2">{song.artist}</p>
          <img
            src={song.artwork}
            alt={song.title}
            className="w-48 rounded-full m-auto my-5"
          />

          <div className="m-3">
            <div className="flex-start flex h-1.5 w-full overflow-hidden bg-white font-sans text-xs font-medium rounded-lg">
              <div
                className="flex h-full items-baseline justify-center overflow-hidden break-all bg-sky-600 text-white"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <div className="flex items-center w-full justify-between mt-1">
              <p className="text-xs">{currTime}</p>
              <p className="text-xs">{totalTime}</p>
            </div>
          </div>

          <div className="w-full flex items-center justify-center">
            <BsFillSkipBackwardFill
              className="px-1 text-3xl cursor-pointer text-gray-600"
              onClick={handlePrevSkip}
            />
            <BiSkipPreviousCircle
              className="px-1 text-4xl cursor-pointer text-gray-600"
              onClick={handlePrevPlay}
            />
            <div onClick={handlePlay}>
              {!isPlaying ? (
                <AiFillPlayCircle className="px-1 text-4xl cursor-pointer text-sky-600" />
              ) : (
                <AiFillPauseCircle className="px-1 text-4xl cursor-pointer text-sky-600" />
              )}
            </div>
            <BiSkipNextCircle
              className="px-1 text-4xl cursor-pointer text-gray-600"
              onClick={handleNextPlay}
            />
            <BsFillSkipForwardFill
              className="px-1 text-3xl cursor-pointer text-gray-600"
              onClick={handleNextSkip}
            />
          </div>
        </div>
      ) : (
        <p>Nothing found</p>
      )}
    </div>
  );
}
