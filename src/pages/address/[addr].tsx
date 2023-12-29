import Footer from "components/Footer";
import Navbar from "components/Navbar";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const font = Inter({
    subsets: ["latin"],
  })

export default function Address() {
    const router = useRouter()
    const { addr } = router.query

    return (
        <main className={"flex flex-col bg-slate-950 min-h-screen w-screen " + font.className}>
            <Navbar />
            <div className="flex flex-col grow justify-evenly items-center">
            </div>
            <Footer />
        </main>
    );
}
