import "./style.css";

document.addEventListener("DOMContentLoaded", function () {
  const brothsContainer = document.getElementById("broths-container");
  const proteinsContainer = document.getElementById("proteins-container");
  const submitBtn = document.getElementById("submit-btn-my-order");

  brothsContainer.classList.add("container-broths");
  proteinsContainer.classList.add("container-proteins");

  const brothsUrl = "https://api.tech.redventures.com.br/broths";
  const proteinsUrl = "https://api.tech.redventures.com.br/proteins";
  const ordersUrl = "https://api.tech.redventures.com.br/orders";

  async function loadItems(url, container) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-api-key": "ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao carregar os dados");
      }

      const data = await response.json();
      data.forEach((item) => {
        const price = item.price;
        const name = item.name;
        const description = item.description;
        const imgurlInactive = item.imageInactive;
        const imgurlActive = item.imageActive;

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");
        itemDiv.dataset.itemId = item.id;

        const imgBroths = document.createElement("img");
        imgBroths.classList.add("imgBroths-img");
        imgBroths.src = imgurlInactive;
        imgBroths.dataset.imgActive = imgurlActive;
        imgBroths.dataset.imgInactive = imgurlInactive;

        const itemName = document.createElement("div");
        itemName.textContent = name;
        itemName.classList.add("item-name");

        const itemDescription = document.createElement("div");
        itemDescription.textContent = description;
        itemDescription.classList.add("item-description");

        const itemPrice = document.createElement("div");
        itemPrice.textContent = `US$ ${price}`;
        itemPrice.classList.add("item-price");

        itemDiv.appendChild(imgBroths);
        itemDiv.appendChild(itemName);
        itemDiv.appendChild(itemDescription);
        itemDiv.appendChild(itemPrice);
        console.log(description);
        container.appendChild(itemDiv);
      });
    } catch (error) {
      console.error("Ocorreu um erro:", error);
    }
  }

  loadItems(brothsUrl, brothsContainer);

  loadItems(proteinsUrl, proteinsContainer);

  function deselectAllItems(container) {
    const items = container.querySelectorAll(".item");
    items.forEach((item) => item.classList.remove("selected"));
  }

  document.addEventListener("click", function (event) {
    const clickedItem = event.target.closest(".item");

    if (!clickedItem) return;

    const imgElement = clickedItem.querySelector("img");
    const imgurlInactive = imgElement.src;
    const imgurlActive = imgElement.dataset.imgActive;

    if (imgurlInactive === imgElement.dataset.imgInactive) {
      imgElement.src = imgurlActive;
    } else {
      imgElement.src = imgElement.dataset.imgInactive;
    }

    const container = clickedItem.parentElement;
    deselectAllItems(container);
    clickedItem.classList.add("selected");

    console.log("Item selecionado:", clickedItem);
  });

  submitBtn.addEventListener("click", async function () {
    const selectedBroth = brothsContainer.querySelector(".selected");
    const selectedProtein = proteinsContainer.querySelector(".selected");

    if (!selectedBroth || !selectedProtein) {
      alert("Selecione um item de cada lista.");
      return;
    }

    const brothId = selectedBroth.dataset.itemId;
    const proteinId = selectedProtein.dataset.itemId;

    const orderData = {
      brothId: brothId,
      proteinId: proteinId,
    };

    console.log("Dados para enviar:", orderData);

    try {
      const response = await fetch(ordersUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar a ordem");
      }

      const result = await response.json();
      console.log("Ordem enviada com sucesso:", result);

      sessionStorage.setItem("orderResult", JSON.stringify(result));

      window.location.href = "sucess.html";
    } catch (error) {
      console.error("Ocorreu um erro:", error);
    }
  });
});
