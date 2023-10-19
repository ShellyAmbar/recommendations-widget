// const data = [
//   {
//     description:
//       "10万円リゾートから100万円マンションまで\u2026粗⼤ゴミ化する負動産",
//     type: "video",
//     name: "10万円リゾートから100万円マンションまで\u2026粗⼤ゴミ化する負動産（神⽥敏晶） - Yahoo!ニュース",
//     created: "Wed, 04 Feb 2015 21:46:45 UTC",
//     branding: "Byline",
//     duration: "0",
//     views: "0",
//     thumbnail: [
//       {
//         url: "http://images.taboola.com/taboola/image/fetch/f_jpg,q_aut205-00042811-roupeiro-000-4-view.jpg",
//       },
//     ],
//     categories: ["jp"],
//     id: "~~V1~~-2093862212721107661~~fGI2x9luxxy9zfPFIseE7y",
//     origin: "sponsored",
//     url: "http://api.taboola.com/1.0/json/taboola-templates/recommendations.notify-click?app.type",
//   },
//   {
//     description:
//       "Jsou starší, jsou lehce strhanější, ale pořád mají síly nshow.",
//     type: "video",
//     name: "Třetí řada The Grand Tour se blíží. Nabízí se otázka: Bude pro slavné moderátory poslední? - Autoweb.cz",
//     created: "Tue, 04 Dec 2018 13:00:42 UTC",
//     branding: "AutoWeb",
//     duration: "0",
//     views: "0",
//     thumbnail: [
//       {
//         url: "http://images.taboola.com/taboola/image/fetch/f_jpg,q_auto,c_fill,g_faces:auto,e_sh.jpg",
//         width: "1366",
//         height: "768",
//       },
//     ],
//     categories: ["cs"],
//     id: "~~V1~~-8116559384140964622~~SiBYuwqDKrlgNMDpqRY8i0a1dSVl0pyr6_H1DOSlHPk-_ybC02U0",
//     origin: "sponsored",
//     url: "http://api.taboola.com/1.0/json/taboola-templates/recommendations.notify-click?app.type=desAZ2H_5eHMQ",
//   },
//   {
//     type: "video",
//     name: "Forge Of Empires",
//     created: "Mon, 04 Feb 2019 14:05:34 UTC",
//     branding: "Forge of Empires",
//     duration: "0",
//     views: "0",
//     thumbnail: [
//       {
//         url: "http://images.taboola.com/taboola/image/fetch/f_jpg,q_auto,c_fill,g_faces:auto,e_res_2000x600.jpg",
//         width: "2000",
//         height: "600",
//       },
//     ],
//     categories: ["cs"],
//     id: "~~V1~~-783622115126593357~~7vYoMYWzn0WqFMnm5FJSQ4WOrn6D4oltw0D6pdyQZ2MAnsTPHjyPCJlE4JDOSlHPk-_ybC02U0",
//     origin: "sponsored",
//     url: "http://api.taboola.com/1.0/json/taboola-templates/recommendations.notify-click?akey=f9040ab1b9c80285",
//   },
//   {
//     description:
//       "先⽇時計好きの⾼校からの同期と話をしたところ、Apple Watchについて「必ずしも安いとは思わず、むしろハイエンドモ",
//     type: "video",
//     name: "Apple Watchは安すぎる？（松村太郎） - Yahoo!ニュース",
//     created: "Wed, 17 Dec 2014 06:46:12 UTC",
//     branding: "Byline",
//     duration: "0",
//     views: "0",
//     thumbnail: [
//       {
//         url: "http://images.taboola.com/taboola/image/fetch/f_jpg,q_auto,c_fill,g_faces:auto,e_sharpen/http://rpr.c",
//       },
//     ],
//     categories: ["jp"],
//     id: "~~V1~~-959190556378027013~~fGI2x9luxxy9zfPFsdcYKz8s6n8AhGh_xv3sfT0DlFyI7IKSpPQrPrDDjDTd3W",
//     origin: "sponsored",
//     url: "http://api.taboola.com/1.0/json/taboola-templates/recommendations.notify-click?app.type=desktop&app.apikey",
//   },
// ];

function fetchRecommendations() {
  const publisherId = "taboola-templates";
  const appType = "desktop";
  const appApikey = "f9040ab1b9c802857aa783c469d0e0ff7e7366e4";
  const sourceId = "123456";

  return fetch(
    `https://api.taboola.com/1.0/json/${publisherId}/recommendations.get?app.type=${appType}&app.apikey=${appApikey}&count=4&source.type=video&source.id=${sourceId}&source.url=${"http://www.site.com/videos/214321562187.html"}`
  )
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      return json; // Parse the JSON response
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      throw error;
    });
}

const displatOrganicContent = (data) => {
  const content = document.getElementById("content-organic");
  content.className = "content-column";
  const titleSection = document.createElement("p");
  titleSection.textContent = "Recent";
  titleSection.className = "titleSection";
  const saperatorLine = document.createElement("div");
  saperatorLine.className = "saperatorLine";

  const organic = data.filter((item) => item.branding === null);
  if (organic.length > 0) {
    conteiner.appendChild(titleSection);
    conteiner.appendChild(saperatorLine);
    conteiner.appendChild(content);
  }

  organic.forEach((item) => {
    const img = document.createElement("img");
    img.src = item.thumbnail[0].url;

    img.alt = item.name;
    img.className = "img-small";

    const nameText = document.createElement("p");
    nameText.textContent = item.name;
    nameText.className = "title";

    const wrapper = document.createElement("a");

    wrapper.appendChild(img);
    wrapper.appendChild(nameText);
    wrapper.className = "wrapper-horizontal";

    wrapper.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("click", item.url);
      const url = item.url;
      if (item.branding) {
        window.open(url, "_blank");
      } else {
        window.location.href = url;
      }
    });

    content.appendChild(wrapper);
  });
};

const displatSponseredContent = (data) => {
  const content = document.getElementById("content-sponsered");
  content.className = "content";
  const titleSection = document.createElement("p");
  titleSection.textContent = "Recomended for you";
  titleSection.className = "titleSection";
  const saperatorLine = document.createElement("div");
  saperatorLine.className = "saperatorLine";

  const sponserd = data.filter((item) => item.origin === "sponsored");
  if (sponserd.length > 0) {
    conteiner.appendChild(titleSection);
    conteiner.appendChild(saperatorLine);
    conteiner.appendChild(content);
  }

  sponserd.forEach((item) => {
    const img = document.createElement("img");
    img.src = item.thumbnail[0].url;

    img.alt = item.name;
    img.className = "img";

    const nameText = document.createElement("p");
    nameText.textContent = item.name;
    nameText.className = "title";

    const wrapper = document.createElement("a");

    wrapper.appendChild(img);
    wrapper.appendChild(nameText);
    wrapper.className = "wrapper";

    wrapper.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("click", item.url);
      const url = item.url;
      if (item.branding) {
        window.open(url, "_blank");
      } else {
        window.location.href = url;
      }
    });

    content.appendChild(wrapper);
  });
};

const displayDateFromTaboola = async () => {
  try {
    const dataJson = await fetchRecommendations();
    const data = dataJson.list;
    console.log("list", data);
    const conteiner = document.getElementById("conteiner");
    conteiner.className = "conteiner";

    displatSponseredContent(data);
    displatOrganicContent(data);
  } catch (err) {
    console.log(err);
  }
};

displayDateFromTaboola();

module.exports = {
  fetchRecommendations,
};
