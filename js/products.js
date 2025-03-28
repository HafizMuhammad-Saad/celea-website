const products = [
  {
    id: 1,
    name: "Barrier Butter by Rhode",
    price: 38,
    category: "RHODE",
    image:
      "../images/images/img1.jpg",
  },
  {
    id: 2,
    name: "BEAUTY OF JOSEON Sunscreen",
    price: 50,
    category: "BEAUTY OF JOSEON",
    image:
      "../images/images/Cover 3.jpg",
  },
  {
    id: 3,
    name: "Foundation by Rare Beauty",
    price: 100,
    category: "RARE BEAUTY",
    image:
      "../images/images/Cover 4.jpg",
  },
  {
    id: 4,
    name: "Rhode Lip Treatment",
    price: 129,
    category: "RHODE",
    image:
      "../images/images/rhode lip.jpg",
  },
  {
    id: 5,
    name: "Blue Serum by CENTELLA",
    price: 40,
    category: "SKIN CENTELLA",
    image:
      "../images/images/Cover 18.jpg",
  },
  {
    id: 6,
    name: "Anua Toner",
    price: 79,
    category: "RHODE",
    image:
      "../images/images/Cover 2.jpg",
  },
  {
    id: 7,
    name: "Lip Case by Hailey",
    price: 30,
    category: "RHODE",
    image:
      "../images/images/Cover 17.jpg",
  },
  {
    id: 8,
    name: "Skin Barrier Ampoule",
    price: 49,
    category: "BEAUTY OF JOSEON",
    image:
      "../images/images/Cover 12.jpg",
  },
  {
    id: 9,
    name: "All in One Travel Kit",
    price: 599,
    category: "BEAUTY OF JOSEON",
    image:
      "../images/images/Cover 16.jpg",
  },
  {
    id: 10,
    name: "Blush by Selena Gomez",
    price: 39,
    category: "RARE BEAUTY",
    image:
      "../images/images/Cover 14.jpg",
  },
  {
    id: 11,
    name: "Lip Liner",
    price: 19,
    category: "RARE BEAUTY",
    image:
      "../images/images/Cover 15.jpg",
  },
  {
    id: 12,
    name: "Contour Stick",
    price: 29,
    category: "RARE BEAUTY",
    image:
      "../images/images/Cover 13.jpg",
  },
  {
    id: 13,
    name: "Cleansing Oil",
    price: 89,
    category: "SKIN CENTELLA",
    image:
      "../images/images/Cover 1.jpg",
  },

  {
    id: 14,
    name: "Travel Kit",
    price: 299,
    category: "SKIN CENTELLA",
    image:
      "../images/images/Cover 19.jpg",
  },
  {
    id: 15,
    name: "Essence Toner",
    price: 55,
    category: "SKIN CENTELLA",
    image:
      "../images/images/Cover 10.jpg",
  },
];


// let cart = JSON.parse(localStorage.getItem('cart'));
// if (!Array.isArray(cart)) {
//   cart = [];
// }

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function setupCartEventListeners() {
  document.querySelectorAll('.btn-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productCard = e.target.closest('.product-card');
      const productId = parseInt(productCard.dataset.productId);
      addToCart(productId);
    });
  });

  document.querySelector('#closeCart').addEventListener('click', toggleCart);
  document.getElementById('overlay').addEventListener('click', toggleCart);
  document.querySelector('.cart-button').addEventListener('click', toggleCart);
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);

  const existingProduct = cart.find(item => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity = (existingProduct.quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  renderCart();
  showAddToCartNotification(product);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotalElement = document.getElementById('cartTotalPrice');

  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item');
    cartItemElement.innerHTML = `
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price * (item.quantity || 1)}</div>
            </div>
            <div class="cart-item-quantity">
                <button onclick="decreaseQuantity(${item.id})">-</button>
                ${item.quantity || 1}
                <button onclick="increaseQuantity(${item.id})">+</button>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">🗑️</button>
        `;
    cartItemsContainer.appendChild(cartItemElement);
    total += item.price * (item.quantity || 1);
  });

  cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

function increaseQuantity(productId) {
  const product = cart.find(item => item.id === productId);
  if (product) {
    product.quantity = (product.quantity || 1) + 1;
    saveCart();
    renderCart();
  }
}

function decreaseQuantity(productId) {
  const product = cart.find(item => item.id === productId);
  if (product && product.quantity > 1) {
    product.quantity -= 1;
    saveCart();
    renderCart();
  } else {
    removeFromCart(productId);
  }
}

function toggleCart() {
  const cartSidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('overlay');

  cartSidebar.classList.toggle('open');
  overlay.classList.toggle('show');
  renderCart()
}

function showAddToCartNotification(product) {
  Swal.fire({
    icon: 'success',
    title: 'Added to Cart',
    text: `${product.name} has been added to your cart`,
    showConfirmButton: false,
    timer: 1500
  });
}

function generateProductCards(filter = 'all') {
  const productsGrid = document.querySelector('.products-grid');
  productsGrid.innerHTML = '';

  const filteredProducts = filter === 'all'
    ? products
    : products.filter(product => product.category === filter);

  filteredProducts.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.id;
    card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <div class="product-actions">
                <button class="btn btn-view"  onclick="viewDetails(${product.id})">Details</button>
                    <button class="btn btn-cart">Add to Cart</button>
                </div>
            </div>
        `;
    productsGrid.appendChild(card);
  });

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      generateProductCards(btn.dataset.filter);
    });
  });
  setupCartEventListeners();

}

document.addEventListener('DOMContentLoaded', () => {
  generateProductCards();
  setupCartEventListeners();
});

function viewDetails(productId) {
  window.location.href = `../pages/single-product.html?id=${productId}`;
}