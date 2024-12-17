const cartCountElement = document.getElementById('cart-count');

import { cartCount } from './addedproducts.js';



console.log(cartCount)

function updateCartDisplay() {
    cartCountElement.textContent = cartCount; 
    if (cartCount > 0) {
      cartCountElement.style.display = 'block'; 
    } else {
        cartCountElement.style.display = 'none'; 
    }
  }
  updateCartDisplay()