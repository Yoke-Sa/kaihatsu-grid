import axios from "axios";
import React, { useContext, useEffect } from "react";
import { PageStateContext, UserIdContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { BaseFooter } from "../../component/template/Footer/BaseFooter";
import { BaseHeader } from "../../component/template/Header/BaseHeader";

const Url = "http://saza.kohga.local:3001/isAcceptable"

const CarMenuPage = () => {

    const { userId, setUserId } = useContext(UserIdContext);
    const { page, setPage } = useContext(PageStateContext);

    const onClickDestinationMap = async () => {
        console.log('userId', userId);

        const postdata = { "userId": userId };
        OnClickSetState(2, setPage) //DEBUG
        await axios.post(Url, postdata)
            .then((res) => {
                console.log(res.data);
                if (res.data.succeeded === true) {
                    //OnClickSetState(2, setPage)
                } else {
                    alert('車が見つかりませんでした。時間を空けてもう一度お試しください')
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }

    return (
        <>
            <div className="container car-menu">
                <BaseHeader>
                    <h1>
                        <span>Car Menu</span>
                    </h1>
                </BaseHeader>
                <main>
                    <BaseButton onClick={onClickDestinationMap} _className="button">
                        新規ルート開拓
                    </BaseButton>
                    <BaseButton onClick={() => OnClickSetState(3, setPage)} _className="button">
                        既存ルート選択する
                    </BaseButton>
                    <BaseButton onClick={() => OnClickSetState(5, setPage)} _className="button">
                        車を見る
                    </BaseButton>
                    <BaseButton onClick={() => OnClickSetState(6, setPage)} _className="button">
                        終わり
                    </BaseButton>
                </main>

                <BaseFooter />
            </div>
        </>
    )
}
export default CarMenuPage;