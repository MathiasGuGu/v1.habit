import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex h-16 w-screen items-center justify-center px-24">
      <div className="flex w-full max-w-[80vw] items-center justify-between">
        <Link href={"/"} className="flex items-center gap-2 text-sm">
          <span className="flex h-10 w-10 rounded-full bg-green-300"></span>
          <p>Habitfarm</p>
          <p>beta</p>
        </Link>
        <ul className="flex items-center gap-8 text-sm">
          <Link href={"/habits"}>Habits</Link>
          <Link href={"/farm"}>Farm</Link>
          <Link href={"/about"}>about</Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
