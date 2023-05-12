import React, { useEffect, useLayoutEffect, useState } from 'react'
import User from '../data/user';


async function postData(url: string, data: User) {
  await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
}

interface YourPointsProps
{
  name: string;
  password: string;
}

export default function YourPoints(props: YourPointsProps) {

  const [pushups, setPushups] = useState(0);
  const [pullups, setPullups] = useState(0);
  const [squats, setSquats] = useState(0);
  const [situps, setSitups] = useState(0);
  const [run, setRun] = useState(0);

  const [saves, setSaves] = useState(0);

  useEffect(() => {

    fetch("https://backend.sport.mrmero.com/load/" + props.name + "/" + props.password).then(response => response.json())
      .then(data => {
        setPushups(data.pushups);
        setPullups(data.pullups);
        setSquats(data.squats);
        setSitups(data.situps);
        setRun(data.run);


      });

  }, []);

  useLayoutEffect(() => {
    if(pushups < 0) setPushups(0);
    if(pullups < 0) setPullups(0);
    if(squats < 0) setSquats(0);
    if(situps < 0) setSitups(0);
    if(run < 0) setRun(0);
  }, [pushups, pullups, squats, situps, run]);

  const [needSave, setNeedSave] = useState(false);

  function saveOnServer(){
    setNeedSave(true);
  }

  useEffect(() => {
    const interval = setInterval(() => {

      if(needSave === true)
      {

        const updateEntity = new User();
        updateEntity.name = props.name;
        updateEntity.password = props.password;
        updateEntity.pushups = pushups;
        updateEntity.pullups = pullups;
        updateEntity.squats = squats;
        updateEntity.situps = situps;
        updateEntity.run = run;
  
        postData("https://backend.sport.mrmero.com/update", updateEntity);
        setNeedSave(false);
      }
      else
      {
        fetch("https://backend.sport.mrmero.com/load/" + props.name + "/" + props.password).then(response => response.json())
          .then(data => {
            setPushups(data.pushups);
            setPullups(data.pullups);
            setSquats(data.squats);
            setSitups(data.situps);
            setRun(data.run);


      });
      }


    }, 5000);
    return () => clearInterval(interval);
  }, );

  
  return (
    <div className='window-small'>
        <div><span>Pompki:</span><span><span>{pushups}</span> <button type="button" onClick={() => {setPushups(prev => prev - 1);saveOnServer();}}>-</button> <button type="button" onClick={() => {setPushups(prev => prev + 1);saveOnServer();}}>+</button></span></div>
        <div><span>Podciągnięcia:</span><span><span>{pullups}</span> <button type="button" onClick={() => {setPullups(prev => prev - 1);saveOnServer();}}>-</button> <button type="button" onClick={() => {setPullups(prev => prev + 1);saveOnServer();}}>+</button></span></div>
        <div><span>Przysiady:</span><span><span>{squats}</span> <button type="button" onClick={() => {setSquats(prev => prev - 1);saveOnServer();}}>-</button> <button type="button" onClick={() => {setSquats(prev => prev + 1);saveOnServer();}}>+</button></span></div>
        <div><span>Brzuszki:</span><span><span>{situps}</span> <button type="button" onClick={() => {setSitups(prev => prev - 1);saveOnServer();}}>-</button> <button type="button" onClick={() => {setSitups(prev => prev + 1);saveOnServer();}}>+</button></span></div>
        <div><span>Bieg 100m:</span><span><span>{run}</span> <button type="button" onClick={() => {setRun(prev => prev - 1);saveOnServer();}}>-</button> <button type="button" onClick={() => {setRun(prev => prev + 1);saveOnServer();}}>+</button></span></div>
        <hr/>
        <div><span>Punkty:</span><span>{pushups * 10 + pullups * 25 + squats * 3 + situps * 3 + run * 20}</span></div>
        {needSave === true ? (<div className='text-red'><p className='text'>Zapisywanie zmian.</p></div>) : (<div className='text text-green'><p className='text'>Zmiany zapisane.</p></div>)}
    </div>
  )
}
