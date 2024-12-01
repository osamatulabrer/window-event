import axios from "axios";

import { useRef, useState } from "react";
import { useEffect } from "react";



const App = () => {
  const [data,setData] = useState([])
  const [photo,setphoto] = useState(null)
  const [pageNum,setPageNum] = useState(1)
  const btnRef = useRef(null)
  
  useEffect(()=>{
      async function getData() {

      const res = await axios.get(`http://localhost:3000/photos/?_page=${pageNum}&_per_page=10`);
      const data = await res.data;
      setphoto(data);
      setData(prev =>{
        return [...prev,...data.data]
      })
      
    }
    getData()
    let observer = new IntersectionObserver((item)=>{
      item.forEach(item => {
        if(item.isIntersecting){
          setPageNum((prev) => prev + 1);
        }
      },
    {
      threshold: 1.0
    })
      
     
      
   
      
    });
    observer.observe(btnRef.current)
    return () => {
      observer.disconnect();
  };
  },[ pageNum])
 
console.log(data);

  
  return (
    <div>
     
      <ul>
        {data.length !== 0 && 
        data.map(item =>{

       return <li key={item.id}>
          <h2>{item.title}</h2>
          <img className="w-56" src={item.thumbnailUrl} alt="dsf" />
        </li>
        })}
      </ul>
      <div className="text-center">
        <button ref={btnRef}  className="my-2 py-2 px-4 bg-green-600 rounded-sm text-white font-semibold text-uppercase">load more</button>
      </div>
    </div>
  );
};

export default App;