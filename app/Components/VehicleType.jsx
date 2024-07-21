"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";

export default function VehicleType({ type }) {
  const [data, setData] = useState([]);

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

  const filteredData = data.filter(
    (item) => item.type === type && item.registered === true
  );

  if (data.length > 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3">
        {filteredData.map((item, index) => (
          <Link key={index} href={`/${item.brand}/${item._id}`}>
            <div className="md:flex scale-95 bg-white bg-opacity-50 rounded p-3">
              <div className="md:flex">
                {item.image && (
                  <div className="mx-4 flex items-center">
                    <img
                      className="rounded-md"
                      src={item.image[0]}
                      width={500}
                      height={500}
                      alt={`Product Image ${index + 1}`}
                    />
                  </div>
                )}
              </div>
              <div className="w-full">
                <div className="flex flex-col ">
                  <div className="flex justify-between items-center w-full ">
                    <p>{item.brand}</p>
                    <p>{item.model}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>{item.year}</p>
                    <p>{item.price}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center gap-20 my-10">
        <div className="flex gap-5">
          <Skeleton
            variant="rounded"
            animation="wave"
            width={210}
            height={150}
            
          />
          <div>
            <Skeleton
              variant="rounded"
              animation="wave"
              width={210}
              height={10}
              className="mb-5"
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              width={210}
              height={10}
            />
          </div>
        </div>
        <div className="flex gap-5">
          <Skeleton
            variant="rounded"
            animation="wave"
            width={210}
            height={150}
            
          />
          <div>
            <Skeleton
              variant="rounded"
              animation="wave"
              width={210}
              height={10}
              className="mb-5"
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              width={210}
              height={10}
            />
          </div>
        </div>
        <div className="flex gap-5">
          <Skeleton
            variant="rounded"
            animation="wave"
            width={210}
            height={150}
            
          />
          <div>
            <Skeleton
              variant="rounded"
              animation="wave"
              width={210}
              height={10}
              className="mb-5"
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              width={210}
              height={10}
            />
          </div>
        </div>
      </div>
    );
  }
}
