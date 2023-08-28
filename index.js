const moneyInfo = document.getElementById("money-Info");
const inputTop = document.getElementById("top");
const inputBottom = document.getElementById("bottom");
const topSelect = document.getElementById("top-select");
const dat = document.querySelector(".data");
const loader = document.querySelector(".loader-div");

//Get api
const getApi = async () => {
  const host = `http://cbu.uz/uzc/arkhiv-kursov-valyut/json/`;
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
  //console.log(data)
  data.forEach((country) => {
    const sum = country.Rate;
    const kun = country.Date;
    const Ccy = country.Ccy;
    const dif = country.Diff;
    if (topSelect.value == Ccy) {
      const res = new Intl.NumberFormat("uz-UZ").format(sum);
      moneyInfo.innerHTML = `1 ${Ccy} ${res} so'm`;
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
        const result = inputTop.value * sum;
        const res = new Intl.NumberFormat("uz-UZ").format(result);
        inputBottom.value = `${res} so'm`;
      });
    }
  });
};
topSelect.addEventListener("click", () => {
  moneyInfo.innerHTML = `<i class="fa fa-spinner"></i> Pul birligini tanlang!`;
  dat.innerHTML = `<i class="fa fa-spinner"></i>`;
});
gettop();
