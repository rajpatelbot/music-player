export interface BaseSliceInterface {
  loading: boolean;
  allSongData: SongDataInterface[];
  songData: SongDataInterface;
}

export interface SongDataInterface {
  title: string;
  artist: string;
  artwork: string;
  url: string;
  id: number;
}

export interface StateInterface {
  base: BaseSliceInterface;
}

export interface SetLoadingAction {
  payload: boolean;
  type: string;
}

export interface SetAllSongDataAction {
  payload: SongDataInterface[];
  type: string;
}

export interface setSongAction {
  payload: SongDataInterface;
  type: string;
}
