"use client"

import { useEffect, useState } from "react";
import Lodge from "./components/Lodge";
import SearchBar from "./components/SearchBar";
import api from "./hooks/api";

export interface Lodge_interface {
  id: number;
  name: string;
  description: string;
  city: string;
  state: string;
  nightly_price: number;
  image_url: string;
}

export default function Home() {
  const [lodges, setLodges] = useState<Lodge_interface[]>([]);
  const [cidade, setCidade] = useState<string>('');
  const [estado, setEstado] = useState<string>('');
  const [favFilter, setFavFilter] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [stateDrop, setStateDrop] = useState<[string, boolean]>(['z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700', false])

  const fetchLodges = async() => {
    try{
      const response = await api.get('/acomodacoes'+`?cidade=${cidade}&estado=${estado}`);
      setLodges(response.data.lodges);
    } catch(err) {
      console.log('Error fetching lodges ', err);
    }
  };

  useEffect(() => {
    if(typeof window !== "undefined"){
      const storedFavorites = localStorage.getItem("favorites");
      setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
    }
    fetchLodges();
  }, []);

  const onStatePick = (state: string) => {
    setEstado(state)
    onStateDrop();
    fetchLodges();
  }

  const onFavFilter = () => {
    if (favFilter){
      setFavFilter(false);
    }else {
      setFavFilter(true);
    }
  }

  const onStateDrop = () => {
    if(stateDrop[1]){
      setStateDrop(['z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700', false]);
    }else{
      setStateDrop(['absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700', true]);
    }
  }

  const filteredLodges = favFilter
    ? lodges.filter((lodge: Lodge_interface) => favorites.includes(lodge.id))
    : lodges;

  return (
    <div className="p-5">
      <div className="my-5 flex flex-row flex-wrap justify-evenly w-full">
        <button 
          className="text-white bg-blue-700 
          hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg
            text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700
          dark:focus:ring-blue-800"
          onClick={onFavFilter}>{favFilter ? 'Show All Lodges' : 'Show Only Favorites Lodges'}</button>
        
        <div>
          <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 
          hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg
            text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700
          dark:focus:ring-blue-800" type="button" onClick={onStateDrop}>
              Filter by state 
            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
          </button>

          <div id="dropdown" className={stateDrop[0]}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => onStatePick('')}
                >None</a>
              </li>
              {[...new Set(lodges.map((lodge: Lodge_interface) => lodge.state))].map((state) => (
                <li key={state}>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => onStatePick(state)}
                  >{state}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <SearchBar value={cidade} onChange={(e:any) => {setCidade(e.target.value)}} onSubmit={fetchLodges} />
      </div>
      <div className="flex flex-row flex-wrap justify-evenly w-full">
        {filteredLodges.map((lodge: Lodge_interface) => (
          <Lodge
            key={lodge.id}
            id={lodge.id}
            name={lodge.name}
            city={lodge.city}
            state={lodge.state}
            nightly_price={lodge.nightly_price}
            image_url={lodge.image_url} />
        ))}
      </div>
    </div>
  );
}
