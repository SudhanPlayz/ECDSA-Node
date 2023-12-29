import Navbar from "components/Navbar";
import { Inter } from "next/font/google";
import Footer from "components/Footer";
import { withSwal } from 'react-sweetalert2';

const font = Inter({
    subsets: ["latin"],
})

export default withSwal(({ swal }: any) => {
    const importPrivateKey = () => {
        const { value: json } = swal.fire({
            title: "Import Private Key",
            input: "file",
            inputPlaceholder: "Select your private key",
            showCancelButton: true,
            inputValidator: (value: any) => {
                return new Promise((resolve, reject) => {
                    if (value) {
                        let reader = new FileReader()
                        reader.readAsText(value)

                        reader.onload = () => {
                            try {
                                let json = JSON.parse(reader.result as string)
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

        console.log(json)
    }

    const createAccount = () => {
        swal.fire({
            title: "Create Account",
            html: `
                <div className="flex flex-col">
                    <input className="bg-slate-900 text-white rounded-md p-2 py-3 m-2 outline-none" placeholder="Enter username" />
                    <input className="bg-slate-900 text-white rounded-md p-2 py-3 m-2 outline-none" placeholder="Enter password" />
                    <button className="bg-blue-500 text-white rounded-md px-5 py-2 m-2 hover:bg-blue-700 text-lg">Create</button>
                </div>
            `,
            showConfirmButton: false
        }).then(() => {
            console.log("Created account")
        })
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