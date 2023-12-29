import Link from "next/link";

export default function Navbar() {
    return (
        <div className="flex flex-row justify-between items-center bg-slate-900 h-16 w-screen px-5">
            <Link href="/" className="text-2xl text-white font-bold">ECDSA Node</Link>
            <div className="flex flex-row justify-between items-center">
                <Link href="/transactions" className="text-gray-400 text-xl m-5 hover:text-blue-500 hover:underline">Transactions</Link>
                <Link href="/faucet" className="text-gray-400 text-xl m-5 hover:text-blue-500 hover:underline">Faucet</Link>
            </div>
            <Link href="/login" className="text-white font-bold text-2xl">Login</Link>
        </div>
    )
}