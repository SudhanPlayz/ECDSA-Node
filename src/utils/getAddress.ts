const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");

export default (publicKey: Uint8Array) => {
    publicKey = publicKey.slice(1)
    let hash = keccak256(publicKey)
    return "0x"+toHex(hash.slice(hash.length-20))
}