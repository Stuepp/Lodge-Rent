/*
import { useEffect, useState } from "react";
import { Lodge_interface } from "../page";

type MenuItensProp = {
  onStateDrop: () => void;
  onStatePick: () => void;
  lodges: Lodge_interface[];
}

export default function DropDownMenu({onStateDrop, onStatePick, lodges} : MenuItensProp) {
  const [stateDrop, setStateDrop] = useState<[string, boolean]>(['z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700', false])

  return (
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
  );
}
  */