import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaLightbulb, FaUsers, FaGithub, FaEnvelope } from "react-icons/fa";

// Data Tim (SignProof)
const team = [
  {
    name: "Ardhi Fardan Kamil",
    role: "Founder & Blockchain Architect",
    photo: "https://i.pinimg.com/736x/7c/70/b6/7c70b6999f3d161c8438ac6e13b2a56d.jpg",
    nim: "237006176",
    description: "Merancang arsitektur blockchain SignProof, memastikan keamanan dan efisiensi integrasi.",
    github: "https://github.com/Kai2446-cmyk",
    email: "237006176@student.unsil.ac.id",
  },
  {
    name: "Muhammad Naufal Darlian",
    photo: "https://i.pinimg.com/736x/44/22/84/442284f2f68a587b407fd3c7e3e8a0e2.jpg",
    role: "UI/UX Designer",
    nim: "237006152",
    description: "Menciptakan pengalaman pengguna yang intuitif dan menarik secara visual untuk SignProof.",
    github: "https://github.com/le0nxD",
    email: "237006152@student.unsil.ac.id",
  },
  {
    name: "Muhammad Luthfi Nurhakim",
    photo: "https://i.pinimg.com/736x/74/86/4a/74864a16c2bae0d89bedfa630ed48e4f.jpg",
    role: "Smart Contract Developer",
    nim: "237006179",
    description: "Mengembangkan smart contract yang aman dan optimal untuk protokol blockchain kami.",
    github: "https://github.com/Oxiliya",
    email: "237006179@student.unsil.ac.id",
  },
];

// Data Nilai-Nilai (SignProof)
const values = [
    {
        title: "Inovasi",
        description: "Selalu berada di garis depan teknologi blockchain dan kriptografi.",
        icon: <FaLightbulb className="w-12 h-12 text-purple-500" />,
    },
    {
        title: "Keamanan",
        description: "Mengutamakan keamanan data dan privasi dalam setiap layanan kami.",
        icon: <FaShieldAlt className="w-12 h-12 text-blue-500" />,
    },
    {
        title: "Kolaborasi",
        description: "Membangun masa depan digital bersama melalui kemitraan dan transparansi.",
        icon: <FaUsers className="w-12 h-12 text-green-500" />,
    },
];

export default function TentangKamiPage() {
  const signProofFooterInfo = {
    description: "Pionir dalam revolusi tanda tangan digital, menghadirkan solusi blockchain untuk transaksi yang lebih aman dan terpercaya.",
    navLinks: [
      { text: "Beranda", href: "/" }, // Mengarahkan ke halaman utama
      { text: "Tanda Tangan & Verifikasi", href: "/sign-and-verify" },
      // { text: "Solusi Blockchain", href: "#solution" }, // Contoh link tambahan, pastikan ada id="solution" jika ini link internal halaman
    ],
    contact: {
      email: "mailto:hello@signproof.tech",
      github: "https://github.com/your-signproof-repo", // GANTI DENGAN URL GITHUB SIGNPROOF YANG SEBENARNYA
    },
    copyrightName: "SignProof",
    copyrightSlogan: "Melangkah Maju di Era Digital."
  };

  return (
    <div className="min-h-screen w-full bg-black text-gray-100 flex flex-col">
      {/* Konten Utama Halaman */}
      <main className="flex-grow">
        {/* Hero Section - SignProof */}
        <div className="relative w-full h-screen flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/background/20240715/pngtree-crypto-trade-btc-bitcoin-illustration-for-graphics-marketing-promotion-image_16011614.jpg')`, // Pertimbangkan untuk memindahkan URL ke variabel atau mengimpor gambar jika disimpan lokal
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 flex flex-col justify-center items-center px-6 text-center text-white backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                Team SignProof {/* Judul Utama Halaman Tentang Kami */}
              </h1>
              <p className="text-xl md:text-3xl font-semibold text-blue-200 mb-8">
                Kekuatan di Balik Revolusi Digital
              </p>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200">
                Kami adalah tim visioner yang berdedikasi untuk menciptakan masa depan transaksi digital yang aman, transparan, dan efisien melalui kekuatan teknologi blockchain.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Team Section - SignProof */}
        <section className="py-24 bg-gradient-to-b from-black via-gray-900 to-black text-white">
          <div className="max-w-6xl mx-auto px-6">
            {/* PERBAIKAN DI SINI: Menambahkan teks untuk judul section tim */}
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Tim Kami yang Berdedikasi
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-3xl border border-gray-700 hover:border-gray-500 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 group flex flex-col h-full overflow-hidden"
                >
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="p-6 text-left flex-grow flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-1 text-white">
                        {member.name}
                      </h3>
                      <p className="text-blue-400 font-medium text-sm mb-0.5">
                        {member.role}
                      </p>
                      <p className="text-white-400 font-medium mb-4 text-lg"> {/* Seharusnya text-gray-400 atau sejenisnya, bukan text-white-400 */}
                        {member.nim}
                      </p>
                      <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                        {member.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-start space-x-5 mt-auto">
                      <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <FaGithub size={24} />
                      </a>
                      <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-white transition-colors">
                        <FaEnvelope size={24} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section - SignProof */}
        <section className="py-24 bg-gradient-to-b from-black via-gray-900/50 to-black text-white">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Nilai Inti Kami
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg p-10 rounded-3xl border border-gray-700 hover:border-gray-500 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 group text-center"
                >
                  <div className="mb-6 flex justify-center transform group-hover:scale-110 transition-transform duration-500">
                    {value.icon}
                  </div>
                  <h4 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    {value.title}
                  </h4>
                  <p className="text-lg text-gray-300">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full bg-black text-white py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div>
              <h4 className="text-xl font-bold mb-3 text-white">
                {signProofFooterInfo.copyrightName}
              </h4>
              <p className="text-gray-400 text-sm">
                {signProofFooterInfo.description}
              </p>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-3 text-white">Navigasi</h5>
              <ul className="space-y-2">
                {signProofFooterInfo.navLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-3 text-white">Kontak & Sosial Media</h5>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <FaEnvelope className="text-gray-400 mr-2" size={18}/>
                  <a href={signProofFooterInfo.contact.email} className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                    Email
                  </a>
                </li>
                <li className="flex items-center">
                  <FaGithub className="text-gray-400 mr-2" size={18}/>
                  <a href={signProofFooterInfo.contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-700 text-center text-gray-500">
            <p className="text-sm">&copy; {new Date().getFullYear()} {signProofFooterInfo.copyrightName}. {signProofFooterInfo.copyrightSlogan}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}