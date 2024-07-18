"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { notFound } from "next/navigation";

export default function Brand({ params }) {
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

  const filteredData = data.filter(
    (item) =>
      item.brand === Object.values(params)[0] && item.registered === true
  );

  if (filteredData.length == 0) {
    notFound();
  }

  return (
    <div className="grid grid-cols-3">
      {filteredData.map((item, index) => (
        <Link href={`/${item.brand}/${item._id}`}>
          <div
            key={index}
            className="flex scale-95 bg-white bg-opacity-50 rounded p-3"
          >
            <div className="flex">
              {item.image && (
                <div className="mx-4 flex items-center">
                  <img
                    className="rounded-md"
                    src={item.image[0]}
                    width={200}
                    height={200}
                    alt={`Product Image ${index + 1}`}
                  />
                </div>
              )}
              <div>
                <p>{item.brand}</p>
                <p>{item.model}</p>
                <p>{item.year}</p>
                <p>{item.price}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
