import "../styles/import.scss";
import type { AppProps } from "next/app";
import React, { createContext, useState } from "react";
import { PageLoading } from "../component/hooks/pageLoading";

export const LoadingContext = createContext(
	{} as {
		pageLoading: boolean;
		setPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
	}
);

// モーダル表示省略用
export const ChangeShortCut = createContext(
	{} as {
		firstPage: boolean;
		setFirstPage: React.Dispatch<React.SetStateAction<boolean>>;
		secondPage: boolean;
		setSecondPage: React.Dispatch<React.SetStateAction<boolean>>;
		thirdPage: boolean;
		setThirdPage: React.Dispatch<React.SetStateAction<boolean>>;
	}
);

function MyApp({ Component, pageProps }: AppProps) {
	const [ pageLoading, setPageLoading ] = useState<boolean>(false);
	const [ firstPage, setFirstPage ] = useState<boolean>(false);
	const [ secondPage, setSecondPage ] = useState<boolean>(false);
	const [ thirdPage, setThirdPage ] = useState<boolean>(false);

	return (
		<>
			<PageLoading isShow={pageLoading} />
			<LoadingContext.Provider value={{ pageLoading, setPageLoading }}>
				<ChangeShortCut.Provider
					value={{ firstPage, setFirstPage, secondPage, setSecondPage, thirdPage, setThirdPage }}
				>
					<Component {...pageProps} />
				</ChangeShortCut.Provider>
			</LoadingContext.Provider>
		</>
	);
}

export default MyApp;
