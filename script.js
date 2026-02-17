const carts = [
    {
        name: "Cups Cafe",
        area: "Behind GIT College, Sitapura, Jaipur",
        whatsapp: "917300070047"
    },
    {
        name: "Sattu Chai",
        area: "Behind GIT College, Sitapura, Jaipur",
        whatsapp: "918888888888"
    }
];

const cartList = document.getElementById("cart-list");
const areaFilter = document.getElementById("area-filter");

function renderCarts(list) {
    cartList.innerHTML = "";

    list.forEach(cart => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
      <h2>${cart.name}</h2>
      <p>📍 ${cart.area}</p>

      <a 
        href="https://wa.me/${cart.whatsapp}?text=Hi%20I%20want%20to%20order"
        target="_blank"
        class="btn"
      >
        Order on WhatsApp
      </a>
    `;

        cartList.appendChild(div);
    });
}

// Initial render
renderCarts(carts);

// Area filter only
areaFilter.addEventListener("change", () => {
    const selectedArea = areaFilter.value;

    if (selectedArea === "all") {
        renderCarts(carts);
    } else {
        const filteredCarts = carts.filter(
            cart => cart.area === selectedArea
        );
        renderCarts(filteredCarts);
    }
});
