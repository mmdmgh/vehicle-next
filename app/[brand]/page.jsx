"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Skeleton from "@mui/material/Skeleton";

export default function Brand({ params }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getData");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      const filteredData = data.filter(
        (item) =>
          item.brand === Object.values(params)[0] && item.registered === true
      );

      if (filteredData.length === 0) {
        setNotFound(true);
      }
    }
  }, [data, loading, params]);

  if (loading) {
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

  const filteredData = data.filter(
    (item) =>
      item.brand === Object.values(params)[0] && item.registered === true
  );

  return (
    <div>
      {notFound ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">Not Found</h1>
          <p className="mb-4">The requested data was not found.</p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {filteredData.map((item, index) => (
            <Link key={item._id} href={`/${item.brand}/${item._id}`}>
              <div className="flex bg-white bg-opacity-50 rounded p-3 shadow hover:scale-105 transition-transform">
                {item.image && item.image[0] && (
                  <div className="flex justify-center">
                    <img
                      className="rounded-md"
                      src={item.image[0]}
                      width={200}
                      height={200}
                      alt={`Product Image ${index + 1}`}
                    />
                  </div>
                )}
                <div className="text-center w-1/2 p-2">
                  <div className="flex justify-between flex-">
                    <p className="font-bold">{item.brand}</p>
                    <p>{item.model}</p>
                  </div>
                  <div className="flex justify-between flex-">
                    <p>{item.year}</p>
                    <p className="text-lg font-semibold">{item.price}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
