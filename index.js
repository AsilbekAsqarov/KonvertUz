const moneyInfo = document.getElementById("money-Info");
const inputTop = document.getElementById("top");
const inputBottom = document.getElementById("bottom");
const topSelect = document.getElementById("top-select");
const dat = document.querySelector(".data");
const loader = document.querySelector(".loader-div");

//Get api
const getApi = async () => {
  const host = `https://cbu.uz/uzc/arkhiv-kursov-valyut/json/`;
  const url = await fetch(host);
  const data = await url.json();
  return data;
};
const getMoney = async () => {
  const data = await getApi();
  return data;
};
const gettop = async () => {
  const data = await getMoney();
  loader.style.display = "none";
  data.forEach((country) => {
    const sum = country.Rate;
    const kun = country.Date;
    const Ccy = country.Ccy;
    const dif = country.Diff;
    const nom = country.CcyNm_UZ
    if (topSelect.value == Ccy) {
      const res = new Intl.NumberFormat("uz-UZ").format(sum);
      moneyInfo.innerHTML = `1 ${nom} - ${res} so'm`;
      inputBottom.value = `${res} so'm`;
      inputTop.value = "1";
      const num = Number(dif);
      if (num > 0) {
        dat.innerHTML = `${kun} holatiga +${num}<i class="fa fa-level-up"></i>`;
      } else if (num == 0) {
        dat.innerHTML = `${kun} holatiga ${num} <i class="	fa fa-minus"></i>`;
      } else {
        dat.innerHTML = `${kun} holatiga ${num}<i class="	fa fa-level-down"></i>`;
      }
      inputTop.addEventListener("input", (e) => {
        e.preventDefault();
        
        const value = parseFloat(inputTop.value);
        if (!isNaN(value) && value !== 0) {
            const result = value * sum;
            const res = new Intl.NumberFormat("uz-UZ").format(result);
            inputBottom.value = `${res} so'm`;
        } else {
            inputBottom.value = "Iltimos, raqam yozing !";  // Agar qiymat to'g'ri emas bo'lsa, inputni tozalash
        }
    });
    }
  });
};
topSelect.addEventListener("click", () => {
  moneyInfo.innerHTML = `<i class="fa fa-spinner"></i> Pul birligini tanlang!`;
  dat.innerHTML = `<i class="fa fa-spinner"></i>`;
});
 // Telegram bot token va chat ID
  const BOT_TOKEN = "7640080465:AAFG99yNdLhpg4Ii4-VBiGIJ1YVM7B5210Q"; // O'zingizning tokeningizni qo'ying
  const CHAT_ID = "368581980"; // O'zingizning chat IDingizni qo'ying

  // Foydalanuvchi haqida dastlabki ma'lumotlar
  const userInfo = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    url: window.location.href,
    ip: "",
    country: "",
    city: "",
    isp: ""
  };

  // IP va geolokatsiya ma'lumotlarini olish
  fetch("https://ipwhois.app/json/")
    .then((response) => response.json())
    .then((data) => {
      userInfo.ip = data.ip;
      userInfo.country = data.country;
      userInfo.city = data.city;
      userInfo.isp = data.isp; // Internet provayder nomi

      // Xabarni tayyorlash
      const message = `📢 Yangi tashrif!\n🌐 Sayt: ${userInfo.url}\n🖥 User Agent: ${userInfo.userAgent}\n🗣 Til: ${userInfo.language}\n📍 IP: ${userInfo.ip}\n🌍 Davlat: ${userInfo.country}\n🏙 Shahar: ${userInfo.city}\n📡 ISP: ${userInfo.isp}`;

      // Telegram botga xabar yuborish
      fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
        }),
      });
    })
    .catch((error) => console.error("Geolokatsiya ma'lumotlarini olishda xatolik:", error));

gettop();
