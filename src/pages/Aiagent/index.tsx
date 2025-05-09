import React, { useContext, useEffect, useRef } from 'react';

import { AuthContext } from 'context/AuthContext';

import './ChatApp.css';

const AiagentPage: React.FC = () => {
  const { account } = useContext(AuthContext);
  // const [walletAddress, setWalletAddress] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // useEffect(() => {
  //   setWalletAddress(account?.address);
  // }, [account?.address]);

  useEffect(() => {
    const sendWalletAddress = () => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        const targetOrigin = 'https://onyx-frontend-main.vercel.app/';

        iframeRef.current.contentWindow.postMessage(
          {
            type: 'WALLET_CONNECTION',
            walletAddress: account?.address,
          },
          targetOrigin,
        );

        console.log('Wallet address sent to iFrame', account?.address);
      }
    };

    if (iframeRef.current) {
      iframeRef.current.addEventListener('load', sendWalletAddress);
    }

    return () => {
      if (iframeRef.current) {
        iframeRef.current.removeEventListener('load', sendWalletAddress);
      }
    };
  }, [account?.address]);

  return (
    <div className="ai-agent-container">
      <iframe
        ref={iframeRef}
        src="https://onyx-frontend-main.vercel.app/"
        title="AI Agent"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          maxWidth: '100%',
        }}
      />
    </div>
  );
};

export default AiagentPage;
