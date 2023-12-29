import { Address, Transaction } from "@prisma/client";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import { Inter } from "next/font/google";
import Link from "next/link";
import { CompactTable } from '@table-library/react-table-library/compact';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';

const font = Inter({
    subsets: ["latin"],
})

export default function Address() {
    const router = useRouter()
    const { id } = router.query
    const theme = useTheme(getTheme());
    const [data, setData] = useState<Transaction | null>(null)

    useEffect(() => {
        if (id) {
            fetch(`/api/tx?tx=${id}`)
                .then(res => res.json())
                .then(setData)
        }
    }, [id])

    return (
        <main className={"flex flex-col bg-slate-950 min-h-screen w-screen " + font.className}>
            <Navbar />
            <div className="flex flex-col grow justify-evenly items-center">
                {
                    data ? (
                        <div className="flex flex-col w-screen h-auto items-center justify-center">
                            <div className="flex flex-col bg-slate-800 rounded-lg p-2 m-2 justify-center items-center w-2/3">
                                <div className="flex flex-row justify-between text-md w-full p-2">
                                    <p className="text-white text-lg">ID:</p>
                                    <p className="text-gray-400 text-lg">{data.id}</p>
                                </div>
                                <div className="flex flex-row justify-between text-md w-full p-2">
                                    <p className="text-white text-lg">Hash:</p>
                                    <p className="text-gray-400 text-lg break-all">{data.hash}</p>
                                </div>
                                <div className="flex flex-row justify-between text-md w-full p-2">
                                    <p className="text-white text-lg">From:</p>
                                    <Link href={`/address/${data.from}`} className="text-blue-500 hover:text-blue-700 hover:underline">
                                        <p className="text-gray-400 text-lg">{data.from}</p>
                                    </Link>
                                </div>
                                <div className="flex flex-row justify-between text-md w-full p-2">
                                    <p className="text-white text-lg">To:</p>
                                    <Link href={`/address/${data.to}`} className="text-blue-500 hover:text-blue-700 hover:underline">
                                        <p className="text-gray-400 text-lg">{data.to}</p>
                                    </Link>
                                </div>
                                <div className="flex flex-row justify-between text-md w-full p-2">
                                    <p className="text-white text-lg">Value:</p>
                                    <p className="text-gray-400 text-lg">{data.amount}</p>
                                </div>
                                <div className="flex flex-row justify-between text-md w-full p-2">
                                    <p className="text-white text-lg">Timestamp:</p>
                                    <p className="text-gray-400 text-lg">{new Date(data.timestamp).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-white text-4xl">Loading...</p>
                    )
                }
            </div>
            <Footer />
        </main>
    );
}
