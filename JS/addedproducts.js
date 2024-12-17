
export let varukorg = JSON.parse(localStorage.getItem('varukorg')) || [];
export let cartCount = varukorg.length;

export function addToCart(produktId) {
    event.preventDefault();
    varukorg.push(produktId);
    localStorage.setItem('varukorg', JSON.stringify(varukorg)); 
}
window.varukorg = varukorg;
window.cartCount = cartCount;
window.addToCart = addToCart;