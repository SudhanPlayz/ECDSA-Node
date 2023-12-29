'use client'
import Navbar from "components/Navbar";
import { Inter } from "next/font/google";
import Footer from "components/Footer";
import { withSwal } from 'react-sweetalert2';
import useWallet from "hooks/wallet";
import { useRouter } from "next/router";
import { useState } from "react";
import hashMessage from "@/utils/hashMessage";
import signMessage from "@/utils/signMessage";
import { toHex } from "ethereum-cryptography/utils";

const font = Inter({
    subsets: ["latin"],
})

export default withSwal(({ swal }: any) => {
    const { address, balance, privateKey, refresh } = useWallet();
    const router = useRouter();

    const [addressInput, setAddressInput] = useState<string>("");
    const [amountInput, setAmountInput] = useState<number>(0);

    const transfer = async () => {
        if (addressInput === "" || amountInput === 0 || !privateKey) {
            swal.fire({
                title: "Error",
                text: "Please fill out all fields",
                icon: "error",
                confirmButtonText: "Ok",
            });
            return;
        }

        let message = {
            from: address,
            to: addressInput,
            amount: amountInput,
        }

        let messageHash = hashMessage(message.toString())
        let signature = signMessage(toHex(messageHash), Buffer.from(privateKey).toString('hex'))

        let body = JSON.stringify({
            from: address,
            to: addressInput,
            amount: amountInput,
            signature: signature.toCompactHex()
        })

        console.log(body)

        const res = await fetch("/api/transfer", {
            method: "POST",
            body,
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        if (data.error) {
            swal.fire({
                title: "Error",
                text: data.error,
                icon: "error",
                confirmButtonText: "ok",
            });
            return;
        }

        swal.fire({
            title: "Success",
            text: "Transfer successful",
            icon: "success",
            confirmButtonText: "View transaction",
        }).then((result: any) => {
            if (result.isConfirmed) {
                router.push(`/tx/${data.tx.id}`);
            }
        });

        refresh()
    }

    return (
        <main className={"flex flex-col bg-slate-950 min-h-screen w-screen " + font.className}>
            <Navbar />
            <div className="flex md:flex-row grow justify-evenly items-center flex-col">
                {address && (
                    <>
                        <div className="flex flex-col bg-slate-800 rounded-lg p-5 m-w-5/12">
                            <div className="text-white text-2xl text-center m-2">Wallet</div>
                            <p className="text-white text-xl">Address: <span className="text-slate-300">{address}</span></p>
                            <p className="text-white text-xl">Balance: <span className="text-slate-300">{balance}</span></p>
                        </div>
                        <div className="flex flex-col bg-slate-800 rounded-lg p-5 m-w-5/12">
                            <div className="text-white text-2xl text-center m-2">Transfer</div>
                            <input type="text" placeholder="Address" className="text-black text-xl p-2 rounded-lg m-2 bg-slate-300" onChange={(e) => setAddressInput(e.target.value)} />
                            <input type="number" placeholder="Amount" className="text-black text-xl p-2 rounded-lg m-2 bg-slate-300" onChange={(e) => setAmountInput(parseInt(e.target.value))} />
                            <button className="text-black text-xl p-2 rounded-lg m-2 bg-slate-300" onClick={transfer}>Transfer</button>
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </main>
    );
})