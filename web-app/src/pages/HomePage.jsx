import React, { useState } from "react"; // Pastikan useState diimpor
import Slider from "react-slick";
import {
  FaEthereum,
  FaKey,
  FaShieldAlt,
  FaFileSignature,
  FaCheckCircle,
  FaGithub, // Untuk ikon footer
  FaEnvelope, // Untuk ikon footer
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    image:
      "https://images.pexels.com/photos/7567444/pexels-photo-7567444.jpeg?auto=compress&cs=tinysrgb&w=1920",
    title: "Platform Ini",
    subtitle: "Masa Depan Tanda Tangan Digital",
    description: (
      <>
        <strong>SignProof</strong> hadir sebagai pionir teknologi tanda tangan
        digital dengan <span className="font-semibold">Kriptografi Modern</span>{" "}
        dan <span className="font-semibold">Blockchain Ethereum</span>. Wujudkan
        transaksi digital yang aman dan terpercaya.
      </>
    ),
    buttonText: "Mulai Perjalanan Digital",
    buttonLink: "/sign-and-verify",
  },
  {
    image:
      "https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1920",
    title: "Adaptasi Teknologi Informasi",
    subtitle: "Transformasi Dokumen Legal Era Modern",
    description: (
      <>
        Hadirkan <strong>keunggulan teknologi blockchain</strong> dalam setiap
        transaksi Anda. Sempurna untuk kontrak bisnis, dokumen hukum, dan
        sertifikasi digital yang memerlukan standar keamanan tertinggi.
      </>
    ),
    buttonText: "Jelajahi Keunggulan Kami",
    buttonLink: "/sign-and-verify",
  },
  {
    image:
      "https://images.pexels.com/photos/7567537/pexels-photo-7567537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Komitmen Kami",
    subtitle: "Keamanan Tanpa Kompromi",
    description: (
      <>
        Diperkuat oleh <strong>teknologi blockchain mutakhir</strong> dan{" "}
        <strong>tim ahli berpengalaman</strong>, kami berkomitmen menghadirkan
        solusi tanda tangan digital yang mengutamakan keamanan dan kemudahan.
      </>
    ),
    buttonText: "Kenali Kami Lebih Dekat",
    buttonLink: "/tentang-kami",
  },
];

const features = [
  {
    icon: <FaShieldAlt className="w-12 h-12 text-blue-500" />,
    title: "Keamanan Tak Tertandingi",
    description:
      "Sistem enkripsi mutakhir dengan teknologi blockchain yang menjamin keaslian setiap tanda tangan digital",
  },
  {
    icon: <FaFileSignature className="w-12 h-12 text-green-500" />,
    title: "Kemudahan Maksimal",
    description:
      "Proses tanda tangan digital yang cepat dan intuitif, dirancang untuk efisiensi tanpa mengorbankan keamanan",
  },
  {
    icon: <FaCheckCircle className="w-12 h-12 text-purple-500" />,
    title: "Verifikasi Instan",
    description:
      "Validasi dokumen secara real-time melalui jaringan blockchain dengan tingkat akurasi sempurna",
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0); // State untuk melacak slide aktif

  // Objek sliderSettings sekarang didefinisikan di dalam komponen HomePage
  // agar bisa mengakses currentSlide dan setCurrentSlide
  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    afterChange: (index) => setCurrentSlide(index), // Update state saat slide berubah
    customPaging: (i) => {
      // Fungsi untuk tampilan titik navigasi
      const isActive = i === currentSlide;
      return (
        <div
          className={`
            w-3 h-3 mx-1 rounded-full transition-all duration-300 cursor-pointer
            ${
              isActive
                ? "bg-white opacity-100 scale-110"
                : "bg-white opacity-50"
            }
            ${!isActive ? "hover:opacity-75" : ""}
          `}
        />
      );
    },
    dotsClass: "slick-dots !bottom-2 md:!bottom-5", // Mengatur posisi grup titik navigasi
  };

  // Objek untuk konten footer SignProof
  const signProofFooterInfo = {
    description:
      "Pionir dalam revolusi tanda tangan digital, menghadirkan solusi blockchain untuk transaksi yang lebih aman dan terpercaya.",
    navLinks: [
      { text: "Beranda", href: "/" },
      { text: "Verifikasi Dokumen", href: "/sign-and-verify" },
      { text: "About", href: "/tentang-kami" },
    ],
    contact: {
      email: "mailto:hello@signproof.tech",
      github: "https://github.com/your-signproof-repo", // GANTI DENGAN URL GITHUB SIGNPROOF
    },
    copyrightName: "SignProof",
    copyrightSlogan: "Melangkah Maju di Era Digital.",
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-gray-100 flex flex-col">
      <main className="flex-grow">
        {/* Hero Slider */}
        <div className="h-screen">
          <Slider {...sliderSettings}>
            {" "}
            {/* Menggunakan sliderSettings yang sudah dimodifikasi */}
            {slides.map((slide, index) => (
              <div key={index}>
                <div
                  className="relative h-screen bg-cover bg-center bg-fixed"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 flex flex-col justify-center items-center px-6 text-center text-white backdrop-blur-sm">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="max-w-4xl mx-auto"
                    >
                      <h2 className="text-5xl md:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                        {slide.title}
                      </h2>
                      <p className="text-xl md:text-3xl font-semibold text-blue-200 mb-8">
                        {slide.subtitle}
                      </p>
                      <div className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 mb-10">
                        {slide.description}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(slide.buttonLink)}
                        className="px-10 py-5 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold text-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
                      >
                        {slide.buttonText}
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Features Section */}
        <section className="py-24 bg-gradient-to-b from-black via-gray-900 to-black text-white">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Inovasi Baru
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg p-10 rounded-3xl border border-gray-700 hover:border-gray-500 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 group"
                >
                  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500 flex justify-center">
                    {feature.icon}
                  </div>
                  <h4 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-center">
                    {feature.title}
                  </h4>
                  <p className="text-lg text-gray-300 text-center">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full bg-black text-white py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
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

            <div>
              <h5 className="text-lg font-semibold mb-3 text-gray-200">
                Navigasi
              </h5>
              <ul className="space-y-2">
                {signProofFooterInfo.navLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-3 text-gray-200">
                Kontak & Sosial Media
              </h5>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <FaEnvelope className="text-gray-400 mr-2" size={18} />
                  <a
                    href={signProofFooterInfo.contact.email}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    Email
                  </a>
                </li>
                <li className="flex items-center">
                  <FaGithub className="text-gray-400 mr-2" size={18} />
                  <a
                    href={signProofFooterInfo.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-700 text-center text-gray-500">
            <p className="text-sm">
              &copy; {new Date().getFullYear()}{" "}
              {signProofFooterInfo.copyrightName}.{" "}
              {signProofFooterInfo.copyrightSlogan}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
