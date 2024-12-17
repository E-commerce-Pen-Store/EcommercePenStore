const cartCountElement = document.getElementById('cart-count');
const currentPage = window.location.pathname;

import { cartCount } from './addedproducts.js';



export function updateCartDisplay() {
    cartCountElement.textContent = cartCount;

    if (cartCount > 0) {
        cartCountElement.style.display = 'block';

        if (currentPage.includes('Varukorg.html')) {
            cartCountElement.style.display = 'none';
        }
    } else {
        cartCountElement.style.display = 'none';
    }
}
  document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
});
