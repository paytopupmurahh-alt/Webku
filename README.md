# 🎮 Webku - Top Up Game Modern & Fullstack

Website top up game modern dengan dark mode + orange accent, siap deploy ke Vercel tanpa error.

## ✨ Fitur Utama

- ✅ **Dark Mode** - Interface gelap dengan aksen orange yang elegan
- ✅ **Mobile Friendly** - Responsive design untuk semua perangkat
- ✅ **Fast & Ringan** - Build cepat dengan Vite
- ✅ **Admin Panel** - Login dengan OTP WhatsApp
- ✅ **Produk Dummy** - 8+ game siap tampil
- ✅ **Serverless API** - Compatible dengan Vercel
- ✅ **Zero Errors** - Production ready

## 📁 Struktur Folder

```
Webku/
├── api/
│   ├── send-otp.js          # OTP WhatsApp API
│   ├── verify-otp.js         # Verifikasi OTP
│   └── products.js           # List produk
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── ProductList.jsx
│   │   ├── ProductItem.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── Toast.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
│   └── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── .env.example
└── .gitignore
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build untuk Production
```bash
npm run build
```

## 🌐 Deploy ke Vercel

### Option 1: Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option 2: GitHub + Vercel Dashboard
1. Push ke GitHub
2. Connect di Vercel
3. Set environment variables
4. Deploy

## 🔑 Environment Variables

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
ADMIN_WHATSAPP=62812345678
FONNTE_API_KEY=your_api_key
```

## 📱 Halaman

- **Home** - Hero + Product listing
- **Admin Login** - OTP WhatsApp verification
- **Products** - Filter & grid display

## 🔌 API Endpoints

- `POST /api/send-otp` - Kirim OTP WhatsApp
- `POST /api/verify-otp` - Verifikasi OTP
- `GET /api/products` - List produk

## 🎨 Design

- Dark mode dengan orange accent
- Mobile responsive
- Smooth animations
- Modern UI

## 🛠️ Tech Stack

- React 18 + Vite
- Vanilla CSS (CSS Variables)
- Node.js Serverless APIs
- Vercel deployment

## 📦 Resources

- Fonnte API untuk WhatsApp
- Unsplash untuk gambar produk
- Built for production & ready to scale