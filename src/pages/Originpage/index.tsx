import React, { useContext } from "react";
import { PageStateContext } from "..";
import AddRoutePage from "../AddRoutePage";
import CarKanri from "../CarKanri";
import CarMenuPage from "../CarMenuPage";
import CarWatchPage from "../CarWatchPage";
import DestinationMapPage from "../DestinationMapPage";
import EndPage from "../EndPage";
import ExistsRoutePage from "../ExistsRoutePage";
import WelcomePage from "../WelcomePage";
import PathOK from "../PathOK";
import AllCar from "../AllCar";


const OriginPage = () => {
    const { page } = useContext(PageStateContext);

    if (page === 0 || page === 10) {
        return (
            <WelcomePage />
        )
    } else if (page === 1) {
        return (
            <CarMenuPage />
        )
    } else if (page === 2) {
        return (
            <DestinationMapPage />
        )
    } else if (page === 3) {
        return (
            <ExistsRoutePage />
        )
    } else if (page === 4) {
        return (
            <AddRoutePage />
        )
    } else if (page === 5) {
        return (
            <CarWatchPage />
        )
    } else if (page === 6) {
        return (
            <EndPage />
        )
    } else if (page === 7) {
        return (
            <CarKanri />
        )
    } else if (page === 8) {
        return (
            <PathOK />
        )
    } else if (page === 9) {
        return (
            <AllCar />
        )
    } else {
        /*　NEVER REACHED */
        void 0;
    }
    return <></>
}
export default OriginPage