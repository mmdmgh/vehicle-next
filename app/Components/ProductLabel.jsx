"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";

export default function ProductLabel() {
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

  if ((data.length > 0)) {
    return (
      <div className="grid md:grid-cols-5 grid-cols-2 justify-center my-5">
        {data.slice(0, 5).map((item, index) =>
          item.registered ? (
            <div key={index} className="max-w-max bg-inherit p-4">
              <Link href={`/${item.brand}/${item._id}`}>
                <div className=" max-h-min p-3 shadow-xl bg-white rounded hover:scale-95 hover:shadow-lg hover:shadow-blue-300 transition border border-dashed border-black">
                  {item.image && (
                    <div className="mx-4 flex items-center">
                      <img
                        className="rounded-md"
                        src={item.image[0]}
                        width={200}
                        height={200}
                      />
                    </div>
                  )}
                  <div>
                    <div className="flex justify-between mb-2">
                      <p>{item.brand}</p>
                      <p>{item.model}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>{item.year}</p>
                      <p>{item.price}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ) : null
        )}
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center gap-20 my-10">
        <Skeleton variant="rounded" animation="wave" width={210} height={150} />
        <Skeleton variant="rounded" animation="wave" width={210} height={150} />
        <Skeleton variant="rounded" animation="wave" width={210} height={150} />
        <Skeleton variant="rounded" animation="wave" width={210} height={150} />
        <Skeleton variant="rounded" animation="wave" width={210} height={150} />
      </div>
    );
  }
}
