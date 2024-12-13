
import { varukorg } from './addedproducts.js'; 
import { getData } from './api.js'; 



async function sumProducts() {
    const productCounts = varukorg.reduce((acc, produktId) => {
        acc[produktId] = (acc[produktId] || 0) + 1;
        return acc;
    }, {});

    const kassalista = document.getElementById("Produkt-kassalista");
    kassalista.innerHTML = ''; 

    for (const produktId of Object.keys(productCounts)) {
        try {
            const data = await getData(`https://ecommerce-api-penstore.vercel.app/products/${produktId}`);
            console.log(data);

            kassalista.innerHTML += `
                <tr>
                    <td>${data.name}</td>
                    <td>
                        <input type="number" value="${productCounts[produktId]}" min="0" data-id="${produktId}" class="Productcount" oninput="updateQuantity('${produktId}', this.value)">
                    </td>
                    <td>${data.price.$numberDecimal}</td>
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
    sumProducts();
}


window.updateQuantity = updateQuantity;


sumProducts();
