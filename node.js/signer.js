const Web3 = require('web3');
require('dotenv').config();

// Inisialisasi Web3 dengan Alchemy Sepolia
const web3 = new Web3("https://eth-sepolia.g.alchemy.com/v2/IZzK0tGhkuG3-EeYtG5HeK3q7NcqQ0_o");

// Bisa pakai akun tetap (jika ingin tes verifikasi akun yang sama terus)
const account = web3.eth.accounts.create(); // atau ambil dari .env jika perlu

// Data yang akan ditandatangani
const data = "Hello world!";
const signature = web3.eth.accounts.sign(data, account.privateKey);

// Smart contract ABI (dari VerifierABI.json)
const contractABI = [
  {
    "inputs": [
      { "internalType": "bytes32", "name": "messageHash", "type": "bytes32" },
      { "internalType": "uint8", "name": "v", "type": "uint8" },
      { "internalType": "bytes32", "name": "r", "type": "bytes32" },
      { "internalType": "bytes32", "name": "s", "type": "bytes32" },
      { "internalType": "address", "name": "signer", "type": "address" }
    ],
    "name": "verify",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "pure",
    "type": "function"
  }
];

// Alamat kontrak dari Remix (hasil deploy di Sepolia)
const contractAddress = "0x0c86aA4c2d96BBE1BF242524Ed4115818775f261";
const contract = new web3.eth.Contract(contractABI, contractAddress);

console.log("\n=== SIGNATURE DETAILS ===");
console.log("Message       :", data);
console.log("Message Hash  :", signature.messageHash);
console.log("v             :", signature.v);
console.log("r             :", signature.r);
console.log("s             :", signature.s);
console.log("Signer Address:", account.address);
console.log("Private Key   :", account.privateKey);

// Fungsi untuk memanggil verify dari smart contract
async function main() {
  const result = await contract.methods
    .verify(signature.messageHash, signature.v, signature.r, signature.s, account.address)
    .call();

  console.log("\n=== VERIFICATION RESULT ===");
  console.log("Is signature valid:", result);
}

main().catch(console.error);
