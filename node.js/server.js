// nodejs/server.js

const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Load ABI dan inisialisasi contract Verifier
const abi = require("./VerifierABI.json");
const contractAddress = "0x0c86aA4c2d96BBE1BF242524Ed4115818775f261";
const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const contract = new ethers.Contract(contractAddress, abi, provider);

// 🧾 SIGN ENDPOINT
app.post("/sign", async (req, res) => {
  const { message, privateKey } = req.body;

  if (!message || !privateKey) {
    return res.status(400).json({ error: "Missing message or privateKey" });
  }

  try {
    const wallet = new ethers.Wallet(privateKey);
    const signature = await wallet.signMessage(message);
    const signer = await wallet.getAddress();

    return res.json({ signature, signer });
  } catch (err) {
    console.error("❌ Error during signing:", err);
    return res.status(500).json({ error: "Signing failed" });
  }
});

// ✅ VERIFY ENDPOINT
app.post("/verify", async (req, res) => {
  const { message, signature, expectedSigner } = req.body;

  if (!message || !signature || !expectedSigner) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Recover components v, r, s from signature
    const sig = ethers.Signature.from(signature);
    const { v, r, s } = sig;

    const messageHash = ethers.hashMessage(message);

    const valid = await contract.verify(
      messageHash,
      Number(v),
      r,
      s,
      expectedSigner
    );

    return res.json({ valid, signer: expectedSigner });
  } catch (err) {
    console.error("❌ Error during verification:", err);
    return res.status(500).json({ error: "Verification failed" });
  }
});

app.listen(PORT, () =>
  console.log(`✅ Verifier backend running at http://localhost:${PORT}`)
);
