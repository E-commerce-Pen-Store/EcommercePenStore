
export let varukorg = JSON.parse(localStorage.getItem('varukorg')) || [];


export function addToCart(produktId) {
    event.preventDefault();
    varukorg.push(produktId);
    localStorage.setItem('varukorg', JSON.stringify(varukorg)); 
}
window.varukorg = varukorg;
window.addToCart = addToCart;