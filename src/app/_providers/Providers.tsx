"use client";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

const Providers = ({
  children,
}: {
  children: Readonly<React.ReactElement>;
}) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default Providers;
