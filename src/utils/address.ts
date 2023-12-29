import { keccak256 } from "ethereum-cryptography/keccak"
import { toHex } from "ethereum-cryptography/utils";

export const getAddress = (publicKey: Uint8Array) => {
    publicKey = publicKey.slice(1)
    let hash = keccak256(publicKey)
    return "0x"+toHex(hash.slice(hash.length-20))
}

export const isAddress = (address: string) => {
    return /^0x[0-9a-fA-F]{40}$/.test(address)
}