import React, { useCallback, useContext } from "react";
import { PageStateContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { BaseCheckBox } from "../../component/atoms/checkbox/BaseCheckBox";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";

const WelcomePage = () => {
	const { setPage } = useContext(PageStateContext);

	return (
		<div className="welcome">
			<header>
				<h1><span>Kohga TOP</span></h1>
			</header>

			<main>
				<ul>
					<li>
						<h1>車の利用</h1>
						<p>車と通信を行います。</p>
						<BaseButton onClick={() => OnClickSetState(1, setPage)} _className="button tooltip">
							車を使う
                            <span className="tooltip-text">接続開始</span>
						</BaseButton>
					</li>
					<li>
						<h1>管理画面</h1>
						<p>車の管理を行います。</p>
						<BaseButton onClick={() => OnClickSetState(7, setPage)} _className="button tooltip">
							車管理マネージャ
                            <span className="tooltip-text">管理画面へ</span>
						</BaseButton>
					</li>
				</ul>

				<div className="contents">
					<h1>車の利用方法</h1>
					<h2>1. 任意の経路を指定する</h2>
					<p>
						　車を使うボタンを押下後、新規ルート指定ボタンを押すと目的地指定用の地図が表示されます。<br />
                        
                        <span className="dest-img" />
						{/* <label className="dest-img open" htmlFor="pop-up"/>
                        <input type="checkbox" id="pop-up" /> */}

                        <br />
                        　地図の上でタップ/クリックすることで、車の目的地を指定できます。目的地を指定し終えたら、経路探索ボタンを押して少々お待ち下さい。経路が表示された後、OKボタンを押すことでそちらに車が向かい始めます。
                        また、目的地指定後に巡回するボタンを押してから経路探索を開始すると、表示した経路を巡回することができます。
					</p>
					<h2>2. 既存の経路を指定する</h2>
					<p>　既存ルート指定ボタンを押すと、ルート選択用の地図が表示されます。</p>

					<h2>3. 車の状態を確認する</h2>
					<p>　車を見るボタンを押すと、車の現在地を確認するための地図が表示されます。</p>

					<h2>4. 終了する</h2>
					<p>　車の利用が完了したら、終了ボタンを押して通信を終了して下さい。</p>
				</div>
			</main>

			<footer>
				<h1>&copy; Kohga. All rights Reserved.</h1>
			</footer>
		</div>
	);
};
export default WelcomePage;
