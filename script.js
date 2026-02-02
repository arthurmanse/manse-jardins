window.onload = function() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
};

async function loadWeather() {
    try {
  
// DIA DA SEMANA

  const dias = [
    "domingo",
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado"
  ];

  const hoje = new Date();

  document.getElementById("diaSemana").textContent = dias[hoje.getDay()];

// TEMPERATURA

  const API_KEY = "ff54cdc13d1bf57ebe1d84b71cb8b896";
  const CITY = "João Pessoa,BR";

  const url = 
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(CITY)}&appid=${API_KEY}&units=metric&lang=pt_br`;

  const response = await fetch(url);
  const data = await response.json();

  const temp = Math.round(data.main.temp);
  document.getElementById("tempClima").textContent = `${temp} °C`;

  // ICONES

  const iconClima = {
    Clear: {
      day: "./img/clima/sun.png",
      night: "./img/clima/moon.png"
    },
    Clouds: {
      day: "./img/clima/dia-nublado.png",
      night: "./img/clima/noite-nublado.png"
    },
    Rain: {
      day: "./img/clima/chuva.png",
      night: "./img/clima/chuva.png"
    },
    Storm: {
      day: "./img/clima/storm.png",
      night: "./img/clima/storm.png"
    }
  };

  const agora = data.dt;
  const nascerSol = data.sys.sunrise;
  const porSol = data.sys.sunset;

  const isDay = agora >= nascerSol && agora < porSol;
  const condicao = data.weather[0].main;

  if (!iconClima[condicao]) {
  condicao = "Clouds"; 
  }

  const icon = isDay ? iconClima[condicao].day : iconClima[condicao].night;

  document.getElementById("imagemClima").src = icon;
  console.log(condicao);

  } catch (error) {
      console.error("Erro ao carregar dados do clima:", error);
  }
};


loadWeather();
setInterval(loadWeather, 300000);

// CONTEÚDO:

const headers = document.querySelectorAll('.expande');
const fundo = document.querySelector('.fundo');
const setas = document.querySelectorAll('.expansivel');
const links = document.querySelectorAll('.expande a');

// 1. Fecha ao clicar na seta
setas.forEach(seta => {
  seta.addEventListener('click', e => {
    e.stopPropagation();
    fundo.focus();
  });
});


document.querySelectorAll('.expande a').forEach(link => {
  link.addEventListener('mousedown', e => {
    e.preventDefault();
    window.open(link.href, link.target || '_self');
  });
});