document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    
    // Function to render cart items
    function renderCart() {
        cartContainer.innerHTML = '';
        let total = 0;

        cartItems.forEach(item => {
            const totalPrice = item.price * item.quantity;
            total += totalPrice;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${item.image}" alt="${item.name}" width="50">
                    <span>${item.name}</span>
                </td>
                <td>Rs.${item.price}/-</td>
                <td>
                    <button class="decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase" data-id="${item.id}">+</button>
                </td>
                <td>Rs.${totalPrice}/-</td>
                <td><button class="remove" data-id="${item.id}">Remove</button></td>
            `;
            cartContainer.appendChild(row);
        });

        totalPriceElement.innerText = `Rs.${total}/-`;
    }

    // Event delegation for buttons
    cartContainer.addEventListener('click', (e) => {
        const id = e.target.dataset.id;

        if (e.target.classList.contains('remove')) {
            const index = cartItems.findIndex(item => item.id == id);
            cartItems.splice(index, 1);
        } else if (e.target.classList.contains('increase')) {
            const item = cartItems.find(item => item.id == id);
            item.quantity++;
        } else if (e.target.classList.contains('decrease')) {
            const item = cartItems.find(item => item.id == id);
            if (item.quantity > 1) {
                item.quantity--;
            }
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCart();
    });

    renderCart();
});

let cartItemCount = 0;

document.getElementById('add-to-cart-btn').addEventListener('click', function() {
    cartItemCount++;
    updateCart();
});

function updateCart() {
    const cartMessage = document.getElementById('cart-message');
    const placeOrderDiv = document.querySelector('.place-order');

    if (cartItemCount > 0) {
        cartMessage.textContent = `You have ${cartItemCount} item(s) in your cart.`;
        placeOrderDiv.style.display = 'block'; // Show the button
    } else {
        cartMessage.textContent = 'Your cart is empty.';
        placeOrderDiv.style.display = 'none'; // Hide the button
    }
}
