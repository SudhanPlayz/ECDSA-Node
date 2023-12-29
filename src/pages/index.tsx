'use client'
import Navbar from "components/Navbar";
import { Inter } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/router";
import Footer from "components/Footer";

const font = Inter({
  subsets: ["latin"],
})

export default function Home() {
  const router = useRouter()
  const [input, setInput] = useState<string>("")
  const [type, setType] = useState<string>("Address")

  const search = () => {
    if (input === "") return alert("Please enter an input")

    if (type === "Address") {
      router.push(`/address/${input}`)
    } else {
      router.push(`/transaction/${input}`)
    }
  }

  return (
    <main className={"flex flex-col bg-slate-950 min-h-screen w-screen " + font.className}>
      <Navbar />
      <div className="flex flex-col grow justify-evenly items-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-white text-4xl m-3">ECDSA Node</h1>
          <p className="text-white w-3/4 text-center">
            In this project, a singular server efficiently manages transfers between different addresses, ensuring a streamlined process without the complexities of distributed consensus. While embracing a centralized approach for optimal functionality, I've integrated Elliptic Curve Digital Signatures, a robust form of Public Key Cryptography.
            <br />
            <br />
            By employing these digital signatures, our server now only processes transfers that have been securely signed by the rightful owner of the associated address. This ensures unparalleled security and authenticity, putting you in control of your transactions like never before.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-white text-2xl m-3">Search for a transaction or address</h1>
          <div className="flex flex-row justify-center items-center">
            <input className="bg-slate-900 text-white rounded-md p-2 py-3 m-2 outline-none" placeholder="Enter input" onChange={(e) => setInput(e.target.value)} />
            <select className="bg-slate-900 text-white rounded-md p-2 py-3 m-2 outline-none" onChange={(e) => setType(e.target.value)}>
              <option>Address</option>
              <option>Transaction</option>
            </select>
            <button className="bg-blue-500 text-white rounded-md px-5 py-2 m-2 hover:bg-blue-700 text-lg" onClick={search}>Search</button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
