import Link from "next/link";
import React, { useContext } from "react";
import { LocationPointContext, PageStateContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { BaseHeader } from "../../component/template/Header/BaseHeader";
import { DynamicRouteMap } from "../AddRoutePage";

const CarWatchPage = () => {
    const { setPage } = useContext(PageStateContext);
    const { setPoint, setPoly } = useContext(LocationPointContext)
    const onClickMenu = () => {
        setPoint([]);
        setPoly([[]]);
        OnClickSetState(1, setPage)
    }
    return (
        <div className="car-watch">
            <BaseHeader>
                <BaseButton onClick={() => OnClickSetState(1, setPage)} _className="button">
                    車メニューに戻る
                </BaseButton>
            </BaseHeader>

            <main>
                <div className="gakubuti">
                    <DynamicRouteMap />
                </div>
            </main>

            <footer>
                <h1>&copy; Kohga. All rights Reserved.</h1>
            </footer>
        </div>
    )
}
export default CarWatchPage