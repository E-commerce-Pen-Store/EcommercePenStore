import { getData } from './api.js';
import { addToCart, cartCount } from './addedproducts.js';

const produktLista = document.getElementById("produkt-list");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function renderProdukter(filterName = "") {
    const produkter = await getData(`http://ecommerce-api-penstore.vercel.app/products`);

    if (!produkter) {
        throw new Error("Cannot render right now!");
        return;
    }

    produktLista.innerHTML = "";

    produkter.forEach((item) => {
        if (filterName && !item.name.toLowerCase().includes(filterName.toLowerCase())) {
            return;
        }

        const produktElement = document.createElement("div");
        produktElement.className = "produktdiv";

        produktElement.innerHTML = `
        <div class="produktItem">
            <img class="produktBild" src="${item.image}" alt="Produkt Bild">
            <div class="itemDesc">
                <h2 class="produktNamn">${item.name}</h2>
                <span class="pris">$${item.price.$numberDecimal}</span>

                 <a class="visaVara-knapp" href="/HTML/produktSida.HTML?id=${item._id}">Visa Penna</a> 
                <a class="Kop-knapp visaVara-knapp" href="#" onclick="addToCart('${item._id}', event)">Köp</a> 

            </div>
        </div>
        `;

        produktLista.appendChild(produktElement);
    });
}

searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();
    renderProdukter(searchTerm);
});

renderProdukter();
