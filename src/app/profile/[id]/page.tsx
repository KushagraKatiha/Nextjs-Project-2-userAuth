'use client'
import * as React from "react";

export default function page({ params }:any) {    
  const {id}:any = React.use(params)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile page</h1>
      <h1 className="p-3 bg-green-500 rounded-lg text-black">{id}</h1>
    </div>
  );
}

