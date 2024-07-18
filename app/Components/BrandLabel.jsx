"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function BrandLabel() {
  const [data, setData] = useState([]);


  const logo = {
    BMW : "https://cdn.worldvectorlogo.com/logos/bmw-logo.svg",
    MercedesBenz : "https://cdn.worldvectorlogo.com/logos/mercedes-benz-9.svg",
    Porsche : "https://cdn.worldvectorlogo.com/logos/porsche-3.svg"
  }

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

  const brandList = [...new Set(data.map(({ brand }) => brand))];

  brandList[0] = "BMW"
  brandList[1] = "MercedesBenz"
  brandList[2] = "Porsche"

  return (
    <div className="flex justify-center my-5">
      {brandList.slice(0, 3).map((index) => (
        <div key={index} className="max-w-max bg-inherit p-4">
          <Link href={`/${index.toLowerCase()}`}>
            <div className=" p-3 shadow bg-white rounded hover:scale-95 hover:shadow-lg hover:shadow-teal-300 transition">
              <div className="mx-4 flex flex-col items-center ">
                <img src={logo[index]} className="rounded-md w-56" />
                {index}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
