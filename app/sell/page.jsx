"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { UploadButton } from "@uploadthing/react";
import Skeleton from "@mui/material/Skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const label =
  "bg-cyan-100 rounded-r-xl shadow-md text-lg p-2 mr-2 flex justify-end w-32 border border-dashed border-black border-l-transparent";

const Sell = () => {
  const { data: session, status } = useSession();
  const [imageList, setImageList] = useState([]);
  const [info, setInfo] = useState({
    type: "",
    brand: "",
    model: "",
    work: "",
    year: "",
    price: "",
    image: [],
  });
  const [err, setErr] = useState("");
  const [pending, setpending] = useState();
  const router = useRouter();
  const [loadingStates, setLoadingStates] = useState(
    new Array(imageList.length).fill(true)
  );

  useEffect(() => {
    const loadImages = imageList.map((image, index) => {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        setLoadingStates((prevStates) => {
          const newStates = [...prevStates];
          newStates[index] = false;
          return newStates;
        });
      };
    });
  }, [imageList]);

  function handleInput(e) {
    const lowercasedValue = e.target.value.toLowerCase();
    setInfo((prev) => ({ ...prev, [e.target.id]: lowercasedValue }));
  }
  const handleClientUploadComplete = (res) => {
    setImageList((prevImageList) => [...prevImageList, res[0].url]);
    setLoadingStates((prevLoadingStates) => [...prevLoadingStates, true]);
    alert("Upload Completed");
  };
  const removeImage = (index) => {
    setImageList((prevImageList) =>
      prevImageList.filter((_, i) => i !== index)
    );
  };
  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      setInfo((prevInfo) => ({
        ...prevInfo,
        email: session.user.email,
      }));
    }
  }, [session, status]);

  useEffect(() => {
    if (imageList.length > 0) {
      setInfo((prevInfo) => ({ ...prevInfo, image: imageList }));
      console.log("Updated image list");
    }
  }, [imageList]);

  async function handleSubmit(e) {
    console.log(info);
    e.preventDefault();
    if (
      !info.type ||
      !info.brand ||
      !info.model ||
      !info.work ||
      !info.year ||
      !info.price
    ) {
      setErr("Must provide all the credentials.");
      return;
    }

    try {
      setpending(true);
      const res = await fetch("/api/sell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
      if (res.ok) {
        setpending(false);
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        const data = await res.json();
        setErr(data.message);
        setpending(false);
      }
    } catch (error) {
      setpending(false);
      setErr("something went wrong");
    }
  }
  if (!session) {
    return (
      <div className="flex items-center justify-center w-screen">
        <div className="max-w-md px-8 py-12 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold mb-4 text-center">
            You need to be logged in to access the advertising page
          </h1>
          <div className="text-lg mb-6 text-center">
            Please{" "}
            <Link href="/login">
              <div className="text-blue-600 underline">log in</div>
            </Link>{" "}
            to continue.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2">
      <div>
        <div className="bg-cyan-100 rounded-r-xl shadow-md text-lg p-2 mr-2 flex justify-center md:justify-end w-full border border-dashed border-black border-l-transparent">
          <h1 className="text-4xl font-medium p-5 ">Add Your Vehicle Here</h1>
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="mt-10 flex md:flex-row flex-col absolute "
          >
            <div>
              {" "}
              <div className="flex mb-5">
                <label className={label} htmlFor="vehicle">
                  Vehicle Type
                </label>
                <div className="appearance-none shadow bg-cyan-100 p-2 outline-none text-zinc-800 rounded-xl min-w-20 flex justify-between items-center">
                  <select
                    id="type"
                    name="vehicle"
                    className="bg-transparent outline-none"
                    onChange={(e) => handleInput(e)}
                  >
                    <option value="">e.g., SUV, Sport Utility Vehicle</option>
                    <option value="car">Car</option>
                    <option value="motor">Motor</option>
                    <option value="truck">Truck</option>
                  </select>
                </div>
              </div>
              <div className="flex mb-5">
                <label className={label} htmlFor="brand">
                  Brand
                </label>
                <input
                  id="brand"
                  type="text"
                  className="appearance-none shadow bg-cyan-100 p-2 outline-none text-zinc-800 rounded-xl min-w-20 flex justify-between items-center placeholder-zinc-500"
                  placeholder="e.g., Toyota, Ford"
                  onChange={(e) => handleInput(e)}
                />
              </div>
              <div className="flex mb-5">
                <label className={label} htmlFor="model">
                  Model
                </label>
                <input
                  id="model"
                  type="text"
                  className="appearance-none shadow bg-cyan-100 p-2 outline-none text-zinc-800 rounded-xl min-w-20 flex justify-between items-center placeholder-zinc-500"
                  placeholder="e.g., Rav4, Raptor"
                  onChange={(e) => handleInput(e)}
                />
              </div>
              <div className="flex mb-5">
                <label className={label} htmlFor="year">
                  Year
                </label>
                <input
                  id="year"
                  type="text"
                  className="appearance-none shadow bg-cyan-100 p-2 outline-none text-zinc-800 rounded-xl min-w-20 flex justify-between items-center placeholder-zinc-500"
                  placeholder="e.g., 2000, 2024"
                  onChange={(e) => handleInput(e)}
                />
              </div>
              <div className="flex mb-5">
                <label className={label} htmlFor="work">
                  Work
                </label>
                <input
                  id="work"
                  type="text"
                  className="appearance-none shadow bg-cyan-100 p-2 outline-none text-zinc-800 rounded-xl min-w-20 flex justify-between items-center placeholder-zinc-500"
                  placeholder="e.g., 100k, 3500"
                  onChange={(e) => handleInput(e)}
                />
              </div>
              <div className="flex mb-5">
                <label className={label} htmlFor="price">
                  Price
                </label>
                <input
                  id="price"
                  type="text"
                  className="appearance-none shadow bg-cyan-100 p-2 outline-none text-zinc-800 rounded-xl min-w-20 flex justify-between items-center placeholder-zinc-500"
                  placeholder="e.g., 300m, 1.5b"
                  onChange={(e) => handleInput(e)}
                />
              </div>
            </div>
            <div className="ml-20 my-5">
              <UploadButton
                appearance={{
                  button: {
                    backgroundColor: "#92c5fc",
                    color: "#000000",
                  },
                }}
                endpoint="imageUploader"
                onClientUploadComplete={handleClientUploadComplete}
                onUploadError={(error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />
              <div>
                <ul className="flex flex-wrap w-56 ">
                  {imageList.map((image, index) => (
                    <li key={index} className="mx-4 flex flex-col items-center">
                      {loadingStates[index] ? (
                        <Skeleton
                          variant="rounded"
                          animation="wave"
                          width={100}
                          height={50}
                        />
                      ) : (
                        <div className="flex border gap-3 rounded-md bg-blue-300">
                          <button
                            onClick={() => removeImage(index)}
                            className=" rounded-full pl-3 hover:scale-110 transition"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                          <img
                            className="rounded-md"
                            src={image}
                            width={400}
                            alt={`Image ${index}`}
                          />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              type="submit"
              className="w-40 bg-blue-300 rounded-r-3xl shadow-md p-5 text-xl font-medium md:absolute -bottom-20"
            >
              {" "}
              {pending ? "Submiting..." : "Submit"}{" "}
            </button>
          </form>
          {err && <span>{err}</span>}
        </div>
      </div>
      <div className="hidden md:block mx-auto animate-bounce-slow">
        <img
          src={
            "https://utfs.io/f/72bdfa81-6679-4970-b363-e23657fee7d7-9kjt05.svg"
          }
          width={500}
          alt=""
        />
      </div>
    </div>
  );
};

export default Sell;
