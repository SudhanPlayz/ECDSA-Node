'use client'
import { useEffect, useState } from "react";
import { getPublicKey } from "@/utils/wallet";
import { getAddress } from "@/utils/address";

function useWallet() {
    const [privateKey, setPrivateKey] = useState<Uint8Array | null>(null)
    const [publicKey, setPublicKey] = useState<Uint8Array | null>(null)
    const [address, setAddress] = useState<string | null>(null)

    useEffect(() => {
        const pk = window.localStorage.getItem("privateKey")
        if (pk) {
            let isValid = getPublicKey(pk)
            if (isValid) {
                setPrivateKey(Buffer.from(pk, "hex"))
                //@ts-ignore
                setPublicKey(getPublicKey(pk))
                setAddress(getAddress(Buffer.from(pk, "hex")))
            } else {
                window.localStorage.removeItem("privateKey")
            }
        }
    }, [])

    return { privateKey, publicKey, address }
}

export default useWallet