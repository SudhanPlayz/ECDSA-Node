'use client'
import Navbar from "components/Navbar";
import { Inter } from "next/font/google";
import { useState } from "react";
import Footer from "components/Footer";
import { withSwal } from "react-sweetalert2";

const font = Inter({
    subsets: ["latin"],
})

export default withSwal(({ swal }: any) => {
    const [input, setInput] = useState<string>("")

    return (
        <main className={"flex flex-col bg-slate-950 min-h-screen w-screen " + font.className}>
            <Navbar />
            <div className="flex flex-col grow justify-evenly items-center">
                <div className="flex flex-col">
                    <h1 className="text-white text-4xl m-3">Faucet</h1>
                    <p className="text-white w-3/4 text-center">
                        This faucet is used to send you money to a specified address. You can use this to test out the functionality of the ECDSA Node.
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-white text-2xl m-3">Enter your address</h1>
                    <div className="flex flex-row justify-center items-center">
                        <input className="bg-slate-900 text-white rounded-md p-2 py-3 m-2 outline-none" placeholder="Enter input" onChange={(e) => setInput(e.target.value)} />
                        <button className="bg-blue-500 text-white rounded-md px-5 py-2 m-2 hover:bg-blue-700 text-lg" onClick={() => {
                            if (input === "") return swal.fire({
                                title: "Error",
                                text: "You must enter an address.",
                                icon: "error",
                                confirmButtonText: "ok"
                            })

                            fetch(`/api/faucet?address=${input}`)
                                .then(res => res.json())
                                .then(data => {
                                    if (data.error) {
                                        swal.fire({
                                            title: "Error",
                                            text: data.error,
                                            icon: "error",
                                            confirmButtonText: "ok"
                                        })
                                    } else {
                                        swal.fire({
                                            title: "Success",
                                            text: "Your funds has been sent",
                                            icon: "success",
                                            confirmButtonText: "View Transaction",
                                            showCancelButton: true,
                                            preConfirm: () => {
                                                window.location.href = `/tx/${data.id}`
                                            }
                                        })
                                    }
                                })
                        }}>Send</button>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
})