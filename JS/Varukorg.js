
import { varukorg } from './addedproducts.js'; 
import { getData } from './api.js'; 
console.log(varukorg)
async function sumProducts() {
    const productCounts = varukorg.reduce((acc, produktId) => {
        acc[produktId] = (acc[produktId] || 0) + 1;
        return acc;
    }, {});

    const kassalista = document.getElementById("Produkt-kassalista");
    const Totalcheckout = document.getElementById("produkt-total");

    kassalista.innerHTML = `
    <tr>
        <th>Produkt</th>
        <th>Antal</th>
        <th>Pris st</th>
        <th>Totalt</th>
    </tr>
`;

let rows = '';
let totalcheckoutPrice = 0;

for (const produktId of Object.keys(productCounts)) {
    try {
        const data = await getData(`https://ecommerce-api-penstore.vercel.app/products/${produktId}`);
        const totalPrice = (parseFloat(data.price.$numberDecimal) * productCounts[produktId]).toFixed(2);
        totalcheckoutPrice += parseFloat(totalPrice);

        rows += `
            <tr id="row-${produktId}">
                <td>${data.name}</td>
                <td>
                    <input type="number" value="${productCounts[produktId]}" min="0" data-id="${produktId}" class="Productcount" oninput="updateQuantity('${produktId}', this.value)">
                </td>
                <td class="unit-price">${data.price.$numberDecimal} kr</td>
                <td class="total-price">${totalPrice} kr</td>
                <td><button type="button" onclick="deleteProduct('${produktId}')">Ta bort</button></td>
            </tr>
        `;
    } catch (error) {
        console.error(`Fel vid hämtning av produkt ${produktId}:`, error);
    }
}

kassalista.innerHTML += rows;

Totalcheckout.innerHTML = `
    <tr>
        <td colspan="3">Total:</td>
        <td class="grand-total"><strong>${totalcheckoutPrice.toFixed(2)} kr</strong></td>
    </tr>
`;

}

function updateQuantity(produktId, newQuantity) {
    newQuantity = parseInt(newQuantity);
    const currentCount = varukorg.filter(id => id === produktId).length;
    const difference = newQuantity - currentCount;

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
                const unitPrice = parseFloat(unitPriceElement.textContent.replace(' $', 'kr')); 
                const totalPrice = (unitPrice * newQuantity).toFixed(2);
                totalPriceElement.textContent = `${totalPrice} kr`;
            } else {
                console.error("Kan inte hitta unit-price eller total-price element");
            }
        }
    } else {
        console.error("Kan inte hitta row element");
    }
    updateGrandTotal();
}

function updateGrandTotal() { 
    const totalPrices = Array.from(document.querySelectorAll('.total-price')).map(el => parseFloat(el.textContent.replace(' $', '')));
     const grandTotal = totalPrices.reduce((sum, price) => sum + price, 0); const grandTotalElement = document.querySelector('.grand-total');
      if (grandTotalElement) { grandTotalElement.textContent = `${grandTotal.toFixed(2)} kr`; } }

      function deleteProduct(produktId) {
        for (let i = varukorg.length - 1; i >= 0; i--) {
            if (varukorg[i] === produktId) {
                varukorg.splice(i, 1);
            }
        }
    
        localStorage.setItem('varukorg', JSON.stringify(varukorg));
    
        const row = document.getElementById(`row-${produktId}`);
        if (row) {
            row.remove();
        } else {
            console.error("Kan inte hitta row element");
        }
        updateGrandTotal()
    }
    
    

window.updateQuantity = updateQuantity;
window.updateGrandTotal = updateGrandTotal;
window.deleteProduct = deleteProduct;

sumProducts();
