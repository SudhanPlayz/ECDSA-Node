'use client'
import Navbar from "components/Navbar";
import { Inter } from "next/font/google";
import Footer from "components/Footer";
import { withSwal } from 'react-sweetalert2';
import { useRouter } from "next/router";

const font = Inter({
    subsets: ["latin"],
})

export default withSwal(({ swal }: any) => {
    const router = useRouter()

    const importPrivateKey = async () => {
        const { value: json } = await swal.fire({
            title: "Import Private Key",
            input: "file",
            inputPlaceholder: "Select your private key",
            showCancelButton: true,
            preConfirm: (value: any) => {
                return new Promise((resolve, reject) => {
                    if (value) {
                        let reader = new FileReader()
                        reader.readAsText(value)

                        reader.onload = () => {
                            try {
                                let json = JSON.parse(reader.result as string)
                                console.log(json)
                                if (!json.privateKey) return reject("Invalid private key")
                                resolve(json)
                            } catch (e) {
                                reject("Invalid private key")
                            }
                        }
                    } else {
                        resolve("You need to select a private key")
                    }
                })
            }
        })

        if (json) {
            swal.fire({
                title: "Private Key Imported",
                text: "Your private key has been imported. You can now login to your account.",
                icon: "success",
                
                showCancelButton: true,
                preConfirm: () => {
                    localStorage.setItem("privateKey", json.privateKey)
                    router.push("/wallet")
                }
            })
        }
    }

    const createAccount = async () => {
        const { value: json } = await swal.fire({
            title: "Create Wallet",
            text: "Are you sure you want to create a new wallet? If you already have one, I recommend importing it instead.",
            showCancelButton: true,
            confirmButtonText: "Create",
            showLoaderOnConfirm: false,
            preConfirm: async () => {
                return await fetch("/api/generate").then((res) => res.json())
            }
        })

        if (json) {
            swal.fire({
                title: "Wallet Created",
                text: "Your wallet has been created. Please save your private key somewhere safe. If you lose your private key, you will lose access to your account.",
                icon: "success",
                confirmButtonText: "Download Key",
                showCancelButton: true,
                preConfirm: () => {
                    var element = document.createElement('a');
                    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(json)));
                    element.setAttribute('download', "private-key.json");
                    element.style.display = 'none';
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                }
            })
        }
    }

    return (
        <main className={"flex flex-col bg-slate-950 min-h-screen w-screen " + font.className}>
            <Navbar />
            <div className="flex flex-row grow justify-evenly items-center">
                <div className="flex flex-col p-3 rounded-lg bg-slate-700 w-1/3 h-3/4 justify-center items-center cursor-pointer" onClick={importPrivateKey}>
                    <img src="/stickers/import.gif" className="w-3/6" />
                    <div className="text-white text-2xl text-center">Import Private Key</div>
                    <p className="text-gray-300 text-center">
                        You can import your private key to login to your account. Which will allow you to send transactions and view your balance.
                    </p>
                </div>

                <div className="flex flex-col p-3 rounded-lg bg-slate-700 w-1/3 h-3/4 justify-center items-center cursor-pointer" onClick={createAccount}>
                    <img src="/stickers/create.gif" className="w-3/6" />
                    <div className="text-white text-2xl text-center">Create Account</div>
                    <p className="text-gray-300 text-center">
                        You can create a new account which will generate a new private key and address. You can then use this private key to login to your account.
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    );
})