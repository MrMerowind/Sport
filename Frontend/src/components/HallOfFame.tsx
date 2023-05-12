import React, { useEffect, useState } from 'react'
import User from '../data/user';


export default function HallOfFame() {

    const [usersData, setUsersData] = useState<User[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch("https://backend.sport.mrmero.com/hof").then(response => response.json())
            .then(data => {
            setUsersData(data);
            });
        }, 5000);
        return () => clearInterval(interval);
      }, );

  return (
    <div className='window-small'>
        <div><span>Użytkownik:</span><span><span>Punkty</span></span></div>
        {usersData.length > 0 ? (usersData.sort((a,b) => {return (b.pushups * 10 + b.pullups * 25 + b.squats * 3 + b.situps * 3 + b.run * 20) - (a.pushups * 10 + a.pullups * 25 + a.squats * 3 + a.situps * 3 + a.run * 20)}).map(user => {
        
        return <div><span>{user.name}:</span><span><span>{user.pushups * 10 + user.pullups * 25 + user.squats * 3 + user.situps * 3 + user.run * 20}</span></span></div>

    })) : null}</div>
  )
}
