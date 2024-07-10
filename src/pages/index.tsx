'use client'
import Navigation from "@/components/Navigation";
import Image from 'next/image';



export default function Home() {
  return (
      <>
      <Navigation data-testid="navigation"/>
        <div className="flex flex-row justify-center items-center py-60">
          <Image
              src="/images/popcorn.png"
              alt="Popcorn"
              width={150}
              height={150}
              className="animate-bounce"
          />
          <Image
              src="/images/soda.png"
              alt="Soda"
              width={225}
              height={150}
              className="animate-bounce"
          />
          <Image
              src="/images/cut.png"
              alt="Directors Board"
              width={225}
              height={150}
              className="animate-bounce"
          />
          <Image
              src="/images/candy.png"
              alt="Candy"
              width={225}
              height={150}
              className="animate-bounce"
          />
          <Image
              src="/images/movieReel.png"
              alt="Movie Reel"
              width={225}
              height={100}
              className="animate-bounce"
          />
        </div>
        </>
  );
}
