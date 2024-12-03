/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import UseOptimisticForm from "./form";
import { getConfessions } from "@/lib/appwrite";

async function Page() {
  const allConfessions = getConfessions();

  // @ts-ignore
  return <UseOptimisticForm confessionPromise={allConfessions} />;
}

export default Page;
