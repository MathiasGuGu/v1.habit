import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex h-16 w-screen items-center justify-center px-24">
      <div className="flex w-full max-w-[80vw] items-center justify-between">
        <Link href={"/"} className="flex items-center gap-1">
          <p>HABITFARM</p>
          <div className="flex items-center justify-center px-2 bg-gradient-to-t from-zinc-50 to-zinc-100 border border-zinc-200 rounded-full">
          <p className="text-xs text-zinc-500">beta</p>
          </div>
        </Link>
        <ul className="flex items-center gap-4 text-sm">
          <SignedIn>
            <Link href={"/habits"}>Habits</Link>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button variant={"link"}>Sign in</Button>
            </SignInButton>
            <SignUpButton>
              <Button variant={"secondary"}>Sign up</Button>
            </SignUpButton>
          </SignedOut>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
