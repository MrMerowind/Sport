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
    <div className='window-small'>{usersData.length > 0 ? (usersData.map(user => {
        
        return <div><span>{user.name}:</span><span><span>{user.pushups * 10 + user.pullups * 25 + user.squats * 3 + user.situps * 3 + user.run * 20}</span></span></div>

    })) : null}</div>
  )
}
