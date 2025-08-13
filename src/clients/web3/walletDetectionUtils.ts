export const isRunningInOperaBrowser = () => window.ethereum?.isOpera;

export const isRunningInBinanceChainWallet = () => !!window.BinanceChain;

export const detectProvider = async (timeout = 3000): Promise<any> => {
  let handled = false;

  return new Promise(resolve => {
    function handleProvider() {
      if (handled) return;
      handled = true;
      window.removeEventListener('ethereum#initialized', handleProvider);
      resolve(window.ethereum);
    }

    if (window.ethereum) {
      handleProvider();
    } else {
      window.addEventListener('ethereum#initialized', handleProvider, { once: true });

      const interval = setInterval(() => {
        if (window.ethereum) {
          handleProvider();
        }
      }, 100);

      setTimeout(() => {
        if (!handled) {
          clearInterval(interval);
          window.removeEventListener('ethereum#initialized', handleProvider);
          resolve(null);
        }
      }, timeout);
    }
  });
};
