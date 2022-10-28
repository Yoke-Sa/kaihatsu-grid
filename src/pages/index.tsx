import { LatLng } from 'leaflet';
import type { NextPage } from 'next'
import Head from 'next/head';
import { type } from 'os';
import React, { createContext, useEffect, useState } from 'react';
import { Urltonumber } from '../component/onClickSetState/onClickSetState';
import OriginPage from './Originpage';


export type LatLngRadius = {
  pos: LatLng;
  r: number;
}

export const LocationPointContext = createContext({} as {
  point: LatLng[]
  setPoint: React.Dispatch<React.SetStateAction<LatLng[]>>
  poly: LatLng[][]
  setPoly: React.Dispatch<React.SetStateAction<LatLng[][]>>
});

export const CircleContext = createContext({} as {
  circle: LatLngRadius[]
  setCircle: React.Dispatch<React.SetStateAction<LatLngRadius[]>>
  radius: number
  setRadius: React.Dispatch<React.SetStateAction<number>>
})

export const UserIdContext = createContext({} as {
  userId: string
  setUserId: React.Dispatch<React.SetStateAction<string>>
})

export const PageStateContext = createContext({} as {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
});


const Home: NextPage = () => {
  const [point, setPoint] = useState<LatLng[]>([]);
  const [poly, setPoly] = useState<LatLng[][]>([[]]);
  const [page, setPage] = useState<number>(0);
  const [radius, setRadius] = useState<number>(0);
  const [circle, setCircle] = useState<LatLngRadius[]>([]);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => window.addEventListener('popstate', () => setPage(Urltonumber(window.location.pathname))), [])
  return (
    <>
    {/* <Head>
      <link rel="stylesheet" href="https://fonts.xz.style/serve/inter.css" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css" />
    </Head> */}
      <LocationPointContext.Provider value={{ point, setPoint, poly, setPoly }}>
        <PageStateContext.Provider value={{ page, setPage }}>
          <CircleContext.Provider value={{ circle, setCircle, radius, setRadius }}>
            <UserIdContext.Provider value={{ userId, setUserId }}>
              <OriginPage />
            </UserIdContext.Provider>
          </CircleContext.Provider>
        </PageStateContext.Provider>
      </LocationPointContext.Provider>
    </>
  )
}

export default Home
