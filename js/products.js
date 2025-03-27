const products = [
  {
    id: 1,
    name: "Body Lotion",
    price: 599,
    category: "cream",
    image:
      "https://media.gettyimages.com/id/1488453249/photo/make-up-table.jpg?s=612x612&w=gi&k=20&c=rkpqoHB3sdh_J-iw-79JIUKbaHern3t7Z1PdAJUYerE=",
  },
  {
    id: 2,
    name: "Mosturising cream",
    price: 299,
    category: "whitening",
    image:
      "https://img.freepik.com/premium-photo/skin-care-products-pink-background-beauty-products-spa-ai-generated_848885-19.jpg",
  },
  {
    id: 3,
    name: "Body Wash",
    price: 199,
    category: "skin",
    image:
      "https://img.freepik.com/premium-photo/beauty-products-with-pink-flowers-soft-pink-background-cosmetic-skincare-products_656098-652.jpg",
  },
  {
    id: 4,
    name: "Rice Water",
    price: 1299,
    category: "skin",
    image:
      "https://img.freepik.com/premium-photo/group-pink-beauty-products-pink-background_14117-981338.jpg",
  },
  {
    id: 5,
    name: "Glowing Cream",
    price: 89,
    category: "cream",
    image:
      "https://img.freepik.com/premium-photo/pink-skincare-products-flowers-pink-background_14117-694014.jpg",
  },
  {
    id: 6,
    name: "Soft Skin Cream",
    price: 459,
    category: "cream",
    image:
      "https://img.freepik.com/premium-photo/group-pink-beauty-products-pink-background_14117-981338.jpg",
  },
  {
    id: 7,
    name: "Liquid Foundation",
    price: 799,
    category: "makeup",
    image:
      "../images/images/c3cb2405-536c-43b9-b9e5-c4cb01d6a5e1.webp",
  },
  {
    id: 8,
    name: "Matte Lipstick",
    price: 499,
    category: "makeup",
    image:
      "../images/images/a-single-matte-lipstick-sleek-and-luxuri_YeO7fo1GTNS6SRwcU0Htdg_pRmv0y3sQ3qnSxC47aFYDg.jpeg",
  },
  {
    id: 9,
    name: "Blush Palette",
    price: 599,
    category: "makeup",
    image:
      "../images/images/a-single-matte-lipstick-sleek-and-luxuri_QiB7s4eUT7yBoxzFf6d8sw_pRmv0y3sQ3qnSxC47aFYDg.jpeg",
  },
  {
    id: 10,
    name: "Highlighter Stick",
    price: 399,
    category: "makeup",
    image:
      "../images/images/face.webp",
  },
  {
    id: 11,
    name: "Waterproof Mascara",
    price: 649,
    category: "makeup",
    image:
      "../images/images/mascara.webp",
  },
  {
    id: 12,
    name: "Nude Lip Gloss",
    price: 299,
    category: "makeup",
    image:
      "../images/images/face.webp",
  },
  {
    id: 13,
    name: "Face Primer",
    price: 899,
    category: "makeup",
    image:
      "../images/images/primer.webp",
  },
  {
    id: 14,
    name: "Compact Powder",
    price: 399,
    category: "makeup",
    image:
      "../images/images/powder.webp",
  },
  {
    id: 15,
    name: "Eyeliner Pen",
    price: 299,
    category: "makeup",
    image:
      "../images/images/c3cb2405-536c-43b9-b9e5-c4cb01d6a5e1 (1).webp",
  },
  {
    id: 16,
    name: "Makeup Setting Spray",
    price: 559,
    category: "makeup",
    image:
      "../images/images/spray.webp",
  },
];

// let cart = JSON.parse(localStorage.getItem('cart')) || [];

let cart = JSON.parse(localStorage.getItem('cart'));
if (!Array.isArray(cart)) {
  cart = [];
}

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
}

document.addEventListener('DOMContentLoaded', () => {
  generateProductCards();
  setupCartEventListeners();
});

function viewDetails(productId) {
  window.location.href = `single-product.html?id=${productId}`;
}