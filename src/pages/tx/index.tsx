import { Address, Transaction } from "@prisma/client";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import { Inter } from "next/font/google";
import Link from "next/link";
import { CompactTable } from '@table-library/react-table-library/compact';
import { useEffect, useState } from "react";
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';

const font = Inter({
    subsets: ["latin"],
})

export default function Address() {
    const theme = useTheme(getTheme());
    const [data, setData] = useState<Transaction[] | null>(null)

    useEffect(() => {
        fetch("/api/tx")
            .then(res => res.json())
            .then((data: Transaction[]) => setData(data))
    }, [])

    return (
        <main className={"flex flex-col bg-slate-950 min-h-screen w-screen " + font.className}>
            <Navbar />
            <div className="flex flex-col grow justify-evenly items-center">
                {
                    data ? (
                        <div className="flex flex-col w-screen h-auto items-center justify-center p-2 rounded-lg">
                            <h1 className="text-white text-4xl font-bold">Transactions</h1>
                            <p className="text-white text-2xl m-3">Past 10 transactions on the network</p>
                            <CompactTable
                                theme={theme}
                                columns={[
                                    {
                                        label: 'ID',
                                        resize: true,
                                        renderCell: (node: Transaction) => (
                                            <Link href={`/tx/${node.id}`} className="text-blue-500 hover:text-blue-700 hover:underline">
                                                {node.id}
                                            </Link>
                                        )
                                    },
                                    {
                                        label: 'Hash',
                                        resize: true,
                                        renderCell: (node: Transaction) => node.hash
                                    },
                                    {
                                        label: 'From',
                                        resize: true,
                                        renderCell: (node: Transaction) => (
                                            <Link href={`/address/${node.from}`} className="text-blue-500 hover:text-blue-700 hover:underline">
                                                {node.from}
                                            </Link>
                                        )
                                    },
                                    {
                                        label: 'To',
                                        resize: true,
                                        renderCell: (node: Transaction) => (
                                            <Link href={`/address/${node.to}`} className="text-blue-500 hover:text-blue-700 hover:underline">
                                                {node.to}
                                            </Link>
                                        )
                                    },
                                    {
                                        label: 'Value',
                                        resize: true,
                                        renderCell: (node: Transaction) => node.amount
                                    },
                                    {
                                        label: "Timestamp",
                                        resize: true,
                                        renderCell: (node: Transaction) => new Date(node.timestamp).toLocaleString()
                                    }
                                ]}
                                data={{ nodes: data }}
                            />
                        </div>
                    ) : (
                        <p className="text-white text-2xl">Loading...</p>
                    )
                }
            </div>
            <Footer />
        </main>
    );
}
