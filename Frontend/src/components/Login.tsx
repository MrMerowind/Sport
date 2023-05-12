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
        <label>Login:</label><br/>
        <input type='text' className='input-login' value={loginInput} onChange={handleLogin}></input><br/>
        <label>Hasło:</label><br/>
        <input type='password' className='input-login' value={passwordInput} onChange={handlePassword}></input><br/><br/>
        <button className='text button-login' type='button' onClick={() => {props.singin(loginInput, passwordInput)}}>Zaloguj/Zarejestruj</button>
    </div>
  )
}
