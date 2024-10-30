"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "../styles/globals.css";

export default function Home() {
  const [state, setState] = useState({
    message: "",
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/hello/")
      .then((response) => response.json())
      .then((data) => setState({ ...state, message: data.message }));
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <h1 className="text-3xl font-bold text-center">
            Welcome to the Recipe Book
          </h1>
          {/* <h1>{state.message}</h1> */}
        </div>
        <Link
          className="rounded-full border border-solid border-black transition-colors flex items-center justify-center hover:bg-[#f2f2f2]  hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          href="http://localhost:3000/chocolate_candy"
          rel="noopener noreferrer"
        >
          Recipe Example
        </Link>
        <Link
          className="rounded-full border border-solid border-black transition-colors flex items-center justify-center hover:bg-[#f2f2f2]  hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          href="http://localhost:3000/conversion_tool"
          rel="noopener noreferrer"
        >
          Conversions Calculator
        </Link>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
