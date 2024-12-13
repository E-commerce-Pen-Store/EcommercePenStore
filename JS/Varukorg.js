
import { varukorg } from './addedproducts.js'; 
import { getData } from './api.js'; 

async function sumProducts() {
    const productCounts = varukorg.reduce((acc, produktId) => {
        acc[produktId] = (acc[produktId] || 0) + 1;
        return acc;
    }, {});

    const kassalista = document.getElementById("Produkt-kassalista");
    kassalista.innerHTML = `
                <tr>
                    <th>Produkt</th>
                    <th>Antal</th>
                    <th>Pris</th>
                </tr>`;

    for (const produktId of Object.keys(productCounts)) {
        try {
            const data = await getData(`https://ecommerce-api-penstore.vercel.app/products/${produktId}`);
            console.log(data);

            const totalPrice = (parseFloat(data.price.$numberDecimal) * productCounts[produktId]).toFixed(2);

            kassalista.innerHTML += `
                <tr id="row-${produktId}">
                    <td>${data.name}</td>
                    <td>
                        <input type="number" value="${productCounts[produktId]}" min="0" data-id="${produktId}" class="Productcount" oninput="updateQuantity('${produktId}', this.value)">
                    </td>
                    <td class="unit-price">${data.price.$numberDecimal}</td>
                    <td class="total-price">${totalPrice}</td>
                </tr>
            `;
        } catch (error) {
            console.error(`Fel vid hämtning av produkt ${produktId}:`, error);
        }
    }
}

function updateQuantity(produktId, newQuantity) {
    newQuantity = parseInt(newQuantity);
    const currentCount = varukorg.filter(id => id === produktId).length;
    const difference = newQuantity - currentCount;
    console.log(`Uppdaterar varukorgen för produkt ID: ${produktId} med skillnad: ${difference}`);

    if (difference > 0) {
        for (let i = 0; i < difference; i++) {
            varukorg.push(produktId);
        }
    } else if (difference < 0) {
        for (let i = 0; i < Math.abs(difference); i++) {
            const index = varukorg.indexOf(produktId);
            if (index !== -1) {
                varukorg.splice(index, 1);
            }
        }
    }

    localStorage.setItem('varukorg', JSON.stringify(varukorg));

    const row = document.getElementById(`row-${produktId}`);
    if (row) {
        if (newQuantity === 0) {
            row.remove();
        } else {
            const unitPriceElement = row.querySelector('.unit-price');
            const totalPriceElement = row.querySelector('.total-price');
            if (unitPriceElement && totalPriceElement) {
                const unitPrice = parseFloat(unitPriceElement.textContent.replace(' $', '')); 
                const totalPrice = (unitPrice * newQuantity).toFixed(2);
                totalPriceElement.textContent = `${totalPrice} $`;
            } else {
                console.error("Kan inte hitta unit-price eller total-price element");
            }
        }
    } else {
        console.error("Kan inte hitta row element");
    }
}

window.updateQuantity = updateQuantity;

sumProducts();
