Berikut versi README `SignProof` yang **lebih estetik**, menggunakan elemen visual seperti emoji, ikon, dan struktur markdown yang lebih elegan & modern — cocok untuk GitHub:

---

````markdown
<h1 align="center">🛡️ SignProof</h1>
<p align="center"><strong>Platform Tanda Tangan Digital Terdesentralisasi</strong></p>
<p align="center">
  <img src="https://img.shields.io/badge/React-v18-blue?style=flat&logo=react" />
  <img src="https://img.shields.io/badge/Solidity-SmartContract-black?style=flat&logo=ethereum" />
  <img src="https://img.shields.io/badge/Node.js-Backend-green?style=flat&logo=node.js" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat&logo=tailwind-css" />
</p>

<p align="center">Sign & Verify with ❤️ using Ethereum Sepolia and Bash Blockchain.</p>

---

## 👨‍💻 Dibuat oleh:

- 🧑‍💻 [**Muhammad Naufal Darlian (237006152)**](https://github.com/le0nxD)
- 🧑‍💻 [**Ardhi Fardan Kamil (237006176)**](https://github.com/Kai2446-cmyk)
- 🧑‍💻 [**Muhammad Lutfi Nurhakim (237006179)**](https://github.com/Oxiliya)

---

## 📌 Deskripsi Singkat

**SignProof** adalah aplikasi berbasis web yang memungkinkan pengguna untuk melakukan tanda tangan digital menggunakan smart contract di Ethereum Sepolia, serta sistem blockchain lokal berbasis bash. Solusi ini cocok untuk verifikasi dokumen secara desentralisasi dengan antarmuka modern berbasis React.

---

## 🚀 Teknologi yang Digunakan

| Layer               | Teknologi                         |
| ------------------- | --------------------------------- |
| ⚙️ Smart Contract   | `Solidity`, Ethereum Sepolia      |
| 🧠 Backend          | `Node.js`, `Ethers.js`, `Express` |
| 🌐 Frontend         | `React`, `Vite`, `Tailwind CSS`   |
| 🔒 Blockchain Lokal | `Bash Blockchain` (custom logic)  |

---

## 🧪 Langkah 1: Jalankan Backend (`signer.js`)

```bash
cd node.js
npm install
node signer.js
```

📋 Contoh output:

```
=== SIGNATURE DETAILS ===
Message       : Hello world!
Message Hash  : ...
Signer Address: ...
Is signature valid: true
```

---

## 💻 Langkah 2: Jalankan Frontend (React + Vite)

```bash
cd web-app
npm install
npm run dev
```

🌍 Buka browser: [http://localhost:5173](http://localhost:5173)

---

## ⚙️ Konfigurasi Tambahan

📦 Pastikan `package.json` kamu punya script seperti berikut:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

---

## 🛑 Catatan Keamanan

⚠️ **Jangan expose private key ke frontend.**
Jika ingin mengintegrasikan `signer.js` ke web, gunakan Express server sebagai handler API yang aman.

---

## 🤝 Kontribusi

Kami sangat terbuka untuk:

- ⭐ Pull Request
- 🐛 Bug Report
- 💡 Saran / masukan melalui Issues

---

## 📄 Lisensi

Distribusi di bawah lisensi MIT — bebas digunakan untuk pembelajaran, proyek, dan pengembangan lebih lanjut.

---

<p align="center">
  Made with ❤️ by the <strong>SignProof Team</strong>
</p>
```
````
