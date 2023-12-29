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

export type AddressData = Address & {
    transactions: Transaction[]
}

const font = Inter({
    subsets: ["latin"],
})

export default function Address() {
    const router = useRouter()
    const { addr } = router.query
    const theme = useTheme(getTheme());
    const [data, setData] = useState<AddressData | null>(null)

    useEffect(() => {
        if (addr) {
            fetch(`/api/wallet?address=${addr}`)
                .then(res => res.json())
                .then(setData)
        }
    }, [addr])

    return (
        <main className={"flex flex-col bg-slate-950 min-h-screen w-screen " + font.className}>
            <Navbar />
            <div className="flex flex-col grow justify-evenly items-center">
                {
                    data ? (
                        <div className="flex flex-col w-screen h-auto items-center justify-center">
                            <div className="flex flex-row w-full h-auto justify-center">
                                <div className="flex flex-col w-2/5 h-auto bg-slate-800 rounded-lg p-2 m-2">
                                    <p className="text-white text-xl">Address</p>
                                    <p className="text-white text-2xl">{data.address}</p>
                                </div>
                                <div className="flex flex-col w-2/5 h-auto bg-slate-800 rounded-lg p-2 m-2">
                                    <p className="text-white text-xl">Balance</p>
                                    <p className="text-white text-2xl">{data.balance}</p>
                                </div>
                            </div>
                            <div className="flex flex-col w-11/12 h-auto justify-center p-2 m-2">
                                <div className="flex flex-col w-full h-auto bg-slate-800 rounded-lg p-2 m-2">
                                    <p className="text-white text-xl">Transactions</p>
                                    <CompactTable
                                        theme={theme}
                                        columns={[
                                            {
                                                label: 'ID',
                                                resize: true,
                                                renderCell: (node: Transaction) => (
                                                    <Link href={`/transaction/${node.id}`} className="text-blue-500 hover:text-blue-700 hover:underline">
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
                                        data={{ nodes: data.transactions }}
                                    />
                                </div>
                            </div>
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
