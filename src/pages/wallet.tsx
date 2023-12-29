'use client'
import Navbar from "components/Navbar";
import { Inter } from "next/font/google";
import Footer from "components/Footer";
import { withSwal } from 'react-sweetalert2';

const font = Inter({
    subsets: ["latin"],
})

export default withSwal(({ swal }: any) => {
    return (
        <main className={"flex flex-col bg-slate-950 min-h-screen w-screen " + font.className}>
            <Navbar />
            <div className="flex flex-row grow justify-evenly items-center">
                
            </div>
            <Footer />
        </main>
    );
})