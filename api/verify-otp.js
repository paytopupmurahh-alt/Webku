// Simple OTP store (shared with send-otp)
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
    const { otp } = req.body;

    if (!otp) {
      return res.status(400).json({
        success: false,
        message: 'OTP harus diisi'
      });
    }

    // Check if OTP exists
    if (!otpStore.code) {
      return res.status(400).json({
        success: false,
        message: 'Silakan minta OTP terlebih dahulu'
      });
    }

    // Check OTP expiry (10 menit)
    const expiryTime = 10 * 60 * 1000; // 10 minutes
    if (Date.now() - otpStore.createdAt > expiryTime) {
      otpStore.code = null;
      return res.status(400).json({
        success: false,
        message: 'OTP telah kadaluarsa. Silakan minta OTP baru'
      });
    }

    // Check attempts (max 3 attempts)
    otpStore.attempts += 1;
    if (otpStore.attempts > 3) {
      otpStore.code = null;
      otpStore.attempts = 0;
      return res.status(400).json({
        success: false,
        message: 'Terlalu banyak percobaan. Silakan minta OTP baru'
      });
    }

    // Verify OTP
    if (otp.toString() === otpStore.code.toString()) {
      const token = Buffer.from(`admin:${Date.now()}`).toString('base64');
      otpStore.code = null;
      otpStore.attempts = 0;

      return res.status(200).json({
        success: true,
        message: 'OTP verifikasi berhasil!',
        token: token
      });
    } else {
      return res.status(400).json({
        success: false,
        message: `OTP salah. Sisa percobaan: ${3 - otpStore.attempts}`
      });
    }

  } catch (error) {
    console.error('Verify OTP error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal verifikasi OTP: ' + error.message
    });
  }
}
