function addToCart(id, name, price, image) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cartItems.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ id, name, price, quantity: 1, image });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert(`${name} has been added to your cart!`);
}
let cartItemCount = 0; // Initialize cart item count

function addToCart(id, name, price, image) {
    // Increment the cart item count
    cartItemCount++;

    // Update the cart count in the navigation
    document.getElementById('cart-count').textContent = cartItemCount;

    // Add logic to store the cart items as needed (e.g., in localStorage or an array)
    console.log(`Added to cart: ${name}, Price: ${price}`);
    
    // You can also include code to actually handle the cart logic here (like storing items)
}

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

    // Add to cart function
    window.addToCart = (id, name, price, image) => {
        const existingItemIndex = cartItems.findIndex(item => item.id === id);
        if (existingItemIndex > -1) {
            cartItems[existingItemIndex].quantity++;
        } else {
            cartItems.push({ id, name, price, image, quantity: 1 });
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCart();
    };

    // Event delegation for buttons
    cartContainer.addEventListener('click', (e) => {
        const id = e.target.dataset.id;

        if (e.target.classList.contains('remove')) {
            const index = cartItems.findIndex(item => item.id == id);
            if (index > -1) {
                cartItems.splice(index, 1);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                renderCart();
            }
        } else if (e.target.classList.contains('increase')) {
            const item = cartItems.find(item => item.id == id);
            if (item) {
                item.quantity++;
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                renderCart();
            }
        } else if (e.target.classList.contains('decrease')) {
            const item = cartItems.find(item => item.id == id);
            if (item && item.quantity > 1) {
                item.quantity--;
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                renderCart();
            }
        }
    });

    renderCart(); // Initial render of the cart
});
// Event listener for the search input
document.getElementById('search-input').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productName = product.getAttribute('data-name').toLowerCase();
        if (productName.includes(query)) {
            product.classList.remove('hidden'); // Show matching product
        } else {
            product.classList.add('hidden'); // Hide non-matching product
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const ads = document.querySelectorAll('.ad');
    
    ads.forEach(ad => {
        ad.addEventListener('mouseover', () => {
            ad.style.transform = 'scale(1.1)';
            ad.style.transition = 'transform 0.3s ease';
        });
        
        ad.addEventListener('mouseout', () => {
            ad.style.transform = 'scale(1)';
        });
    });
});

function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active'); // Toggle the 'active' class to show/hide the menu
}

document.getElementById('loyaltyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const dob = document.getElementById('dob').value;
    const address = document.getElementById('address').value;
    const agree = document.getElementById('agree').checked;

    if (fullName && email && phone && dob && address && agree) {
        const confirmationMessage = document.getElementById('confirmationMessage');
        confirmationMessage.textContent = `Thank you, ${fullName}. Your order will be placed within 5 hours!`;
        confirmationMessage.style.display = 'block';

        // Optionally, reset the form after submission
        document.getElementById('loyaltyForm').reset();
    } else {
        alert('Please fill in all fields correctly.');
    }
});
