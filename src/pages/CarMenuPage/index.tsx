import React, { useContext } from "react";
import { PageStateContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
const CarMenuPage = () => {

    const { page, setPage } = useContext(PageStateContext);
    return (
        <div className="container car-menu">
            <header>
                <h1><span>Car Menu</span></h1>
            </header>

            <main>
                <BaseButton onClick={() => OnClickSetState(2, setPage)} _className="button tooltip">
                    新規ルート指定
                    <span className="tooltip-text">任意の場所を指定する</span>
                </BaseButton>
                <BaseButton onClick={() => OnClickSetState(3, setPage)} _className="button tooltip">
                    既存ルート選択
                    <span className="tooltip-text">既存の経路を指定する</span>
                </BaseButton>
                <BaseButton onClick={() => OnClickSetState(5, setPage)} _className="button tooltip">
                    車を見る
                    <span className="tooltip-text">車の状況を確認する</span>
                </BaseButton>
                <BaseButton onClick={() => OnClickSetState(6, setPage)} _className="button tooltip">
                    終了
                    <span className="tooltip-text">接続を終了する</span>
                </BaseButton>
            </main>

            <footer>
                <h1>&copy; Kohga. All rights Reserved.</h1>
            </footer>
        </div>
    )
}
export default CarMenuPage;