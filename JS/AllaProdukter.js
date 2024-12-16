/* 
Har strukturerat om filerna i moduler så vi bara kan importera vissa functioner till andra sidor,
mest för att träna lite på att dela upp filerna */

import { getData } from './api.js';
import { addToCart } from './addedproducts.js';

const produktLista = document.getElementById("produkt-list")
async function renderProdukter() {
    const produkt = await getData(`http://ecommerce-api-penstore.vercel.app/products`)

    if (!produkt) {
        throw new Error("Cannot render right now!")
        return

    }

    produkt.forEach((item) => {

        const produktElement = document.createElement("div")
        produktElement.className = "produktdiv"

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
        `

        produktLista.appendChild(produktElement)


    });
}

renderProdukter()





