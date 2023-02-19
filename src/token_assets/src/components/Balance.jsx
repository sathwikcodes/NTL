import React from "react";
import { Principal } from "@dfinity/principal";
import { token } from "../../../declarations/token";

function Balance() {
  const [inputValue , setInput] = React.useState("");
  const [balanceResult , setBalance] = React.useState("");
  const [cryptoSymbol , setCryptosymbol] = React.useState("");
  const [isHidden, setisHidden] = React.useState(true);


  async function handleClick() {
  //  console.log(inputValue);
  const principal = Principal.fromText(inputValue);
  const balance = await token.balanceOf(principal);
  setBalance(balance.toLocaleString());
  const crypto = await token.getSymbol();
  setCryptosymbol(crypto.toLocaleString());
  setisHidden(false);
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e) => setInput(e.target.value) }
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {balanceResult} {cryptoSymbol} Coins.</p>
    </div>
  );
}

export default Balance;
