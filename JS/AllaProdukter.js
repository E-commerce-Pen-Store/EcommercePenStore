/* 
Flyttade url in funktionen så den blir lite mer återanvändbar
const url = "http://ecommerce-api-penstore.vercel.app/products" */

import { getData } from './api.js';
               
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
                <span class="pris">${item.price.$numberDecimal}$</span>
                <a class="visaVara-knapp" href="">Visa Penna</a>
                <a class="Kop-knapp" href="" onclick="Addtocart('${item.id}')">Köp</a>  
            </div>
        </div>
        `

        produktLista.appendChild(produktElement)


    });
}

renderProdukter()

function Addtocart(produktId){
    const produkt = hittaProduktMedId(produktId);

}

