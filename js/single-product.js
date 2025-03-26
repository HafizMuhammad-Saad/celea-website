function changeImage(thumbnail) {
    const mainImg = document.getElementById('productImg');
    mainImg.src = thumbnail.src;
    document.querySelectorAll('.thumbnails img').forEach(img => img.classList.remove('active'));
    thumbnail.classList.add('active');
}

function selectSize(button) {
    const sizeButtons = document.querySelectorAll('.size-btn');
    const buyButton = document.querySelector('.submit');

    sizeButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    if (button.innerText.includes('Big')) {
        buyButton.innerText = 'Buy Now - $38.00';
    } else if (button.innerText.includes('Small')) {
        buyButton.innerText = 'Buy Now - $22.00';
    }
}
