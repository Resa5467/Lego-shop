// Products Data
const products = [
    {
        id: 1,
        name: "Соник Супер-ежик",
        price: 3490,
        image: "https://i.postimg.cc/QxfCP5bJ/2023-06-24-22-43-17.png",
        description: "Легендарные Зелёные холмы"
    },
    {
        id: 2,
        name: "Супер Марио",
        price: 4290,
        image: "https://i.postimg.cc/CKQ66vBp/2023-06-24-22-49-33.png",
        description: "Создавай свои уровни!"
    },
    {
        id: 3,
        name: "Винни Пух",
        price: 2890,
        image: "https://i.postimg.cc/Y0f5V6BN/2023-06-24-23-03-09.png",
        description: "Домик в Зачарованном лесу"
    }
];

// Cart
let cart = [];

// Render Products
function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price">${product.price} ₽</div>
                <div class="card-buttons">
                    <button class="btn btn-secondary" onclick="showDetails(${product.id})">Подробнее</button>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Купить</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Add to Cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    
    updateCart();
    showToast(`${product.name} добавлен в корзину!`);
}

// Show Product Details
function showDetails(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    alert(`📦 ${product.name}\n\nЦена: ${product.price} ₽\n\n${product.description}\n\nОтличный выбор для творчества!`);
}

// Update Cart
function updateCart() {
    const count = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    count.textContent = totalItems;
    
    // Update sidebar if open
    renderCartItems();
}

// Render Cart Items
function renderCartItems() {
    const container = document.getElementById('cart-items');
    if (!container) return;
    
    let html = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * (item.quantity || 1);
        total += itemTotal;
        
        html += `
            <div class="cart-item">
                <img src="${item.image}" style="width:70px; height:70px; object-fit:cover; border-radius:8px;">
                <div style="flex:1">
                    <strong>${item.name}</strong><br>
                    <small>${item.price} ₽ × ${item.quantity || 1}</small>
                </div>
                <div style="text-align:right">
                    <strong>${itemTotal} ₽</strong><br>
                    <button onclick="removeFromCart(${index})" style="color:red; background:none; border:none; cursor:pointer;">Удалить</button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html || '<p style="text-align:center; padding:40px; color:#999;">Корзина пуста</p>';
    document.getElementById('cart-total').textContent = total + ' ₽';
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    renderCartItems();
}

// Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// Cart Sidebar
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    sidebar.classList.toggle('open');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    
    // Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Cart Icon
    document.getElementById('cart-icon').addEventListener('click', toggleCart);
    
    // Close Cart
    document.getElementById('close-cart').addEventListener('click', () => {
        document.getElementById('cart-sidebar').classList.remove('open');
    });
    
    // Checkout Button
    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length > 0) {
            alert('🎉 Спасибо за заказ! В реальном магазине здесь была бы оплата.');
            cart = [];
            updateCart();
            toggleCart();
        } else {
            alert('Корзина пуста');
        }
    });
    
    // Age Dropdown
    const ageBtn = document.getElementById('age-btn');
    if (ageBtn) {
        ageBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = document.querySelector('.dropdown-content');
            if (dropdown) {
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            }
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            const dropdowns = document.querySelectorAll('.dropdown-content');
            dropdowns.forEach(d => d.style.display = 'none');
        }
    });
});