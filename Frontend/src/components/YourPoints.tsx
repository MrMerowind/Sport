import React, { useEffect, useLayoutEffect, useState } from 'react'

export default function YourPoints() {

  const [pushups, setPushups] = useState(0);
  const [pullups, setPullups] = useState(0);
  const [squats, setSquats] = useState(0);
  const [situps, setSitups] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const savedPushups = localStorage.getItem("pushups");
    const savedPullups = localStorage.getItem("pullups");
    const savedSquats = localStorage.getItem("squats");
    const savedSitups = localStorage.getItem("situps");
    const savedRun = localStorage.getItem("run");

    if(savedPushups) setPushups(Number.parseInt(savedPushups));
    if(savedPullups) setPullups(Number.parseInt(savedPullups));
    if(savedSquats) setSquats(Number.parseInt(savedSquats));
    if(savedSitups) setSitups(Number.parseInt(savedSitups));
    if(savedRun) setRun(Number.parseInt(savedRun));

  }, []);

  useEffect(() => {
    localStorage.setItem("pushups", pushups.toString());
    localStorage.setItem("pullups", pullups.toString());
    localStorage.setItem("squats", squats.toString());
    localStorage.setItem("situps", situps.toString());
    localStorage.setItem("run", run.toString()); 
  }, [pushups, pullups, squats, situps, run]);

  useLayoutEffect(() => {
    if(pushups < 0) setPushups(0);
    if(pullups < 0) setPullups(0);
    if(squats < 0) setSquats(0);
    if(situps < 0) setSitups(0);
    if(run < 0) setRun(0);
  }, [pushups, pullups, squats, situps, run]);
  
  return (
    <div className='window-small'>
        <div><span>Pompki:</span><span><span>{pushups}</span> <button type="button" onClick={() => {setPushups(prev => prev - 1)}}>-</button> <button type="button" onClick={() => {setPushups(prev => prev + 1)}}>+</button></span></div>
        <div><span>Podciągnięcia:</span><span><span>{pullups}</span> <button type="button" onClick={() => {setPullups(prev => prev - 1)}}>-</button> <button type="button" onClick={() => {setPullups(prev => prev + 1)}}>+</button></span></div>
        <div><span>Przysiady:</span><span><span>{squats}</span> <button type="button" onClick={() => {setSquats(prev => prev - 1)}}>-</button> <button type="button" onClick={() => {setSquats(prev => prev + 1)}}>+</button></span></div>
        <div><span>Brzuszki:</span><span><span>{situps}</span> <button type="button" onClick={() => {setSitups(prev => prev - 1)}}>-</button> <button type="button" onClick={() => {setSitups(prev => prev + 1)}}>+</button></span></div>
        <div><span>Bieg 100m:</span><span><span>{run}</span> <button type="button" onClick={() => {setRun(prev => prev - 1)}}>-</button> <button type="button" onClick={() => {setRun(prev => prev + 1)}}>+</button></span></div>
        <hr/>
        <div><span>Punkty:</span><span>{pushups * 10 + pullups * 25 + squats * 3 + situps * 3 + run * 20}</span></div>
    </div>
  )
}
