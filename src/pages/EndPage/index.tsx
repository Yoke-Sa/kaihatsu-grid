import React, { useContext } from "react";
import { PageStateContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { BaseFooter } from "../../component/template/Footer/BaseFooter";
import { BaseHeader } from "../../component/template/Header/BaseHeader";

const EndPage = () => {
    const { setPage } = useContext(PageStateContext);
    return (
        <>
            <div className="container end">
                <BaseHeader>
                    <h1>
                        <span>
                            Thank you for coming
                        </span>
                    </h1>
                </BaseHeader>
                <main>
                    <h1>ご利用ありがとうございました<br></br>またのご利用をお待ちしております</h1>


                    <div>
                        <BaseButton onClick={() => OnClickSetState(0, setPage)} _className="button">
                            TOPへ
                        </BaseButton>
                    </div>
                </main>
                <BaseFooter />
            </div>
        </>
    )
}
export default EndPage