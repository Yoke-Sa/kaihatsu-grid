import axios from "axios";
import Link from "next/link";
import React, { useContext } from "react";
import { LocationPointContext, PageStateContext, UserIdContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { BaseFooter } from "../../component/template/Footer/BaseFooter";
import { BaseHeader } from "../../component/template/Header/BaseHeader";
import { DynamicRouteMap } from "../AddRoutePage";

const Url = "http://tktm.kohga.local:3000/next"

const CarWatchPage = () => {
    const { setPage } = useContext(PageStateContext);
    const { setPoint, setPoly } = useContext(LocationPointContext)
    const { userId, setUserId } = useContext(UserIdContext);
    const onClickMenu = () => {
        setPoint([]);
        setPoly([[]]);
        OnClickSetState(1, setPage)
    }

    // バッテリー残量の可視化
    const charge = 50;
    document.documentElement.style.setProperty('--charge', String(charge+"px"));
    if(charge >= 80) document.documentElement.style.setProperty('--battery-color', "rgb(255, 68, 68)");
    else document.documentElement.style.setProperty('--battery-color', "rgb(8, 175, 8)");

    const postdata = { "userId": userId }

    const onClickNext = () => {
        axios.post(Url, postdata)
            .then((res) => {
                console.log(res.data);
            })
            .catch((e) => console.log(e));
    }
    return (
        <>
            <div className="container map car-watch">
                <BaseHeader>
                    <BaseButton onClick={onClickMenu} _className="button">
                        戻る
                    </BaseButton>
                    <BaseButton onClick={onClickNext} _className="button">
                        発進
                    </BaseButton>
                    <span className="battery"><p>{100-charge}%</p></span>
                </BaseHeader>
                <main>
                    <DynamicRouteMap />
                </main>
                <BaseFooter />
            </div>
        </>
    )
}
export default CarWatchPage