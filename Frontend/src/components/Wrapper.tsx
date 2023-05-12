import React, { useEffect, useLayoutEffect, useState } from 'react'
import Punctaction from "./Punctaction"
import YourPoints from './YourPoints'
import Login from './Login';
import User from '../data/user';
import HallOfFame from './HallOfFame';

export default function Wrapper() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {

    const localStorageName = localStorage.getItem("name");
    const localStoragePassword = localStorage.getItem("password");

    if(localStorageName !== null) setName(localStorageName);
    if(localStoragePassword !== null) setPassword(localStoragePassword);

  }, []);

  function logout()
  {
    setName("");
    setPassword("");
    localStorage.setItem("name", "");
    localStorage.setItem("password", "");
  }

  function setCredentials(newLogin: string, newPassword: string)
  {
    if(newLogin.includes(" ")) return;
    if(newLogin.includes("/")) return;
    if(newLogin.includes("\\")) return;

    localStorage.setItem("name", newLogin);
    localStorage.setItem("password", newPassword);


    setName(newLogin);
    setPassword(newPassword);

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
      {name !== "" ? <center><button type='button' onClick={() => {logout()}}>Wyloguj</button></center> : null}
      {name !== "" ? <HallOfFame /> : null}
      {name === "" ? <Login singin={setCredentials}/> : null}
    </div>
  )
}
