import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import HomePage from "./pages/HomePage";
import SignAndVerifyPage from "./pages/SignAndVerifyPage";
import TentangKamiPage from "./pages/TentangKamiPage";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const navItems = [
  { to: "/", label: "Beranda" },
  { to: "/sign-and-verify", label: "Verifikasi Dokumen" },
  { to: "/tentang-kami", label: "About" },
];

function Header() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false); // Tutup menu mobile saat lokasi berubah
  }, [location]);

  const NavLinkClasses = ({ isActive }) =>
    `relative font-medium tracking-wide transition-colors duration-300 px-1 py-2
      hover:text-blue-400
      ${isActive
        ? 'text-purple-400 after:content-[""] after:absolute after:left-0 after:bottom-0.5 after:w-full after:h-0.5 after:bg-purple-400 after:scale-x-100'
        : 'text-gray-200 after:content-[""] after:absolute after:left-0 after:bottom-0.5 after:w-full after:h-0.5 after:bg-blue-400 after:scale-x-0 hover:after:scale-x-100'
      } after:origin-left after:transition-transform after:duration-300`;

  const MobileNavLinkClasses = ({ isActive }) =>
    `block w-full text-center py-3 px-4 text-lg font-medium transition-colors duration-200
      hover:bg-gray-800
      ${isActive
        ? 'text-purple-400 bg-purple-900/40'
        : 'text-gray-200'
      }`;

  return (
    <header
      ref={headerRef}
      className={`z-[1000] fixed top-0 left-0 w-full transition-all duration-300 ease-in-out
        ${isScrolled
          ? 'bg-black/70 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <NavLink
            to="/"
            className="flex items-center text-2xl sm:text-3xl font-extrabold tracking-tight text-white group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <img src="/images/xx.png" alt="SignProof Logo" className="h-8 w-8 mr-2" />
            Sign<span className="text-purple-400">Proof</span>
          </NavLink>

          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === "/"} className={NavLinkClasses}>
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 rounded-md text-gray-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            >
              {isMobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-md shadow-xl border-t border-gray-700"
          >
            <nav className="flex flex-col py-2">
              {navItems.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  className={MobileNavLinkClasses}
                  onClick={() => setIsMobileMenuOpen(false)} // Tutup menu setelah klik
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans overflow-x-hidden">
      <Header />
      <div className="pt-16 md:pt-20"> {/* Padding top untuk memberi ruang bagi header fixed */}
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            // PERUBAHAN DITERAPKAN DI SINI:
            className="min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] w-full pb-0"
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/sign-and-verify" element={<SignAndVerifyPage />} />
              <Route path="/tentang-kami" element={<TentangKamiPage />} />
            </Routes>
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}