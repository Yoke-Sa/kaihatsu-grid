import { useEffect } from "react";

export const useShowAlert = () => {
	// イベント登録、解除時に渡す関数
	const showAlertDialog = (event: any) => {
		event.preventDefault(); // リロード押下時に読み込みを防止
		event.returnValue = ""; // 文字列をセット (ブラウザ標準の固定メッセージから変更できない)
	};

	// ページ遷移、リロード時に関数を実行
	useEffect(() => {
		window.addEventListener("beforeunload", showAlertDialog);
		return () => {
			window.removeEventListener("beforeunload", showAlertDialog);
		};
	}, []);
};
