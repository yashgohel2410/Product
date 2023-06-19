import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const AdminPage = ()=> {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const logout = () =>{
    navigate('/login')
  }
  useEffect(() => {
    fetch('/api/car/getCarDetails')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  console.log({data});
  return (
    <div>
      <h1>Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>carNumber</th>
            <th>link</th>
            <th>qrCodeImage</th>
            {/* Add additional table headers for your schema fields */}
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((item) => (
            <tr key={item._id}>
              <td>{item.carNumber}</td>
              <td>{item.link}</td>
              <td><img src={item.qrCodeImage} alt="QR Code" /></td>
              {/* Add additional table cells for your schema fields */}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default AdminPage