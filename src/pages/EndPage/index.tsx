import React, { useContext } from "react";
import { PageStateContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";

const EndPage = () => {
    const { setPage } = useContext(PageStateContext);
    return (
        <div className="container end">
            <header>
                <h1><span>Thank you for coming</span></h1>
            </header>

            <main>
                <h1>　ご利用ありがとうございました。<br /><br />　またのご利用お待ちしております。</h1>
                <div>
                    <BaseButton onClick={() => OnClickSetState(0, setPage)} _className="button">
                        TOPへ
                    </BaseButton>
                </div>
            </main>

            <footer>
                <h1>&copy; Kohga. All rights Reserved.</h1>
            </footer>
        </div>
    )
}
export default EndPage