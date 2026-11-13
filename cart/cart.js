const state = {
  products: [
    { id: 1, name: "Mandazi (pack of 6)", price: 120 },
    { id: 2, name: "Chapati (pack of 5)", price: 150 },
    { id: 3, name: "Tea leaves 250g", price: 180 },
    { id: 4, name: "Milk 500ml", price: 70 },
    { id: 5, name: "Bread", price: 60 },
  ],
  cart: JSON.parse(localStorage.getItem("cart") || "[]"),
};

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(state.cart));
}

function addToCart(productId) {
  const existing = state.cart.find((item) => item.productId === productId);
  if (existing) {
    existing.quantity++;
  } else {
    state.cart.push({ productId, quantity: 1 });
  }
  saveCart();
  render();
}

function updateQuantity(productId, quantity) {
  if (quantity <= 0) {
    state.cart = state.cart.filter((item) => item.productId !== productId);
  } else {
    const item = state.cart.find((i) => i.productId === productId);
    if (item) item.quantity = quantity;
  }
  saveCart();
  render();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter((item) => item.productId !== productId);
  saveCart();
  render();
}

function clearCart() {
  state.cart = [];
  saveCart();
  render();
}

function getCartTotal() {
  return state.cart.reduce((total, item) => {
    const product = state.products.find((p) => p.id === item.productId);
    return total + product.price * item.quantity;
  }, 0);
}

function getCartCount() {
  return state.cart.reduce((count, item) => count + item.quantity, 0);
}

function renderProducts() {
  const container = document.getElementById("products");
  container.innerHTML = "";
  state.products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>KES ${product.price}</p>
      <button data-id="${product.id}">Add to Cart</button>
    `;
    container.appendChild(card);
  });

  container.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      addToCart(Number(btn.dataset.id));
    });
  });
}

function renderCart() {
  const list = document.getElementById("cart-list");
  list.innerHTML = "";

  if (state.cart.length === 0) {
    list.innerHTML = "<li>Your cart is empty</li>";
  } else {
    state.cart.forEach((item) => {
      const product = state.products.find((p) => p.id === item.productId);
      const li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML = `
        <span>${product.name}</span>
        <div class="qty-controls">
          <button class="minus" data-id="${item.productId}">−</button>
          <span>${item.quantity}</span>
          <button class="plus" data-id="${item.productId}">+</button>
          <button class="remove" data-id="${item.productId}">Remove</button>
        </div>
        <strong>KES ${product.price * item.quantity}</strong>
      `;
      list.appendChild(li);
    });
  }

  document.getElementById("cart-count").textContent = getCartCount();
  document.getElementById("cart-total").textContent = getCartTotal();

  list.querySelectorAll(".minus").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const item = state.cart.find((i) => i.productId === id);
      updateQuantity(id, item.quantity - 1);
    });
  });

  list.querySelectorAll(".plus").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const item = state.cart.find((i) => i.productId === id);
      updateQuantity(id, item.quantity + 1);
    });
  });

  list.querySelectorAll(".remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeFromCart(Number(btn.dataset.id));
    });
  });
}

function render() {
  renderProducts();
  renderCart();
}

document.getElementById("clear-cart").addEventListener("click", clearCart);

render();
