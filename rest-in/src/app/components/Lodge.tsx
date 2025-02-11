import Image from "next/image";
import { useEffect, useState } from "react";
import Link from 'next/link'

type LodgeProps = {
  id: number;
  name: string;
  city: string;
  state: string;
  nightly_price: number;
  image_url: string;
}

export default function Lodge({id, name, city, state, nightly_price, image_url} : LodgeProps) {
  const [star, setStar] = useState<string>('/gray-star.svg');

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if(storedFavorites.includes(id)){
      setStar('/star.svg');
    }else {
      setStar('/gray-star.svg');
    }
  }, [id]);


  const onStar = () => {
    if(star === '/gray-star.svg'){
      setStar('/star.svg');
      let stored_favorites = localStorage.getItem("favorites")
      const favorites = JSON.parse(stored_favorites || '[]');
      favorites.push(id);
      localStorage.setItem("favorites",JSON.stringify(favorites));
    }else {
      setStar('/gray-star.svg');
      let stored_favorites = localStorage.getItem("favorites")
      const favorites = JSON.parse(stored_favorites || '[]');
      const new_favs = favorites.filter((el:any) => el != id);
      localStorage.removeItem('favorites')
      localStorage.setItem("favorites",JSON.stringify(new_favs));
    }
  }
  
  return (
    <div className="w-[320px]" key={id}>
      <div className="relative">
        <Link href={{
          pathname:'/lodge',
          query: {id:id}
          }}>
          <Image src={image_url} width={320} height={300} alt="image of the lodge" className="rounded-md cursor-pointer object-cover w-[320px] h-[300px]" />
        </Link>
        <Image src={star} width={30} height={30} alt="favorite button"
          className="absolute top-[8px] right-[16px] cursor-pointer
          bg-sky-50 rounded-md
          transition-transform duration-300 ease-in-out
          hover: scale-110"
          onClick={onStar}
        />
      </div>
      <div className="py-2 pl-2">
        <div className="flex flex-row justify-between w-full">
          <h2>{name}</h2>
          <h2 className="font-bold">R$: {nightly_price}</h2>
        </div>
        <h3>{city}, {state}</h3>
      </div>
    </div>
  );
}