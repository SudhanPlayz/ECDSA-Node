'use client'
import useWallet from "hooks/wallet";
import Link from "next/link";

export default function Navbar() {
    const { address } = useWallet()

    return (
        <div className="flex flex-row justify-between items-center bg-slate-900 h-16 w-screen px-5">
            <Link href="/" className="text-2xl text-white font-bold">ECDSA Node</Link>
            <div className="flex flex-row justify-between items-center">
                <Link href="/tx" className="text-gray-400 text-xl m-5 hover:text-blue-500 hover:underline">Transactions</Link>
                <Link href="/faucet" className="text-gray-400 text-xl m-5 hover:text-blue-500 hover:underline">Faucet</Link>
                {address && <Link href="/wallet" className="text-gray-400 text-xl m-5 hover:text-blue-500 hover:underline">Wallet</Link>}
            </div>
            {address ?
                <div className="text-white font-bold text-md">{address}</div>
                :
                <Link href="/login" className="text-white font-bold text-2xl">Login</Link>
            }
        </div>
    )
}