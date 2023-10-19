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
