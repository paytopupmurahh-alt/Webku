// Simple OTP storage (in production, use Redis or database)
let otpStore = {
  code: null,
  attempts: 0,
  createdAt: null
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;

    // Validasi credentials dari env
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (username !== adminUsername || password !== adminPassword) {
      return res.status(401).json({ 
        success: false, 
        message: 'Username atau password salah' 
      });
    }

    // Generate OTP 6 digit
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Simpan OTP ke memory
    otpStore = {
      code: otp,
      attempts: 0,
      createdAt: Date.now()
    };

    // Kirim ke WhatsApp via Fonnte API
    const phoneNumber = process.env.ADMIN_WHATSAPP || '62812345678';
    const fontneApiKey = process.env.FONNTE_API_KEY || 'test_api_key';

    const message = `🔐 Kode OTP Webku: ${otp}\n\nKode berlaku 10 menit. Jangan bagikan ke siapapun!`;

    try {
      // Call Fonnte API (optional, jika API key valid)
      if (fontneApiKey !== 'test_api_key') {
        await fetch('https://api.fonnte.com/send', {
          method: 'POST',
          headers: {
            'Authorization': fontneApiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            target: phoneNumber,
            message: message,
            delay: 0
          })
        });
      } else {
        console.log(`[TEST MODE] OTP ${otp} untuk ${phoneNumber}`);
      }
    } catch (error) {
      console.log(`OTP generated (Fonnte send error): ${otp}`);
    }

    return res.status(200).json({
      success: true,
      message: 'OTP telah dikirim ke WhatsApp',
      otp: fontneApiKey === 'test_api_key' ? otp : '***' // Show OTP only in test mode
    });

  } catch (error) {
    console.error('Send OTP error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal mengirim OTP: ' + error.message
    });
  }
}
