import { useState } from "react";
import { SongDataInterface } from "../helper/interface";

export const useLocalStorage = () => {
  const [value, setValue] = useState<SongDataInterface | null>(null);

  const getLocalData = (key: string) => {
    const storedData = localStorage.getItem(key);

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setValue(parsedData);
    }
  };

  const setLocalStorageData = (key: string, data: SongDataInterface) => {
    const stringifyData = JSON.stringify(data);

    if (stringifyData) {
      localStorage.setItem(key, stringifyData);
    }
  };

  return { value, getLocalData, setLocalStorageData };
};
