import React, { useEffect, useState } from 'react';
import {useNavigate, useLocation } from "react-router-dom";

const UserPage = ()=> {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [data, setData] = useState([]);
  const userName = location.state;
  console.log(userName);
  
  const logout = () =>{
    navigate('/login')
  }
  
  useEffect(() => {
    fetch(`/api/car/getCarDetails?userName=${userName}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [userName]);

  return (
    <div>{data}</div>
  )
}

export default UserPage