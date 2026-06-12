const carts = [
    {
        name: "Cups Cafe",
        area: "Behind GIT College, Sitapura, Jaipur",
        whatsapp: "917300070047",
        freeDeliveryAbove: 125,
        menuImage: "cups-menu.jpg"
    },
    {
        name: "Sattu Chai",
        area: "Behind GIT College, Sitapura, Jaipur",
        whatsapp: "918888888888"
    },
      {
        name: "Sattu Chai",
        area: "Behind GIT College, Sitapura, Jaipur",
        whatsapp: "918888888888"
    },
    {
        name: "China Wok",
        area: "capital highstreet,jagatpura, Jaipur",
        whatsapp: "919999999999",
        freeDeliveryAbove: 199,
        menuImage: "china-wok-menu.jpg"
    }
];

const cartList = document.getElementById("cart-list");
const areaFilter = document.getElementById("area-filter");

function renderCarts(list) {
    cartList.innerHTML = "";

    list.forEach(cart => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h2>${cart.name}</h2>
            <p class="location">📍 ${cart.area}</p>

            ${cart.freeDeliveryAbove
                ? `
                    <span class="free-delivery">
                        FREE DELIVERY ON ₹${cart.freeDeliveryAbove}+
                    </span>
                    `
                : ""
            }

            ${cart.menuImage
                ? `
                    <button class="menu-btn">View Menu</button>
                    <div class="menu-img">
                        <img src="${cart.menuImage}" alt="${cart.name} Menu">
                    </div>
                    `
                : ""
            }

            <a
                href="https://wa.me/${cart.whatsapp}?text=Hi%20I%20want%20to%20order"
                target="_blank"
                class="btn"
            >
                Order on WhatsApp
            </a>
        `;

        cartList.appendChild(card);

        const menuBtn = card.querySelector(".menu-btn");
        const menuImg = card.querySelector(".menu-img");

        if (menuBtn && menuImg) {
            menuImg.style.display = "none";

            menuBtn.addEventListener("click", () => {
                const open = menuImg.style.display === "block";

                menuImg.style.display = open ? "none" : "block";
                menuBtn.textContent = open
                    ? "View Menu"
                    : "Hide Menu";
            });
        }
    });
}

renderCarts(carts);

areaFilter.addEventListener("change", () => {
    const selectedArea = areaFilter.value;

    if (selectedArea === "all") {
        renderCarts(carts);
    } else {
        renderCarts(
            carts.filter(cart => cart.area === selectedArea)
        );
    }
});
