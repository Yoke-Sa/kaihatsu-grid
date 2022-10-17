import dynamic from "next/dynamic";
import React, { useContext } from "react";
import { PageStateContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import BaseCircleMap from "../../component/map/BaseCircleMap";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { BaseHeader } from "../../component/template/Header/BaseHeader";


const DynamicMap = dynamic(() => {
    return import('../../component/map/BaseCircleMap')
},
    { ssr: false }
)

const CarKanri = () => {
    const { page, setPage } = useContext(PageStateContext);
    return (
        <div className="container car-manage">
            <BaseHeader>
                <h1><span>Car Manage</span></h1>
            </BaseHeader>

            <main>
                <BaseButton onClick={() => OnClickSetState(8, setPage)} _className="button tooltip">
                    通行可能領域設定
                    <span className="tooltip-text">車が通行可能な範囲を設定する</span>
                </BaseButton>
                <BaseButton onClick={() => OnClickSetState(9, setPage)} _className="button tooltip">
                    車一覧
                </BaseButton>
                <BaseButton onClick={() => OnClickSetState(0, setPage)} _className="button tooltip">
                    TOPへ
                </BaseButton>
            </main>

            <footer>
                <h1>&copy; Kohga. All rights Reserved.</h1>
            </footer>
        </div>
    )
}
export default CarKanri;