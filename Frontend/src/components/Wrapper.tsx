import React, { useEffect, useLayoutEffect, useState } from 'react'
import Punctaction from "./Punctaction"
import YourPoints from './YourPoints'
import Login from './Login';
import User from '../data/user';

async function postData(url: string, data: User) {
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
}

export default function Wrapper() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurentUser] = useState(new User());

  function setCredentials(newLogin: string, newPassword: string)
  {
    setName(newLogin);
    setPassword(newPassword);

    console.log("Loading data from the server.");

      const credentialsUser = new User();
      credentialsUser.name = newLogin;
      credentialsUser.password = newPassword;

      if(credentialsUser.name === "") return;
      postData("https://backend.sport.mrmero.com/load", credentialsUser).then((data) => {
          console.log(data.body);
          setCurentUser(data.body);
      }).catch((e) => {
        setName("");
        setPassword("");
      });
  }

  return (
    <div className='window-wrapper'>
      {name !== "" ? <Punctaction /> : null}
      {name !== "" ? <YourPoints /> : null}
      {name === "" ? <Login singin={setCredentials}/> : null}
      <div>
        {name !== "" ? <button type='button' onClick={() => {setName("")}}>Wyloguj</button> : null}
      </div>
    </div>
  )
}
