import axios from "axios";
import React, { useCallback, useContext } from "react"
import { PageStateContext, UserIdContext } from ".."
import { BaseButton } from "../../component/atoms/button/BaseButton"
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { BaseFooter } from "../../component/template/Footer/BaseFooter";
import { BaseHeader } from "../../component/template/Header/BaseHeader";

const Url = "http://saza.kohga.local:3001/createUser"

const WelcomePage = () => {
    const { setPage } = useContext(PageStateContext);
    const { userId, setUserId } = useContext(UserIdContext);

    const onClickCaruse = async () => {
        OnClickSetState(1, setPage) //DEBUG
        await axios.get(Url)
            .then((res) => {

                if (res.data.succeeded === true) {
                    setUserId(res.data.userId);
                    console.log(setUserId);
                    //OnClickSetState(1, setPage);
                } else {
                    alert('車が空いていません。少し待っててね')
                    setUserId('');
                }
            })
            .catch((e) => console.log(e))
    }

    return (
        <>
            <div className="welcome">
                <BaseHeader>
                    <h1>
                        <span>Kohga TOP</span>
                    </h1>
                </BaseHeader>
                <main>
                    <ul>
                        <li>
                            <h1>車の利用</h1>
                            <p>車との通信を行います</p>
                            <BaseButton onClick={onClickCaruse} _className="button">
                                車を使う
                            </BaseButton>
                        </li>
                        <li>
                            <h1>管理画面</h1>
                            <p>車の管理を行います</p>
                            <BaseButton onClick={() => OnClickSetState(7, setPage)} _className="button">
                                車管理マネージャ
                            </BaseButton>
                        </li>
                    </ul>
                </main>
                <aside className="left" />
                <aside className="right" />
                <BaseFooter />

            </div>

        </>
    )
}
export default WelcomePage;