// / <reference types="react-scripts" />
import type { BrowserProvider, Eip1193Provider } from 'ethers/types/providers';

declare global {
  interface Window {
    ethereum?: Eip1193Provider & BrowserProvider;
    BinanceChain?: unknown;
  }
}
