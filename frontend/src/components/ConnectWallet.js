import React from "react";
import { NetworkErrorMessage } from "./NetworkErrorMessage";
import Lottie from "lottie-react";
import walletAnimation from "../animations/animation.json";

export function ConnectWallet({ connectWallet, networkError, dismiss }) {
  return (
    <div className="container mt-5">
      <div className="row justify-content-md-center">
        <div className="col-12 text-center">
          {networkError && (
            <NetworkErrorMessage message={networkError} dismiss={dismiss} />
          )}
        </div>
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body text-center">
              <h2 className="card-title mb-4">The Amazing Bet</h2>
              <div style={{ width: '280px', margin: '0 auto', marginBottom: '2rem' }}>
                <Lottie 
                  animationData={walletAnimation}
                  loop={true}
                  autoplay={true}
                />
              </div>
              <p className="card-text text-muted mb-4">Please connect your wallet to begin</p>
              <button
                className="btn btn-outline-primary btn-lg"
                type="button"
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
