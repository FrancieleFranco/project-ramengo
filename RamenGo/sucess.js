document.addEventListener("DOMContentLoaded", function () {
  const orderResult = JSON.parse(sessionStorage.getItem("orderResult"));

  const descriptionContainer = document.getElementById("miso-chasu");
  const imgContainer = document.getElementById("order-img");

  async function loadItems(orderResult, container) {
    const itemDivSucess = document.createElement("div");

    const descriptionSucsss = orderResult.description;
    const imgurlActiveSucess = orderResult.image;

    const imageSucess = document.createElement("img");
    imageSucess.classList.add("imageSucess");
    imageSucess.src = imgurlActiveSucess;

    const itemDescriptionSucess = document.createElement("h1");
    itemDescriptionSucess.textContent = descriptionSucsss;
    itemDescriptionSucess.classList.add("item-description-sucess");

    itemDivSucess.appendChild(itemDescriptionSucess);
    itemDivSucess.appendChild(imageSucess);
    container.appendChild(itemDivSucess);
  }

  loadItems(orderResult, descriptionContainer, imgContainer);
});
