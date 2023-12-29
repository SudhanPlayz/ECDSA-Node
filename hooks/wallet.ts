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

    const refresh = async () => {
        const pk = window.localStorage.getItem("privateKey")
        if (pk) {
            let isValid = getPublicKey(pk)
            if (isValid) {
                setPrivateKey(Buffer.from(pk, "hex"))
                setPublicKey(secp256k1.getPublicKey(pk))
                setAddress(getAddress(secp256k1.getPublicKey(pk)))

                fetch("/api/wallet?address=" + getAddress(secp256k1.getPublicKey(pk))).then(x => x.json()).then(x => {
                    setBalance(x.balance)
                })
            } else {
                window.localStorage.removeItem("privateKey")
            }
        }
    }

    useEffect(() => {
        refresh()
    }, [])

    return { privateKey, publicKey, address, balance, refresh }
}

export default useWallet