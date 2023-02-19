import React from "react";
import { token } from "../../../declarations/token";
import { Principal } from "@dfinity/principal";
import { canisterId , createActor } from "../../../declarations/token";
import { AuthClient } from "../../../../node_modules/@dfinity/auth-client/lib/cjs/index";

function Transfer() {
  
  const [id , setid] = React.useState("");
  const [amount , setamount] = React.useState("");
  const [disable , setdisable] = React.useState(false);
  const [feedback , setfeedback] = React.useState("");
  const [hidden , sethidden] = React.useState(true);


  async function handleClick() {
    sethidden(true);
    setdisable(true);
    const recieptid = Principal.fromText(id);
    const recieptamount = Number(amount);


    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity()
    const authenticatedUser = createActor(canisterId,{
      agentOptions:{
        identity,
      },
    });
    const result = await authenticatedUser.transfer(recieptid, recieptamount);
    // use token.transfer to deploy offline.
    sethidden(false);
    setfeedback(result);
    setdisable(false);
    
    
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={id}
                onChange={(e) => setid(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setamount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" 
          onClick={handleClick}
          disabled={disable} >
            Transfer
          </button>
        </p>
        <p hidden={hidden}>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
