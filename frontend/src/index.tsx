import React, { StrictMode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import AppContainer from "./modules/app";
import { Provider } from "react-redux";
import { store } from "./modules/redux/store/store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
	<StrictMode>
		<Provider store={store}>
			<ChakraProvider>
				<BrowserRouter>
					<AppContainer />
				</BrowserRouter>
			</ChakraProvider>
		</Provider>
	</StrictMode>
);
