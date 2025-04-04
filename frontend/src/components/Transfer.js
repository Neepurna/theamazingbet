import React, { useState } from "react";

export function Transfer({ transferTokens, tokenSymbol }) {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const addresses = [
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906"
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target);
    const amount = formData.get("amount");

    if (selectedAddress && amount) {
      await transferTokens(selectedAddress, amount);
    }
    setIsLoading(false);
  };

  return (
    <div className="card shadow-lg border-0 rounded-3 bg-dark text-light">
      <div className="card-header bg-warning text-dark p-3">
        <h4 className="card-title mb-0 d-flex align-items-center">
          <i className="bi bi-joystick me-2"></i>
          Game Wallet Transfer
          
        </h4>
      </div>
      
      <div className="card-body p-4">
        <div className="alert alert-warning mb-4" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          You're about to transfer in-game tokens. Choose wisely!
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label className="form-label text-warning fw-bold">
              <i className="bi bi-person-badge me-2"></i>
              Select Player
            </label>
            <select 
              className="form-select form-select-lg bg-dark text-light border-warning"
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
              required
            >
              <option value="">Select a player to transfer to...</option>
              {addresses.map((address, index) => (
                <option key={index} value={address}>
                  Player {index + 1}: {address.substring(0, 6)}...{address.substring(38)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group mb-4">
            <label className="form-label text-warning fw-bold">
              <i className="bi bi-coin me-2"></i>
              Game Tokens Amount
            </label>
            <div className="input-group input-group-lg">
              <input
                className="form-control bg-dark text-light border-warning"
                type="number"
                step="1"
                name="amount"
                placeholder="Enter amount"
                required
              />
              <span className="input-group-text bg-warning text-dark">
                <i className="bi bi-gem me-1"></i>
                {tokenSymbol}
              </span>
            </div>
          </div>

          <div className="d-grid gap-2">
            <button 
              className={`btn ${isLoading ? 'btn-secondary' : 'btn-warning'} btn-lg position-relative`}
              type="submit"
              disabled={!selectedAddress || isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Processing Transfer...
                </>
              ) : (
                <>
                  <i className="bi bi-controller me-2"></i>
                  Send Game Tokens
                </>
              )}
              
            </button>
          </div>
        </form>

        <div className="mt-4">
          <div className="d-flex justify-content-between text-warning mb-2">
            <small>Transfer Progress</small>
            <small>{isLoading ? 'Processing...' : 'Ready'}</small>
          </div>
          <div className="progress bg-dark">
            <div 
              className="progress-bar progress-bar-striped progress-bar-animated bg-warning" 
              role="progressbar" 
              style={{width: isLoading ? "100%" : "0%"}}
            />
          </div>
        </div>

        
      </div>
      
 
    </div>
  );
}
