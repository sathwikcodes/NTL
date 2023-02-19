import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client";

const init = async () => { 
  const authClient = await AuthClient.create();

  if(await authClient.isAuthenticated()){
    handleAuthenticated(authClient);
  }else{
    await authClient.login({
      identityProvider :"https://identity.ic0.app/#authorize",
      onSuccess: async () => {
        handleAuthenticated(authClient);
      },
    });
  }

  async function handleAuthenticated(authClient){

    const identity = await authClient.getIdentity();
    const principal = await identity._principal.toString();
    console.log(principal);
    ReactDOM.render(<App loggedInPrincipal = {principal}/>, document.getElementById("root"));
  }
  
}


init();


