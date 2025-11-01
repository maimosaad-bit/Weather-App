const cityInput = document.getElementById("city");
const btn = document.getElementById("getWeather");
const output = document.getElementById("output");

btn.addEventListener("click", getWeather);

async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    output.innerHTML = "⚠️ من فضلك اكتب اسم المدينة.";
    return;
  }

  output.innerHTML = "<p class='loading'>⏳ جاري جلب الطقس...</p>";

  setTimeout(async () => {
    try {
      const apiKey = "aa81435218ecb23b6462b1b607445aa0"; 
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ar`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("❌ لم يتم العثور على المدينة");

      const data = await response.json();

      output.innerHTML = `
        <h2>🌍 ${data.name}</h2>
        <p>الطقس: ${data.weather[0].description}</p>
        <p>درجة الحرارة: ${data.main.temp}°C</p>
        <p>الرطوبة: ${data.main.humidity}%</p>
      `;
    } catch (error) {
      output.innerHTML = `<p>${error.message}</p>`;
    }
  }, 1000);
}
