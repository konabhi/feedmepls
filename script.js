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
      <p class="location">📍 ${cart.area}</p>

      ${cart.freeDeliveryAbove
                ? `<span class="free-delivery">
               FREE DELIVERY ON ₹${cart.freeDeliveryAbove}+
             </span>`
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

// ===== Map Integration (Leaflet) =====
// Locations (includes highlighted location resolved from the Google Maps shortlink)
const mapLocations = [
    { name: "Cups Cafe", coords: [26.8365, 75.8150] },
    { name: "Sattu Chai", coords: [26.8350, 75.8180] },
    {
        name: "The Cups Cafe (Google Maps)",
        coords: [26.7895452, 75.8402143],
        mapsUrl: "https://www.google.com/maps/place/The+Cups+Cafe/@26.78955,75.8376394,17z/data=!3m1!4b1!4m6!3m5!1s0x396dc9a7a632df05:0x9b147675a9fd078d!8m2!3d26.7895452!4d75.8402143",
        highlighted: true
    }
];

function initMap() {
    if (!window.L) {
        console.warn('Leaflet library not loaded. Map will not initialize.');
        return;
    }

    const map = L.map('map', { zoomControl: true }).setView(mapLocations[0].coords, 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const markers = [];

    mapLocations.forEach(loc => {
        if (loc.highlighted) {
            const marker = L.marker(loc.coords).addTo(map).bindPopup(`<strong>${loc.name}</strong><br><a href="${loc.mapsUrl}" target="_blank">Open in Google Maps</a>`);
            L.circle(loc.coords, { radius: 80, color: '#ff4d4f', fillColor: '#ffcccc', fillOpacity: 0.25 }).addTo(map);
            markers.push(marker);
            // Open highlighted popup by default
            marker.openPopup();
        } else {
            const marker = L.marker(loc.coords).addTo(map).bindPopup(`<strong>${loc.name}</strong>`);
            markers.push(marker);
        }
    });

    if (markers.length) {
        const group = L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.25));
    }
}

// Initialize map once DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMap);
} else {
    initMap();
}
