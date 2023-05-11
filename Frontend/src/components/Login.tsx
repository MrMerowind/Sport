import React, { useRef, useState } from 'react'

interface LoginProps{
    singin: (login: string, password: string) => void;
}

export default function Login(props: LoginProps) {

    const [loginInput, setLoginInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const handleLogin = (e: any) => {
        setLoginInput(e.target.value);
      };

      const handlePassword = (e: any) => {
        setPasswordInput(e.target.value);
      };

  return (
    <div>
        <input type='text' value={loginInput} onChange={handleLogin}></input><br/>
        <input type='password' value={passwordInput} onChange={handlePassword}></input><br/>
        <button type='button' onClick={() => {props.singin(loginInput, passwordInput)}}>Zaloguj/Zarejestruj</button>
    </div>
  )
}
