// nodejs/verifier.js

const { ethers } = require("ethers");
const fs = require("fs");
require("dotenv").config();

// Load ABI dari file VerifierABI.json
const abi = require("./VerifierABI.json");

// Ganti dengan alamat kontrak terbaru (hasil deploy dari Remix)
const contractAddress = "0x0c86aA4c2d96BBE1BF242524Ed4115818775f261";

// Alchemy Sepolia RPC dari .env
const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

// Buat instance kontrak
const verifierContract = new ethers.Contract(contractAddress, abi, provider);

// Fungsi untuk verifikasi signature
async function verifySignature(message, signature, expectedSigner) {
  try {
    // Hash pesan menggunakan ethers
    const messageHash = ethers.hashMessage(message);
    
    // Parsing signature string jadi objek Signature
    const sig = ethers.Signature.from(signature); // signature adalah string 0x...

    // Panggil smart contract
    const isValid = await verifierContract.verify(
      messageHash,
      sig.v,
      sig.r,
      sig.s,
      expectedSigner
    );

    console.log("\n=== VERIFICATION RESULT ===");
    console.log("✅ Signature valid?", isValid);
    return isValid;
  } catch (err) {
    console.error("❌ Error verifying signature:", err);
    return false;
  }
}

// ==== CONTOH PEMANGGILAN ====
// Salin dari hasil signer.js
if (require.main === module) {
  const message = "Hello world!";
  const expectedSigner = "0x7E931EF2Af8bF07633612883CF5F7d66dA109C62"; // ✅ dari signer.js
  const signature = "0x6b8477144a39f6866439819c52b4d8d2716041e8b5d6e0075f9422b00c783d7c4fb6c4e5390db8d1c3651049d7ec813fefc7c460b918413ab06da3464ac414c91b"; // ✅ dari signer.js

  verifySignature(message, signature, expectedSigner);
}


module.exports = {
  verifySignature,
};
