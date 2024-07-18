"use client";

import React, { useState, useEffect } from "react";
import ImageSlider from "../../Components/ImageSlider";

export default function Product({ params }) {
  const [data, setData] = useState([]);
  const containerStyles = {
    width: "500px",
    height: "280px",
    margin: "0",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getData");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (data.length === 0) {
    return <p>Loading...</p>;
  }

  const filteredData = data.filter(
    (item) => item._id === Object.values(params)[1]
  );
  return (
    <div className="flex justify-center items-center h-5/6">
      {filteredData.map((item, index) => (
        <div key={index} className="flex flex-col-reverse md:flex-row items-center">
          <div className="p-5">
            <h1 className="text-2xl font-bold mb-2">
              {item.brand.toUpperCase()} {item.model}
            </h1>
            <div className="text-lg bg-white rounded-full mb-2 flex">
              <pre className="inline p-2 rounded-l-full bg-cyan-300">Year   </pre>
              <div className="inline p-2 ml-auto">{item.year}</div>
            </div>
            <div className="text-lg bg-white rounded-full mb-2 flex">
              <pre className="inline p-2 rounded-l-full bg-cyan-300">Price  </pre>{" "}
              <div className="inline p-2 ml-auto">{item.price}</div>
            </div>
            <div className="text-lg bg-white rounded-full flex">
              <pre className="inline p-2 rounded-l-full bg-cyan-300">Mileage</pre>{" "}
              <div className="inline p-2 ml-auto">{item.work}</div>
            </div>
          </div>
          <div style={containerStyles}>
            <ImageSlider slides={item.image} />
          </div>
        </div>
      ))}
    </div>
  );
}
