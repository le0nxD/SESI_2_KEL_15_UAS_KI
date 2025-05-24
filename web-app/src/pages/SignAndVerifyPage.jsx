import React, { useRef, useState, useCallback } from "react";
import { ethers } from "ethers";
import jsPDF from "jspdf";
import { motion } from "framer-motion";
import {
  FaEthereum,
  FaFileSignature,
  FaCheckCircle,
  FaTimesCircle,
  FaFileDownload,
  FaKey,
  FaShieldAlt,
  FaSpinner,
  FaUpload,
  FaGithub, // Ditambahkan untuk ikon footer
  FaEnvelope // Ditambahkan untuk ikon footer
} from "react-icons/fa";

export default function SignAndVerifyPage() {
  const [tab, setTab] = useState("sign");
  const [account, setAccount] = useState(null);
  const [message, setMessage] = useState(
    "Dengan ini saya menyetujui surat kontrak online ini."
  );
  const [signature, setSignature] = useState("");
  const [signLoading, setSignLoading] = useState(false);
  const [signError, setSignError] = useState("");

  const [verifyInput, setVerifyInput] = useState({
    message: "",
    signature: "",
    expectedSigner: "",
  });
  const [verifyResult, setVerifyResult] = useState(null);
  const [verifyMessage, setVerifyMessage] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);

  const [uploadedFile, setUploadedFile] = useState(null);
  const resultRef = useRef(null);

  // Objek untuk konten footer SignProof
  const signProofFooterInfo = {
    description: "Solusi tanda tangan digital berbasis blockchain untuk keamanan dan integritas dokumen Anda di era digital.",
    // PERUBAHAN: Link navigasi disesuaikan
    navLinks: [
      { text: "Beranda", href: "/" },
      { text: "Verifikasi Dokumen", href: "/sign-and-verify" }, // Halaman ini sendiri untuk sign/verify
      { text: "About", href: "/tentang-kami" }, // Path ke halaman Tentang Kami
    ],
    contact: {
      email: "mailto:hello@signproof.tech",
      github: "https://github.com/your-signproof-repo", // GANTI DENGAN URL GITHUB SIGNPROOF
    },
    copyrightName: "SignProof",
    copyrightSlogan: "Melangkah Maju di Era Digital."
  };

  const scrollToResult = useCallback(() => {
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 200);
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask tidak terdeteksi! Silakan install MetaMask terlebih dahulu.");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      setSignError("");
    } catch (error) {
      console.error("User rejected request or error connecting wallet:", error);
      setSignError("Gagal menghubungkan dompet. Pengguna menolak permintaan atau terjadi kesalahan.");
    }
  };

  const signMessage = async () => {
    if (!account || !message.trim()) {
      setSignError("Harap hubungkan dompet dan isi pesan terlebih dahulu.");
      return;
    }
    setSignLoading(true);
    setSignError("");
    setSignature("");
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const messageToSign = uploadedFile
        ? `${message}\n\n--- Dokumen Terlampir ---\nNama File: ${uploadedFile.name}\nUkuran: ${uploadedFile.size} bytes\nTipe: ${uploadedFile.type}`
        : message;
      const signed = await signer.signMessage(messageToSign);
      setSignature(signed);
      scrollToResult();
    } catch (error) {
      console.error("Error signing message:", error);
      setSignError("Gagal menandatangani pesan. Pastikan transaksi disetujui di MetaMask.");
    } finally {
      setSignLoading(false);
    }
  };

  const handleVerifyInputChange = (e) => {
    const { name, value } = e.target;
    setVerifyInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleVerify = async () => {
    const { message: msgToVerify, signature: sigToVerify, expectedSigner } = verifyInput;
    if (!msgToVerify.trim() || !sigToVerify.trim() || !expectedSigner.trim()) {
      setVerifyResult("warning");
      setVerifyMessage("Harap isi semua bidang: pesan, tanda tangan, dan alamat penanda tangan.");
      scrollToResult();
      return;
    }
    setVerifyLoading(true);
    setVerifyResult(null);
    setVerifyMessage("");
    try {
      const recoveredAddress = ethers.verifyMessage(msgToVerify, sigToVerify);
      if (recoveredAddress.toLowerCase() === expectedSigner.toLowerCase()) {
        setVerifyResult("valid");
        setVerifyMessage("✅ Tanda Tangan VALID");
      } else {
        setVerifyResult("invalid");
        setVerifyMessage("❌ Tanda Tangan TIDAK VALID atau tidak cocok dengan alamat penanda tangan.");
      }
    } catch (error) {
      console.error("Error verifying signature:", error);
      setVerifyResult("error");
      setVerifyMessage("⚠️ Terjadi kesalahan saat verifikasi. Pastikan format tanda tangan dan pesan benar.");
    } finally {
      setVerifyLoading(false);
      scrollToResult();
    }
  };

  const exportSignedPDF = () => {
    if (!account || !signature) return;
    const doc = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const contentWidth = pageWidth - 2 * margin;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Dokumen Tanda Tangan Digital - SignProof", pageWidth / 2, margin + 5, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    let currentY = margin + 20;

    doc.text("Pesan yang Ditandatangani:", margin, currentY);
    currentY += 7;
    doc.setFont("courier", "normal");
    const messageToDisplay = uploadedFile
      ? `${message}\n\n--- Dokumen Terlampir ---\nNama File: ${uploadedFile.name}\nUkuran: ${uploadedFile.size} bytes\nTipe: ${uploadedFile.type}`
      : message;
    const splitMessage = doc.splitTextToSize(messageToDisplay, contentWidth);
    doc.text(splitMessage, margin, currentY);
    currentY += (splitMessage.length * 5) + 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("Alamat Penanda Tangan (Ethereum):", margin, currentY);
    currentY += 7;
    doc.setFont("courier", "normal");
    doc.text(account, margin, currentY);
    currentY += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("Tanda Tangan Digital (Hex):", margin, currentY);
    currentY += 7;
    doc.setFont("courier", "normal");
    doc.setFontSize(7);
    const splitSignature = doc.splitTextToSize(signature, contentWidth);
    doc.text(splitSignature, margin, currentY);

    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text(`Dokumen ini telah ditandatangani secara digital pada ${new Date().toLocaleString()}`, pageWidth / 2, pageHeight - 15, { align: "center" });
    doc.text("Divalidasi oleh Sistem SignProof", pageWidth / 2, pageHeight - 10, { align: "center" });

    doc.save("dokumen-tertandatangani-signproof.pdf");
  };

  const exportVerifyPDF = () => {
    if (!verifyResult) return;
    const doc = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const contentWidth = pageWidth - 2 * margin;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Laporan Verifikasi Tanda Tangan - SignProof", pageWidth / 2, margin + 5, { align: "center" });

    let currentY = margin + 20;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    const statusColor = verifyResult === "valid" ? [0,100,0] : (verifyResult === "warning" ? [153,102,0] : [139,0,0]);
    doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
    doc.text(`Status Verifikasi: ${verifyMessage.replace(/^[✅❌⚠️]\s*/, "")}`, margin, currentY);
    currentY += 10;
    doc.setTextColor(0,0,0);

    doc.setFont("helvetica", "normal");
    doc.text("Pesan yang Diverifikasi:", margin, currentY);
    currentY += 7;
    doc.setFont("courier", "normal");
    const splitVerifyMessageText = doc.splitTextToSize(verifyInput.message, contentWidth);
    doc.text(splitVerifyMessageText, margin, currentY);
    currentY += (splitVerifyMessageText.length * 5) + 7;

    doc.setFont("helvetica", "normal");
    doc.text("Alamat Penanda Tangan yang Diharapkan:", margin, currentY);
    currentY += 7;
    doc.setFont("courier", "normal");
    doc.text(verifyInput.expectedSigner, margin, currentY);
    currentY += 10;

    doc.setFont("helvetica", "normal");
    doc.text("Tanda Tangan Digital yang Diverifikasi:", margin, currentY);
    currentY += 7;
    doc.setFont("courier", "normal");
    doc.setFontSize(7);
    const splitVerifySignature = doc.splitTextToSize(verifyInput.signature, contentWidth);
    doc.text(splitVerifySignature, margin, currentY);

    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text(`Laporan ini dibuat pada ${new Date().toLocaleString()}`, pageWidth / 2, pageHeight - 15, { align: "center" });
    doc.text("Diverifikasi menggunakan sistem SignProof", pageWidth / 2, pageHeight - 10, { align: "center" });

    doc.save("hasil-verifikasi-signproof.pdf");
  };
  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        alert("Hanya file PDF yang diperbolehkan.");
        e.target.value = null;
        setUploadedFile(null);
        return;
      }
      if (file.size > 2 * 1024 * 1024) { // Maks 2MB
        alert("Ukuran file PDF maksimal adalah 2MB.");
        e.target.value = null;
        setUploadedFile(null);
        return;
      }
      setUploadedFile(file);
    } else {
      setUploadedFile(null);
    }
  };

  const renderVerifyResult = () => {
    if (!verifyResult) return null;

    let bgColor, textColor, IconComponent;
    const cleanVerifyMessageText = verifyMessage.replace(/^[✅❌⚠️]\s*/, "");

    switch (verifyResult) {
      case "valid":
        bgColor = "bg-green-600/20 border-green-600/30"; textColor = "text-green-400"; IconComponent = FaCheckCircle; break;
      case "invalid":
        bgColor = "bg-red-600/20 border-red-600/30"; textColor = "text-red-400"; IconComponent = FaTimesCircle; break;
      case "warning":
        bgColor = "bg-yellow-500/20 border-yellow-500/30"; textColor = "text-yellow-300"; IconComponent = FaTimesCircle; break; 
      case "error": default:
        bgColor = "bg-red-700/20 border-red-700/30"; textColor = "text-red-500"; IconComponent = FaTimesCircle; break;
    }

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} ref={resultRef} className={`p-4 sm:p-6 mt-6 rounded-xl border ${bgColor}`}>
        <div className={`flex items-center justify-center text-lg sm:text-xl font-bold mb-4 ${textColor}`}>
          <IconComponent className="mr-2 sm:mr-3 text-xl sm:text-2xl flex-shrink-0" />
          <span className="text-center">{cleanVerifyMessageText}</span>
        </div>
        {verifyResult === "valid" && verifyInput.message && (
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={exportVerifyPDF}
            className="w-full mt-4 py-2.5 sm:py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 flex items-center justify-center text-sm sm:text-base">
            <FaFileDownload className="mr-2" />
            Unduh Laporan Verifikasi
          </motion.button>
        )}
      </motion.div>
    );
  };
  
  const tabItems = [
    { id: "sign", label: "Tanda Tangan", icon: <FaFileSignature /> },
    { id: "verify", label: "Verifikasi", icon: <FaCheckCircle /> },
  ];

  const featureItems = [
    { icon: <FaShieldAlt />, title: "Keamanan Maksimal", description: "Dilindungi oleh teknologi blockchain dan kriptografi modern untuk integritas data." },
    { icon: <FaKey />, title: "Verifikasi Instan & Akurat", description: "Proses verifikasi tanda tangan yang cepat dan dapat diandalkan melalui blockchain." },
    { icon: <FaFileSignature />, title: "Antarmuka Intuitif", description: "Platform yang dirancang untuk kemudahan penggunaan bagi semua kalangan." },
  ];

  const commonInputClass = "w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gray-700/70 border border-gray-600/80 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-inner text-sm sm:text-base";
  const commonLabelClass = "block text-gray-300 font-medium mb-1.5 sm:mb-2 text-sm sm:text-base";
  const commonButtonClass = "w-full py-3 sm:py-3.5 rounded-lg text-white font-bold text-base sm:text-lg disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 shadow-lg flex items-center justify-center";

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-950 to-black text-gray-100 flex flex-col">
      <main className="flex-grow relative w-full">
        {/* Hero Section with Background */}
        <div className="relative w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[url('https://stts.edu/lfm/files/shares/Jurnalis/Blog/2021/210426%20-%20BitCoin/ilustrasi-bit-coin-ilustrasi-bitcoin-2_169.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-5"></div>
          
          <div className="relative max-w-5xl mx-auto">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                {tab === "sign" ? "Verifikasi Dokumen" : "Verifikasi Keaslian Tanda Tangan"} {/* Judul diubah sesuai tab */}
              </h1>
              <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
                Amankan dan verifikasi dokumen digital Anda dengan kekuatan kriptografi dan teknologi blockchain Ethereum.
              </p>
            </motion.div>

            {/* Tabs */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex justify-center bg-gray-800/70 p-1.5 rounded-full backdrop-blur-sm">
                {tabItems.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setTab(item.id)}
                    className={`flex-1 flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-all duration-300
                      ${tab === item.id 
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "text-gray-400 hover:text-white hover:bg-gray-700/50"}`}
                  >
                    <span className="mr-2 text-lg">{item.icon}</span>
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Main Form Card */}
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto bg-gray-800/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-700/60"
            >
              {tab === "sign" ? (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Formulir Tanda Tangan Digital
                  </h2>
                  
                  {!account ? (
                    <div className="text-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={connectWallet}
                        className={`${commonButtonClass} bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600`}
                      >
                        <FaEthereum className="mr-2 text-xl" />
                        Hubungkan Dompet
                      </motion.button>
                      {signError && <p className="text-red-400 mt-3 text-sm">{signError}</p>}
                    </div>
                  ) : (
                    <div className="text-center text-green-400 font-semibold p-3 bg-green-600/10 rounded-lg border border-green-600/30">
                      <FaCheckCircle className="inline mr-2" />
                      Terhubung: {account.substring(0,6)}...{account.substring(account.length - 4)}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="messageSign" className={commonLabelClass}>
                        Pesan / Isi Dokumen
                      </label>
                      <textarea
                        id="messageSign"
                        className={commonInputClass}
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Masukkan pesan atau isi dokumen yang akan ditandatangani..."
                        disabled={!account || signLoading}
                      />
                    </div>

                    <div>
                      <label htmlFor="fileUpload" className={commonLabelClass}>
                        (Opsional) Lampirkan PDF <span className="text-xs text-gray-400">(Max 2MB)</span>
                      </label>
                      <div className="relative">
                        <input
                          id="fileUpload"
                          type="file"
                          accept="application/pdf"
                          onChange={handleFileUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          disabled={!account || signLoading}
                        />
                        <div className={`${commonInputClass} flex items-center justify-between cursor-pointer ${uploadedFile ? 'border-blue-500' : ''}`}>
                          <span className={uploadedFile ? 'text-blue-300' : 'text-gray-400'}>
                            {uploadedFile ? uploadedFile.name : "Pilih file PDF..."}
                          </span>
                          <FaUpload className={uploadedFile ? 'text-blue-400' : 'text-gray-500'} />
                        </div>
                      </div>
                      {uploadedFile && (
                        <p className="text-xs text-green-400 mt-1">
                          File {uploadedFile.name} siap dilampirkan
                        </p>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={signMessage}
                      disabled={!account || signLoading || !message.trim()}
                      className={`${commonButtonClass} bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700`}
                    >
                      {signLoading ? (
                        <>
                          <FaSpinner className="animate-spin mr-2" />
                          Menandatangani...
                        </>
                      ) : (
                        <>
                          <FaFileSignature className="mr-2" />
                          Tanda Tangan Sekarang
                        </>
                      )}
                    </motion.button>

                    {signError && !signLoading && (
                      <p className="text-red-400 text-sm text-center">{signError}</p>
                    )}

                    {signature && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        ref={resultRef}
                        className="mt-6 p-6 rounded-xl bg-gray-700/60 border border-gray-600/70"
                      >
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                          <FaCheckCircle className="text-green-400 mr-2" />
                          Hasil Tanda Tangan Digital
                        </h3>
                        <textarea
                          readOnly
                          className={`${commonInputClass} bg-gray-800/80 text-gray-300 text-sm break-all select-all`}
                          rows={3}
                          value={signature}
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={exportSignedPDF}
                          className={`${commonButtonClass} mt-4 bg-red-600 hover:bg-red-700 text-sm py-3`}
                        >
                          <FaFileDownload className="mr-2" />
                          Unduh PDF Hasil Tanda Tangan
                        </motion.button>
                      </motion.div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Formulir Verifikasi Tanda Tangan
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="verifyMessage" className={commonLabelClass}>
                        Pesan / Isi Dokumen Asli
                      </label>
                      <textarea
                        id="verifyMessage"
                        name="message"
                        className={commonInputClass}
                        rows={3}
                        value={verifyInput.message}
                        onChange={handleVerifyInputChange}
                        placeholder="Masukkan pesan atau isi dokumen asli yang telah ditandatangani..."
                        disabled={verifyLoading}
                      />
                    </div>

                    <div>
                      <label htmlFor="verifySignature" className={commonLabelClass}>
                        Tanda Tangan Digital (Hex)
                      </label>
                      <textarea
                        id="verifySignature"
                        name="signature"
                        className={commonInputClass}
                        rows={3}
                        value={verifyInput.signature}
                        onChange={handleVerifyInputChange}
                        placeholder="Masukkan kode tanda tangan digital (hex string)..."
                        disabled={verifyLoading}
                      />
                    </div>

                    <div>
                      <label htmlFor="expectedSigner" className={commonLabelClass}>
                        Alamat Ethereum Penanda Tangan
                      </label>
                      <input
                        id="expectedSigner"
                        name="expectedSigner"
                        type="text"
                        className={commonInputClass}
                        value={verifyInput.expectedSigner}
                        onChange={handleVerifyInputChange}
                        placeholder="Masukkan alamat Ethereum yang diharapkan menandatangani..."
                        disabled={verifyLoading}
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleVerify}
                      disabled={verifyLoading || !verifyInput.message.trim() || !verifyInput.signature.trim() || !verifyInput.expectedSigner.trim()}
                      className={`${commonButtonClass} bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700`}
                    >
                      {verifyLoading ? (
                        <>
                          <FaSpinner className="animate-spin mr-2" />
                          Memverifikasi...
                        </>
                      ) : (
                        <>
                          <FaCheckCircle className="mr-2" />
                          Verifikasi Tanda Tangan
                        </>
                      )}
                    </motion.button>

                    {renderVerifyResult()}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <section className="w-full py-16 bg-black/40 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Kelebihan Sistem Kami
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featureItems.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800/60 backdrop-blur-lg p-8 rounded-2xl border border-gray-700/70 hover:border-blue-500/50 transition-all duration-300 shadow-xl hover:shadow-blue-500/20"
                >
                  <div className="mb-4 flex justify-center text-blue-400">
                    {React.cloneElement(feature.icon, { className: "w-12 h-12" })}
                  </div>
                  <h4 className="text-2xl font-bold mb-3 text-center text-white">
                    {feature.title}
                  </h4>
                  <p className="text-gray-300 text-center leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer dengan link navigasi yang diperbarui */}
      <footer className="w-full bg-black/80 backdrop-blur-md text-white py-12 border-t border-gray-700/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {/* Kolom Kiri: Info SignProof */}
            <div>
              <h4 className="text-xl font-bold mb-3 text-white">
                {signProofFooterInfo.copyrightName}
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {signProofFooterInfo.description}
              </p>
            </div>

            {/* Kolom Tengah: Navigasi SignProof (DIPERBARUI) */}
            <div>
              <h5 className="text-lg font-semibold mb-3 text-gray-200">Navigasi</h5>
              <ul className="space-y-2">
                {signProofFooterInfo.navLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-400 hover:text-blue-300 transition-colors duration-300 text-sm">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kolom Kanan: Kontak & Sosial Media SignProof */}
            <div>
              <h5 className="text-lg font-semibold mb-3 text-gray-200">Kontak & Sosial Media</h5>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <FaEnvelope className="text-gray-400 mr-2" size={18}/>
                  <a href={signProofFooterInfo.contact.email} className="text-gray-400 hover:text-blue-300 transition-colors duration-300 text-sm">
                    Email
                  </a>
                </li>
                <li className="flex items-center">
                  <FaGithub className="text-gray-400 mr-2" size={18}/>
                  <a href={signProofFooterInfo.contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-300 transition-colors duration-300 text-sm">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright SignProof */}
          <div className="pt-8 border-t border-gray-700/50 text-center text-gray-500">
            <p className="text-sm">&copy; {new Date().getFullYear()} {signProofFooterInfo.copyrightName}. {signProofFooterInfo.copyrightSlogan}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}