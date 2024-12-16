import { addToCart } from './addedproducts.js';

const produktSektion = document.getElementById("produkt");
const params = new URLSearchParams(window.location.search)
const productId = params.get("id")
const url = `http://ecommerce-api-penstore.vercel.app/products/${productId}`


console.log(productId)

async function getProdukt() {
    try {

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`${response.status}: Something went wrong when trying to fetch data`)
        }

        const data = await response.json()


        const description = await data.description.slice(0, 309) + `... Read more`

        console.log(description)

        produktSektion.innerHTML = `
        <img src="${data.image}" alt="Produkt bild" id="produktBild">
            <div id="produktInfo">
                <h2 id="produktNamn">${data.name}</h2>
                <span id="pris">${data.price.$numberDecimal}$</span>
                <p id="produktBeskrivning">${description}</p>
                <a class="CTA" href="" onclick="addToCart('${productId}', event)">Add To Cart</a>             
            </div>
        `



    } catch (error) {

    }
}

getProdukt()