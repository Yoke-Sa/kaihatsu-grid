import React, { useContext } from "react";
import { BaseHeader } from "../../component/template/Header/BaseHeader";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { PageStateContext } from "..";

const AllCar = () => {
	const { page, setPage } = useContext(PageStateContext);
	return (
		<div className="all-car">
			<BaseHeader>
				<h1><span>車一覧</span></h1>
			</BaseHeader>

			<main>
				<p>　all car</p>
				<BaseButton onClick={() => OnClickSetState(7, setPage)} _className="button">
					戻る
				</BaseButton>
			</main>

            <footer>
                <h1>&copy; Kohga. All rights Reserved.</h1>
            </footer>
		</div>
	);
};
export default AllCar;
