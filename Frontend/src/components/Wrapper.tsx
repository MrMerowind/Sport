import React, { useEffect, useLayoutEffect, useState } from 'react'
import Punctaction from "./Punctaction"
import YourPoints from './YourPoints'
import Login from './Login';
import User from '../data/user';
import HallOfFame from './HallOfFame';

/*async function postData(url: string, data: User) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  return response.json();
}*/

export default function Wrapper() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function setCredentials(newLogin: string, newPassword: string)
  {
    setName(newLogin);
    setPassword(newPassword);

    console.log("Loading data from the server.");

      const credentialsUser = new User();
      credentialsUser.name = newLogin;
      credentialsUser.password = newPassword;

      if(credentialsUser.name === "") return;

      fetch("https://backend.sport.mrmero.com/load/" + newLogin + "/" + newPassword).then(response => response.json())
      .then(data => {

      }).catch((e) => {setName(""); setPassword("")});
  }

  return (
    <div className='window-wrapper'>
      {name !== "" ? <p>Zalogowano jako: {name}</p> : null}
      {name !== "" ? <Punctaction /> : null}
      {name !== "" ? <YourPoints name={name} password={password} /> : null}
      {name !== "" ? <HallOfFame /> : null}
      {name === "" ? <Login singin={setCredentials}/> : null}
      <div>
        {name !== "" ? <button type='button' onClick={() => {setName("")}}>Wyloguj</button> : null}
        
      </div>
    </div>
  )
}
