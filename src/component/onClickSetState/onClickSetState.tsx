import React from "react";

const pagePath = [
    '/',
    '/CarMenuPage',
    '/DestinationMapPage',
    '/ExistsRoutePage',
    '/AddRoutePage',
    '/CarWatchPage',
    '/EndPage',
    '/CarWatchPage',
    '/PathOK',
    '/AllCar',
    '/WelcomePage'
];

export const OnClickSetState = (num: number, setPage: React.Dispatch<React.SetStateAction<number>>) => {
    setPage(num)
    window.history.pushState(null, '', pagePath[num]);
}

export const Urltonumber = (url: string) => pagePath.indexOf(url);


