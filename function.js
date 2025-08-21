
var mainImg = document.querySelector('.main-img');
var thumbs = Array.from(document.querySelectorAll('.thumb'));
var modal = document.getElementById('image-modal');
var modalImg = document.getElementById('modal-img');
var modalThumbs = Array.from(document.querySelectorAll('.modal-thumb'));
var closeModal = document.getElementById('close-modal');
var prevBtn = document.getElementById('prev-btn');
var nextBtn = document.getElementById('next-btn');
var currentIndex = 0;
var images = [
    './images/image-product-1.jpg',
    './images/image-product-2.jpg',
    './images/image-product-3.jpg',
    './images/image-product-4.jpg'
];

mainImg.addEventListener('click', function () {
    modal.style.display = 'flex';
    setModalImage(currentIndex);
});

thumbs.forEach(function (thumb, idx) {
    thumb.addEventListener('click', function () {
        currentIndex = idx;
        mainImg.src = images[currentIndex];
        thumbs.forEach(function (t) { return t.classList.remove('active'); });
        thumb.classList.add('active');
    });
});

prevBtn.addEventListener('click', function () {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    setModalImage(currentIndex);
});
nextBtn.addEventListener('click', function () {
    currentIndex = (currentIndex + 1) % images.length;
    setModalImage(currentIndex);
});

modalThumbs.forEach(function (thumb, idx) {
    thumb.addEventListener('click', function () {
        currentIndex = idx;
        setModalImage(currentIndex);
    });
});

closeModal.addEventListener('click', function () {
    modal.style.display = 'none';
});

modal.addEventListener('click', function (e) {
    if (e.target === modal)
        modal.style.display = 'none';
});
function setModalImage(idx) {
    modalImg.src = images[idx];
    modalThumbs.forEach(function (t) { return t.classList.remove('active'); });
    modalThumbs[idx].classList.add('active');
}

var minusBtn = document.getElementById('minus-btn');
var plusBtn = document.getElementById('plus-btn');
var quantityInput = document.getElementById('quantity-input');
minusBtn.addEventListener('click', function () {
    var val = parseInt(quantityInput.value, 10);
    if (val > 1)
        quantityInput.value = String(val - 1);
});
plusBtn.addEventListener('click', function () {
    var val = parseInt(quantityInput.value, 10);
    quantityInput.value = String(val + 1);
});

var addToCartBtn = document.getElementById('add-to-cart');
var cartIcon = document.getElementById('cart-icon');
var cartModal = document.getElementById('cart-modal');
var cartCount = document.getElementById('cart-count');
var cartModalContent = document.getElementById('cart-modal-content');
var cartQuantity = 0;
addToCartBtn.addEventListener('click', function () {
    cartQuantity = parseInt(quantityInput.value, 10);
    updateCart();
});
cartIcon.addEventListener('click', function () {
    cartModal.style.display = cartModal.style.display === 'none' ? 'block' : 'none';
});
function updateCart() {
    if (cartQuantity > 0) {
        cartCount.style.display = 'inline-block';
        cartCount.textContent = String(cartQuantity);
        cartModalContent.innerHTML = "\n      <div class=\"cart-item\">\n        <img src=\"".concat(images[0], "\" alt=\"Sneaker\" class=\"cart-thumb\">\n        <div class=\"cart-item-details\">\n          <span>Fall Limited Edition Sneakers</span>\n          <span>$125.00 x ").concat(cartQuantity, " <b>$").concat((125 * cartQuantity).toFixed(2), "</b></span>\n        </div>\n        <span class=\"cart-delete\" id=\"cart-delete\">&#128465;</span>\n      </div>\n      <button class=\"checkout-btn\">Checkout</button>\n    ");
        
        var cartDelete = document.getElementById('cart-delete');
        cartDelete.addEventListener('click', function () {
            cartQuantity = 0;
            updateCart();
        });
    }
    else {
        cartCount.style.display = 'none';
        cartModalContent.innerHTML = "<p class=\"empty-cart\">Your cart is empty.</p>";
    }
}

document.addEventListener('click', function (e) {
    if (cartModal.style.display === 'block' &&
        !cartModal.contains(e.target) &&
        !cartIcon.contains(e.target)) {
        cartModal.style.display = 'none';
    }
});
