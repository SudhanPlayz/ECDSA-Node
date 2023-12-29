'use client'
import { useEffect, useState } from "react";
import { getPublicKey } from "@/utils/wallet";
import { getAddress } from "@/utils/address";
import { secp256k1 } from "ethereum-cryptography/secp256k1";

function useWallet() {
    const [privateKey, setPrivateKey] = useState<Uint8Array | null>(null)
    const [publicKey, setPublicKey] = useState<Uint8Array | null>(null)
    const [address, setAddress] = useState<string | null>(null)
    const [balance, setBalance] = useState<number>(0)

    useEffect(() => {
        const pk = window.localStorage.getItem("privateKey")
        if (pk) {
            let isValid = getPublicKey(pk)
            if (isValid) {
                setPrivateKey(Buffer.from(pk, "hex"))
                setPublicKey(secp256k1.getPublicKey(Buffer.from(pk, "hex")))
                setAddress(getAddress(Buffer.from(pk, "hex")))

                fetch("/api/wallet?address=" + getAddress(Buffer.from(pk, "hex"))).then(x => x.json()).then(x => {
                    console.log(x)
                    setBalance(x.balance)
                })
            } else {
                window.localStorage.removeItem("privateKey")
            }
        }

        console.log(pk, privateKey, Buffer.from(privateKey!).toString("hex"), publicKey, Buffer.from(publicKey!).toString("hex"), address)
    }, [])

    return { privateKey, publicKey, address }
}

export default useWallet