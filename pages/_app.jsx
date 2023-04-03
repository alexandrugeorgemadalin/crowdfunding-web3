import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, goerli, WagmiConfig } from "wagmi";
import { mainnet, polygon, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "@wagmi/core/providers/alchemy";
import MainLayout from "@/components/layout/main-layout";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "@/reducers/rootReducer";
const { chains, provider } = configureChains(
  [mainnet, polygon, goerli, polygonMumbai],
  [publicProvider(), alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY })]
);

const { connectors } = getDefaultWallets({
  appName: "Crowdfunding-Web3",
  chains,
});

const wagmiClient = createClient({
  connectors,
  provider,
});

const store = configureStore({
  reducer: rootReducer,
});

export default function CrowdfundingWeb3({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} modalSize="compact">
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </RainbowKitProvider>
      </WagmiConfig>
    </Provider>
  );
}
