import axios from "axios";
import Script from "next/script";
import React, { useRef, useCallback, useContext, useEffect } from "react";
import { PageStateContext, UserIdContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { BaseFooter } from "../../component/template/Footer/BaseFooter";
import { BaseHeader } from "../../component/template/Header/BaseHeader";
// import mv from "../../assets/movies/backmovie.mp4";

const Url = "http://saza.kohga.local:3001/createUser";

const WelcomePage = () => {
	const { setPage } = useContext(PageStateContext);
	const { userId, setUserId } = useContext(UserIdContext);

	const onClickCarUse = async () => {
		OnClickSetState(1, setPage); //DEBUG
		// await axios.get(Url)
		//     .then((res) => {

		//         if (res.data.succeeded === true) {
		//             setUserId(res.data.userId);
		//             console.log(setUserId);
		//             //OnClickSetState(1, setPage);
		//         } else {
		//             alert('車が空いていません。少し待っててね')
		//             setUserId('');
		//         }
		//     })
		//     .catch((e) => console.log(e))
	};

	const removePoster = () => {
		const mv = document.querySelector(".video");
		mv?.classList.remove("bg-img");
	};

	return (
		<>
			<div className="top-page">
				{/* <video playsInline autoPlay muted loop preload="metadata" ref={videoRef}>
					<source src={mv} type={"video/mp4"} />
					<p>動画の再生に対応していません</p>
				</video> */}

				{/* <span className="free-img" /> */}

				<video
					autoPlay
					muted
					loop
					playsInline
					preload="metadata"
					className="video bg-img"
					onCanPlay={removePoster}
				>
					<source src="/movies/backmovie.webm" type="video/webm"></source>
					<source src="/movies/backmovie.mp4" type="video/mp4"></source>
					<p>動画の再生に対応していません</p>
				</video>

				<h1 className="top-title">Kohga</h1>

				<BaseButton onClick={onClickCarUse} _className="top-button button">
					車を使う
				</BaseButton>

				<p onClick={() => OnClickSetState(7, setPage)} className="go-manage">
					管理画面
				</p>
			</div>
		</>
	);
};
export default WelcomePage;
