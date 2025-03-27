document.addEventListener('DOMContentLoaded', () => {
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutTotal = document.getElementById('checkout-total');
    const checkoutForm = document.getElementById('checkout-form');

    let cartItems = [];
    const possibleCartKeys = ['cart', 'celea-cart', 'checkout-cart'];
    
    for (let key of possibleCartKeys) {
        const storedCart = localStorage.getItem(key);
        if (storedCart) {
            try {
                cartItems = JSON.parse(storedCart);
                break;
            } catch (error) {
                console.error(`Error parsing cart from key ${key}:`, error);
            }
        }
    }

    let totalPrice = 0;
    if (cartItems.length === 0) {
        checkoutItems.innerHTML = '<p>Your cart is empty</p>';
        checkoutTotal.innerHTML = 'Total: $0.00';
    } else {
        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('order-item');
            
            // Use default image if not provided
            const imageUrl = item.image || 'default-product-image.jpg';
            
            itemElement.innerHTML = `
                <img src="${imageUrl}" alt="${item.name}" onerror="this.src='default-product-image.jpg';">
                <div class="order-item-details">
                    <h3>${item.name}</h3>
                    <p>Quantity: ${item.quantity || 1}</p>
                    <p>Price: $${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                </div>
            `;
            checkoutItems.appendChild(itemElement);
            totalPrice += item.price * (item.quantity || 1);
        });

        // Display total
        checkoutTotal.innerHTML = `Total: $${totalPrice.toFixed(2)}`;
    }

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;

        if (name && email && address && cartItems.length > 0) {
            possibleCartKeys.forEach(key => {
                localStorage.removeItem(key);
            });

            window.location.href = 'order-confirmation.html';
        } else if (cartItems.length === 0) {
            Swal.fire({
                title: 'Cart is Empty',
                text: 'Please add items to your cart before checkout.',
                icon: 'warning'
            });
        }
    });
});