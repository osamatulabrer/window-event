import axios from "axios";
import { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState([]); // Array for storing paginated results
  const [pageNum, setPageNum] = useState(1); // Tracks current page

  useEffect(() => {
    const getData = async () => {
      try {
        // Fetch paginated data
        const res = await axios.get(
          `http://localhost:3000/photos?_page=${pageNum}&_limit=10`
        );
        const resp = res.data;

        // Append new data to existing data
        setData((prev) => [...prev, ...resp]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [pageNum]);

  const handleClick = () => {
    setPageNum((prev) => prev + 1); // Increment page number for the next fetch
  };

  return (
    <div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <img
              className="w-56"
              src={item.thumbnailUrl}
              alt={item.title}
            />
          </li>
        ))}
      </ul>
      <div className="text-center">
        <button
          onClick={handleClick}
          className="my-2 py-2 px-4 bg-green-600 rounded-sm text-white font-semibold"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default App;
