import Link from "next/link";
import Image from "next/image";
import type React from "react";

interface ComponentProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ComponentProps) {
  return (
    <>
      <nav className="p-4 bg-gray-800 text-white">
        <Link className="flex items-center" href="/">
          <div className="overflow-hidden rounded-full w-fit">
            <Image
              src="/static/recipe_logo.jpg"
              alt="Recipe Book Icon"
              width={50}
              height={50}
            ></Image>
          </div>
          <h1 className="inline-block ml-2 text-2xl font-bold">Recipe Book</h1>
        </Link>
      </nav>
      <main>{children}</main>
    </>
  );
}
