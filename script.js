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
      <p class="location">
        <i data-lucide="map-pin" class="location-icon"></i>
        ${cart.area}
      </p>

      ${cart.freeDeliveryAbove
                ? `<span class="free-delivery">
               <i data-lucide="truck" class="delivery-icon"></i>
               FREE DELIVERY ON ₹${cart.freeDeliveryAbove}+
             </span>`
                : ""
            }

      ${cart.menuImage
                ? `
            <button class="menu-btn">
              <i data-lucide="eye" class="menu-icon"></i>
              View Menu
            </button>
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
        <div class="whatsapp-badge">
          <i data-lucide="message-circle" class="whatsapp-icon"></i>
        </div>
        <span class="btn-text">Order Now on WhatsApp</span>
        <i data-lucide="arrow-right" class="arrow-icon"></i>
      </a>
    `;

        cartList.appendChild(card);

        // Menu toggle
        const menuBtn = card.querySelector(".menu-btn");
        const menuImg = card.querySelector(".menu-img");

        if (menuBtn && menuImg) {
            menuImg.style.display = "none";

            menuBtn.addEventListener("click", () => {
                const open = menuImg.style.display === "block";
                menuImg.style.display = open ? "none" : "block";
                menuBtn.textContent = open ? "View Menu" : "Hide Menu";
            });
        }
    });
}

// Initial render
renderCarts(carts);

// Area filter
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

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function () {
    if (window.lucide) {
        lucide.createIcons();
    }
});
