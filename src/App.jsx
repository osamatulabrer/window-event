import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";



const App = () => {
  const [photo,setphoto] = useState([])
  useEffect(()=>{
      async function getData() {

      const res = await axios.get('http://localhost:3000/photos/?_page=1&_per_page=20');
      const data = res.data.data;
      setphoto(data);
      
    }
    getData()
  },[ ])
 
  
  return (
    <div>
     
      <ul>
        {photo.map(item =>{

       return <li key={item.id}>
          <h2>{item.title}</h2>
          <img className="w-56" src={item.thumbnailUrl} alt="dsf" />
        </li>
        })}
      </ul>
      <div className="text-center">
        <button className="my-2 py-2 px-4 bg-green-600 rounded-sm text-white font-semibold text-uppercase">load more</button>
      </div>
    </div>
  );
};

export default App;