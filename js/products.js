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
        "/images/images/c3cb2405-536c-43b9-b9e5-c4cb01d6a5e1.webp",
    },
    {
      id: 8,
      name: "Matte Lipstick",
      price: 499,
      category: "makeup",
      image:
        "/images/images/a-single-matte-lipstick-sleek-and-luxuri_YeO7fo1GTNS6SRwcU0Htdg_pRmv0y3sQ3qnSxC47aFYDg.jpeg",
    },
    {
      id: 9,
      name: "Blush Palette",
      price: 599,
      category: "makeup",
      image:
        "/images/images/a-single-matte-lipstick-sleek-and-luxuri_QiB7s4eUT7yBoxzFf6d8sw_pRmv0y3sQ3qnSxC47aFYDg.jpeg",
    },
    {
      id: 10,
      name: "Highlighter Stick",
      price: 399,
      category: "makeup",
      image:
        "/images/images/face.webp",
    },
    {
      id: 11,
      name: "Waterproof Mascara",
      price: 649,
      category: "makeup",
      image:
        "/images/images/mascara.webp",
    },
    {
      id: 12,
      name: "Nude Lip Gloss",
      price: 299,
      category: "makeup",
      image:
        "/images/images/face.webp",
    },
    {
      id: 13,
      name: "Face Primer",
      price: 899,
      category: "makeup",
      image:
        "/images/images/primer.webp",
    },
    {
      id: 14,
      name: "Compact Powder",
      price: 399,
      category: "makeup",
      image:
        "/images/images/powder.webp",
    },
    {
      id: 15,
      name: "Eyeliner Pen",
      price: 299,
      category: "makeup",
      image:
        "/images/images/c3cb2405-536c-43b9-b9e5-c4cb01d6a5e1 (1).webp",
    },
    {
      id: 16,
      name: "Makeup Setting Spray",
      price: 559,
      category: "makeup",
      image:
        "/images/images/spray.webp",
    },
  ];

  const productsGrid = document.querySelector(".products-grid");

  function generateProductCards(filter = "all") {
    productsGrid.innerHTML = "";
    const filteredProducts =
      filter === "all"
        ? products
        : products.filter((product) => product.category === filter);

    filteredProducts.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
                <div class="product-image">
                    <div class="gradient-overlay"></div>
                    <span class="product-category">${product.category}</span>
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">$${product.price}</p>
                    <div class="product-actions">
                        <button class="btn btn-view"  onclick="viewDetails(${product.id})">Details</button>
                        <button class="btn btn-cart">Add to Cart</button>
                    </div>
                </div>
            `;
      productsGrid.appendChild(card);
    });
  }

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      generateProductCards(btn.dataset.filter);
    });
  });

  generateProductCards();

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-cart")) {
      const card = e.target.closest(".product-card");
      const productName = card.querySelector(".product-title").textContent;

      card.style.transform = "scale(0.95)";
      setTimeout(() => {
        card.style.transform = "";
      }, 200);

      Swal.fire({
        title: "Good job!",
        text: `${productName} added to cart!`,
        icon: "success",
      });
    }
  });

  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  function viewDetails(productId) {
    window.location.href = `single-product.html?id=${productId}`;
  }