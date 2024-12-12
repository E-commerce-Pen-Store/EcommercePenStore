const produktLista = document.getElementById("produkt-list")

const url = "http://ecommerce-api-penstore.vercel.app/products"

async function getData() {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`${response.status} Something went wrong, couldn't fetch data!`)
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.error(error)
    }
}


async function renderProdukter() {
    const produkt = await getData()

    if (!produkt) {
        throw new Error("Cannot render right now!")
        return

    }

    produkt.forEach((item) => {

        const produktElement = document.createElement("div")
        produktElement.className = "produktdiv"

        produktElement.innerHTML = `
        <div class="produktItem">
            <img src="${item.image}" alt="Produkt Bild">
            <div class="itemDesc">
                <h2>${item.name}</h2>
                <span>${item.price.$numberDecimal}$</span>
                <a href="">Visa Vara</a> 
            </div>
        </div>
        `

        produktLista.appendChild(produktElement)


    });
}

renderProdukter()