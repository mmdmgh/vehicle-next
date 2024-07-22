"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";

export default function BrandLabel() {
  const [data, setData] = useState([]);

  const logo = {
    BMW: "https://cdn.worldvectorlogo.com/logos/bmw-logo.svg",
    MercedesBenz: "https://cdn.worldvectorlogo.com/logos/mercedes-benz-9.svg",
    Porsche: "https://cdn.worldvectorlogo.com/logos/porsche-3.svg",
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

  const brandList = [...new Set(data.map(({ brand }) => brand))];

  brandList[0] = "BMW";
  brandList[1] = "MercedesBenz";
  brandList[2] = "Porsche";

  if (data.length > 0) {
    return (
      <div className="flex justify-center mb-5 font-medium">
        {brandList.slice(0, 3).map((index) => (
          <div key={index} className="max-w-max bg-inherit p-4">
            <Link href={`/${index.toLowerCase()}`}>
              <div className=" p-3 shadow-xl  rounded hover:scale-95 hover:shadow-lg hover:shadow-blue-300 transition border border-dashed border-black">
                <div className="mx-4 flex flex-col items-center ">
                  <img src={logo[index]} className="rounded-md w-56" />
                  <p className="font-bold">{index}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center gap-10 mt-10">
        <Skeleton variant="rounded" animation="wave" width={210} height={200} />
        <Skeleton variant="rounded" animation="wave" width={210} height={200} />
        <Skeleton variant="rounded" animation="wave" width={210} height={200} />
      </div>
    );
  }
}
