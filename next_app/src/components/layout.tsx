import Link from "next/link";
import Image from "next/image";

export default function Layout({ children }) {
  return (
    <>
      <nav className="p-4 bg-gray-800 text-white">
        <Link href="/">
          <Image
            src="/static/recipe_book.jpg"
            alt="Recipe Book Icon"
            width={150}
            height={150}
          ></Image>
        </Link>
      </nav>
      <main>{children}</main>
    </>
  );
}
