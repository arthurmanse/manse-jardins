export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    keyExists: !!process.env.OPENWEATHER_KEY
  });
}