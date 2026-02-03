export default async function handler(req, res) {
  const city = "João Pessoa,BR";
  const apiKey = process.env.OPENWEATHER_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric&lang=pt_br`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: "Erro ao buscar clima" });
  }
}