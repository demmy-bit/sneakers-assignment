(function () {
 
  const mainImg = document.querySelector('.main-img') as HTMLImageElement;
  const thumbs = Array.from(document.querySelectorAll('.thumb')) as HTMLImageElement[];
  const modal = document.getElementById('image-modal') as HTMLElement;
  const modalImg = document.getElementById('modal-img') as HTMLImageElement;
  const modalThumbs = Array.from(document.querySelectorAll('.modal-thumb')) as HTMLImageElement[];
  const closeModal = document.getElementById('close-modal') as HTMLElement;
  const prevBtn = document.getElementById('prev-btn') as HTMLButtonElement;
  const nextBtn = document.getElementById('next-btn') as HTMLButtonElement;

  let currentIndex = 0;
  const images = [
    './images/image-product-1.jpg',
    './images/image-product-2.jpg',
    './images/image-product-3.jpg',
    './images/image-product-4.jpg'
  ];

 
  mainImg.addEventListener('click', () => {
    modal.style.display = 'flex';
    setModalImage(currentIndex);
  });

  
  thumbs.forEach((thumb, idx) => {
    thumb.addEventListener('click', () => {
      currentIndex = idx;
      mainImg.src = images[currentIndex];
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

 
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    setModalImage(currentIndex);
  });
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    setModalImage(currentIndex);
  });

  
  modalThumbs.forEach((thumb, idx) => {
    thumb.addEventListener('click', () => {
      currentIndex = idx;
      setModalImage(currentIndex);
    });
  });

 
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });



 
  const minusBtn = document.getElementById('minus-btn') as HTMLButtonElement;
  const plusBtn = document.getElementById('plus-btn') as HTMLButtonElement;
  const quantityInput = document.getElementById('quantity-input') as HTMLInputElement;

  minusBtn.addEventListener('click', () => {
    let val = parseInt(quantityInput.value, 10);
    if (val > 1) quantityInput.value = String(val - 1);
  });
  plusBtn.addEventListener('click', () => {
    let val = parseInt(quantityInput.value, 10);
    quantityInput.value = String(val + 1);
  });


  const addToCartBtn = document.getElementById('add-to-cart') as HTMLButtonElement;
  const cartIcon = document.getElementById('cart-icon') as HTMLElement;
  const cartModal = document.getElementById('cart-modal') as HTMLElement;
  const cartCount = document.getElementById('cart-count') as HTMLElement;
  const cartModalContent = document.getElementById('cart-modal-content') as HTMLElement;

  let cartQuantity = 0;

  addToCartBtn.addEventListener('click', () => {
    cartQuantity = parseInt(quantityInput.value, 10);
    updateCart();
  });

  cartIcon.addEventListener('click', () => {
    cartModal.style.display = cartModal.style.display === 'none' ? 'block' : 'none';
  });

  function updateCart() {
    if (cartQuantity > 0) {
      cartCount.style.display = 'inline-block';
      cartCount.textContent = String(cartQuantity);

      cartModalContent.innerHTML = `
        <div class="cart-item">
          <img src="${images[0]}" alt="Sneaker" class="cart-thumb">
          <div class="cart-item-details">
            <span>Fall Limited Edition Sneakers</span>
            <span>$125.00 x ${cartQuantity} <b>$${(125 * cartQuantity).toFixed(2)}</b></span>
          </div>
          <span class="cart-delete" id="cart-delete">&#128465;</span>
        </div>
        <button class="checkout-btn">Checkout</button>
      `;

     
      const cartDelete = document.getElementById('cart-delete') as HTMLElement;
      cartDelete.addEventListener('click', () => {
        cartQuantity = 0;
        updateCart();
      });
    } else {
      cartCount.style.display = 'none';
      cartModalContent.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
    }
  }

 
  document.addEventListener('click', (e) => {
    if (
      cartModal.style.display === 'block' &&
      !cartModal.contains(e.target as Node) &&
      !cartIcon.contains(e.target as Node)
    ) {
      cartModal.style.display = 'none';
    }
  });

 
  function setModalImage(idx: number) {
    modalImg.src = images[idx];
    modalThumbs.forEach((t, i) => t.classList.toggle('active', i === idx));
  }
})();