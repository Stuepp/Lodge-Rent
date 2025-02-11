'use client'

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import api from "../hooks/api";
import Link from 'next/link'

export interface Lodge_interface {
  id: number;
  name: string;
  description: string;
  city: string;
  state: string;
  nightly_price: number;
  image_url: string;
}

export default function blaba() {
  return(
    <Suspense fallback={<div>Loading...</div>}>
      <Lodge_Page />
    </Suspense>
  );
}

function Lodge_Page() {
  const [lodge, setLodge] = useState<Lodge_interface>();
  const searchParam = useSearchParams();
  const id = searchParam.get('id')!;

  const fecthLodge = async() => {
    try{
      const response = await api.get(`/acomodacoes/${id}`)
      setLodge(response.data);
    }catch(err) {
      console.log('Error fetching lodge', err);
    }
  }

  useEffect(() => {
    if(id){
      fecthLodge();
    }
  }, [id])

  return (
    <div>
      {lodge ? (
        <div className="flex flex-row">
          <div>
            <Image src={lodge.image_url} width={320} height={100} alt="image of the lodge"
              className="rounded-md cursor-pointer object-fill
              w-[900px] h-screen" />
          </div>  
          <div className="p-10">
            <h1 className="text-gray-900 font-bold text-5xl mb-2">{lodge.name}</h1>
            <h2 className="text-gray-900 font-bold text-4xl mb-2">{lodge.description}</h2>
            <h3 className="text-gray-900 font-bold text-3xl mb-2">{lodge.city}, {lodge.state}</h3>
            <h3 className="text-gray-900 font-bold text-2xl mb-2">R$: {lodge.nightly_price}</h3>
            <Link href={'/'}
              className="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
            <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
            </svg>
            Previous page
            </Link>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}