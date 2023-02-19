import React from "react";
import { token , canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";


function Faucet(props) {

  const [disabled, setdisable] = React.useState(false);
  const [buttontext, setbuttontext] = React.useState("Gimme gimme");


  async function handleClick(event) {
    setdisable(true);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedUser = createActor(canisterId , {
      agentOptions:{
        identity,
      },
    });

    const result = await authenticatedUser.payOut();
    setbuttontext(result);

  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free NTL Coins here! Claim 10,000 NTL coins to {props.principal}.</label>
      <p className="trade-buttons">
        <button 
        id="btn-payout" 
        onClick={handleClick}
        disabled={disabled}>
          {buttontext}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
