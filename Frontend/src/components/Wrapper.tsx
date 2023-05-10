import React from 'react'
import Punctaction from "./Punctaction"
import YourPoints from './YourPoints'

export default function Wrapper() {
  return (
    <div className='window-wrapper'>
      <Punctaction /> 
      <YourPoints />
    </div>
  )
}
