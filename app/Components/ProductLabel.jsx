"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

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

  if (data.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid md:grid-cols-5 grid-cols-2 justify-center my-5">
      {data.slice(0, 5).map((item, index) =>
        item.registered ? (
          <div key={index} className="max-w-max bg-inherit p-4">
            <Link href={`/${item.brand}/${item._id}`}>
              <div className=" p-3 shadow bg-white rounded hover:scale-95 hover:shadow-lg hover:shadow-teal-300 transition">
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
}
