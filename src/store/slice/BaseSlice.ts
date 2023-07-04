import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import {
  BaseSliceInterface,
  SetAllSongDataAction,
  SetLoadingAction,
  SongDataInterface,
  setSongAction,
} from "../../helper/interface";

const localSong = localStorage.getItem("selectedMusic");
const selectedSong: SongDataInterface = localSong && JSON.parse(localSong);

const allMusicData = localStorage.getItem("allData");
const parsedAllData: SongDataInterface[] =
  allMusicData && JSON.parse(allMusicData);

const randonSong: SongDataInterface | undefined = _.sample(parsedAllData);

const initialState: BaseSliceInterface = {
  loading: false,
  allSongData: [],
  songData: (selectedSong || randonSong) ?? {
    title: "Death Bed",
    artist: "Powfu",
    artwork: "https://samplesongs.netlify.app/album-arts/death-bed.jpg",
    url: "https://samplesongs.netlify.app/Death%20Bed.mp3",
    id: 1,
  },
};

export const BaseSlice = createSlice({
  name: "base",
  initialState,
  reducers: {
    setLoading: (state, action: SetLoadingAction) => {
      state.loading = action.payload;
    },
    setAllSongData: (state, action: SetAllSongDataAction) => {
      state.allSongData = action.payload;
    },
    setSong: (state, action: setSongAction) => {
      state.songData = action.payload;
    },
  },
});

export const { setLoading, setAllSongData, setSong } = BaseSlice.actions;
export default BaseSlice.reducer;
