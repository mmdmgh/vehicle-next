"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaravan,
  faUser,
  faPlus,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import LogoutButton from "./LogoutButton";
import useWindowSize from "../hooks/useWindowSize";

const Navbar = () => {
  const [hoveredMyAccount, setHoveredMyAccount] = useState();
  const { data: session } = useSession();
  const [menu, setMenu] = useState(false);
  const { width } = useWindowSize();
  const isLargeScreen = width >= 768;

  return (
    <div className="flex flex-grow justify-between border-b items-center">
      <div
        onClick={() => setMenu((prev) => !prev)}
        className="md:hidden ml-5 cursor-pointer "
      >
        <FontAwesomeIcon icon={faBars} />
      </div>
      {menu && !isLargeScreen && (
        <div
          className="flex flex-col gap-5 w-44 bg-white rounded-r-lg shadow-lg fixed top-0 left-0 h-full z-10  bg-opacity-60 backdrop-blur-sm"
          onClick={() => setMenu((prev) => !prev)}
        >
          <div className="md:hidden ml-5 cursor-pointer py-6 px-2">
            <FontAwesomeIcon icon={faBars} />
          </div>
          <Link href="/car" className="p-5 hover:bg-teal-300 transition rounded shadow-lg" >
            Cars
          </Link>
          <Link href="/motor" className="p-5 hover:bg-teal-300 transition rounded shadow-lg">
            Motors
          </Link>
          <Link href="/truck" className="p-5 hover:bg-teal-300 transition rounded shadow-lg">
            Trucks
          </Link>
          <div className="p-5 hover:bg-teal-300 transition rounded shadow-lg">
            Contact us
          </div>
        </div>
      )}
      <div className="md:flex  gap-10 ml-5  hidden ">
        <Link href="/car" className="hover:bg-teal-300 transition rounded p-2  ">Cars</Link>

        <Link href="/motor" className="hover:bg-teal-300 p-2 rounded transition">Motors</Link>

        <Link href="/truck" className="hover:bg-teal-300 p-2 rounded transition">Trucks</Link>

        <div className="hover:bg-teal-300 p-2 rounded transition">Contact us</div>
      </div>
      <Link href="/">
        <FontAwesomeIcon icon={faCaravan} className="w-14 h-14 mx-auto p-2" />
      </Link>

      <div className="flex items-center gap-10 py-5">
        <div onMouseLeave={() => setHoveredMyAccount(false)}>
          <div>
            <div onMouseEnter={() => setHoveredMyAccount(true)} className="hover:bg-teal-300 transition rounded p-2">
              <FontAwesomeIcon
                icon={faUser}
                className="pr-2 w-5 h-5 text-slate-800 "
              />
              <span className="md:inline-block hidden" >My account</span>
            </div>
          </div>
          <div
            className={
              hoveredMyAccount
                ? "block bg-neutral-200 border-black border-2 w-44 rounded-lg "
                : "hidden"
            }
            style={{ position: "absolute", zIndex: "1" }}
          >
            {session ? (
              <>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link href="/signup" className="">
                  <p className="p-3 hover:bg-teal-400 transition rounded-t-lg">Sign Up</p>
                </Link>
                <hr />
                <Link href="/login">
                  <p className="p-3 hover:bg-teal-400 transition rounded-b-lg">Log in</p>
                </Link>
              </>
            )}
          </div>
        </div>
        <Link href="/sell">
          <div className="mr-2 flex items-center gap-2  hover:bg-teal-300 transition rounded p-2">
            <FontAwesomeIcon
              icon={faPlus}
              className="border border-zinc-950 rounded-full p-2 text-slate-800 transition "
            />
            <span className="md:block hidden" >New Advertising</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
