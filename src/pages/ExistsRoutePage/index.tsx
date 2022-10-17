import React, { useContext } from "react";
import { PageStateContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { FormSelect } from "../../component/atoms/select/BaseSelect";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { BaseHeader } from "../../component/template/Header/BaseHeader";
import { DynamicRouteMap } from "../AddRoutePage";

const ExistsRoutePage = () => {
    const { setPage } = useContext(PageStateContext);
    //ここにアクセスした時にuseEffectで、星くんにGETで保存してある経路名と
    //LatLng[][]を取ってくる
    //ここでLatLng[][]を取ってきても映らないから何かロジックを考えないといけない
    //ここにMapを持ってきてここでダイナミックインポート
    return (
        <div className="container map exist-route">
            <BaseHeader>
                <BaseButton onClick={() => OnClickSetState(1, setPage)} _className="button">
                    車メニューに戻る
                </BaseButton>

                <BaseButton onClick={() => OnClickSetState(4, setPage)} _className="button">
                    この経路に行く
                </BaseButton>
            </BaseHeader>
            
            <main>
                <DynamicRouteMap />
            </main>

            <footer>
                <h1>&copy; Kohga. All rights Reserved.</h1>
            </footer>
        </div>
    )
}
export default ExistsRoutePage