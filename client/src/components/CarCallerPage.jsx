import React from 'react'

const CarCallerPage= ()=> {
  const phoneNumber = '+91-9427571817'
  const call = ()=>{
    const telUrl = `tel:${phoneNumber}`;
    window.open(telUrl);
  }
  return (
    <button onClick={call}>Call</button>
  )
}

export default CarCallerPage