document.addEventListener("DOMContentLoaded", () => {
    initDefaultAdmin();
    checkUserRole();
    loadProducts();

    const logoutButton = document.getElementById('logout-button');
    if(logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            window.location.href = "index.html";
        });
    }

    const backButton = document.getElementById('back-button');
    if(backButton) {
        backButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            history.back();
        });
    }

    const saveAnnouncementButton = document.getElementById('save-announcement-button');
    if(saveAnnouncementButton) {
        saveAnnouncementButton.addEventListener('click', () => {
            const announcementText = document.getElementById('announcement-text').value.trim();
            if (announcementText) {
                localStorage.setItem('announcement', announcementText);
                alert('Pengumuman berhasil disimpan!');
            } else {
                localStorage.removeItem('announcement');
                alert('Pengumuman berhasil dihapus.');
            }
        });
    }
});

/* =========================
   DEFAULT ADMIN (ONCE)
========================= */
function initDefaultAdmin() {
    if (!localStorage.getItem('users')) {
        const users = [
            {
                username: "canda",
                password: "pracanda231",
                role: "admin"
            }
        ];
        localStorage.setItem('users', JSON.stringify(users));
        console.log("Default admin dibuat");
    }
}

/* =========================
   ROLE CHECK
========================= */
function checkUserRole() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const adminButton = document.getElementById('admin-button');
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const logoutButton = document.getElementById('logout-button');

    if (loggedInUser) {
        if(loginLink) loginLink.style.display = 'none';
        if(registerLink) registerLink.style.display = 'none';
        if(logoutButton) logoutButton.style.display = 'block';

        if (adminButton && loggedInUser.role === 'admin') {
            adminButton.style.display = 'block';
        }

        if (
            loggedInUser.role !== 'admin' &&
            window.location.pathname.includes('admin.html')
        ) {
            alert("Akses ditolak!");
            window.location.href = "index.html";
        }
    } else {
        if(loginLink) loginLink.style.display = 'block';
        if(registerLink) registerLink.style.display = 'block';
        if(logoutButton) logoutButton.style.display = 'none';
        if(adminButton) adminButton.style.display = 'none';
    }
}

/* =========================
   LOGIN
========================= */
document.getElementById('login-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim().toLowerCase();
    const password = document.getElementById('password').value.trim();

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        alert("Login berhasil!");
        window.location.href = "index.html";
    } else {
        alert("Username atau password salah!");
    }
});

/* =========================
   REGISTER
========================= */
document.getElementById('register-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('reg-username').value.trim().toLowerCase();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value.trim();

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(u => u.username === username)) {
        alert("Username sudah digunakan!");
        return;
    }

    users.push({
        username,
        email,
        password,
        role: "user"
    });

    localStorage.setItem('users', JSON.stringify(users));
    alert("Registrasi berhasil, silakan login");
    window.location.href = "login.html";
});

/* =========================
   LOAD PRODUCTS
========================= */
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productList = document.getElementById('product-list');
    const adminProductList = document.getElementById('admin-product-list');

    if (productList) productList.innerHTML = '';
    if (adminProductList) adminProductList.innerHTML = '';

    products.forEach(product => {
        // Determine if the product is in stock
        let isInStock = false;
        if (typeof product.stok === 'number') {
            isInStock = product.stok > 0;
        } else if (typeof product.stok === 'string') {
            const lowerCaseStock = product.stok.toLowerCase();
            isInStock = !(lowerCaseStock === 'habis' || lowerCaseStock === 'out of stock' || lowerCaseStock === '0');
        }

        if (productList) {
            productList.innerHTML += `
                <div class="product-card">
                    <img src="${product.gambar}" alt="${product.nama}">
                    <h3>${product.nama}</h3>
                    <p>${product.deskripsi}</p>
                    <p>Harga: Rp${product.harga}</p>
                    ${
                        isInStock
                            ? `<button onclick="redirectToWhatsApp('${product.nama}', '${product.harga}')">Beli</button>`
                            : `<span class="stok-habis">Stok Habis</span>`
                    }
                </div>
            `;
        }

        if (adminProductList) {
            adminProductList.innerHTML += `
                <div class="product-card">
                    <h3>${product.nama}</h3>
                    <p>Harga: Rp${product.harga}</p>
                    <p>Stok: ${product.stok}</p>
                    <button onclick="deleteProduct(${product.id})">Hapus</button>
                    <button onclick="toggleStockStatus(${product.id})">
                        ${isInStock ? 'Set Stok Habis' : 'Set Stok Tersedia'}
                    </button>
                </div>
            `;
        }
    });
}

/* =========================
   ADD PRODUCT (ADMIN)
========================= */
document.getElementById('add-product-button')?.addEventListener('click', () => {
    const name = document.getElementById('product-name').value;
    const imageInput = document.getElementById('product-image');
    const price = document.getElementById('product-price').value;
    const description = document.getElementById('product-description').value;
    const stock = parseInt(document.getElementById('product-stock').value);

    if (!name || !imageInput.files[0] || !price || !description || isNaN(stock)) {
        alert("Semua field harus diisi!");
        return;
    }

    const imageFile = imageInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const imageDataUrl = e.target.result;

        const products = JSON.parse(localStorage.getItem('products')) || [];

        const newProduct = {
            id: Date.now(),
            nama: name,
            gambar: imageDataUrl,
            harga: price,
            deskripsi: description,
            stok: stock
        };

        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));
        loadProducts();

        // Clear input fields after adding product
        document.getElementById('product-name').value = '';
        imageInput.value = ''; // Clear file input
        document.getElementById('product-price').value = '';
        document.getElementById('product-description').value = '';
        document.getElementById('product-stock').value = '';
    };

    reader.readAsDataURL(imageFile);
});

/* =========================
   DELETE PRODUCT
========================= */
function deleteProduct(id) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
}

/* =========================
   TOGGLE STOCK STATUS
========================= */
function toggleStockStatus(id) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex > -1) {
        const currentStock = products[productIndex].stok;
        // Check if current stock indicates "in stock" (numeric > 0, or non-"habis" string)
        let isInStock = false;
        if (typeof currentStock === 'number') {
            isInStock = currentStock > 0;
        } else if (typeof currentStock === 'string') {
            const lowerCaseStock = currentStock.toLowerCase();
            isInStock = !(lowerCaseStock === 'habis' || lowerCaseStock === 'out of stock' || lowerCaseStock === '0');
        }

        products[productIndex].stok = isInStock ? "habis" : 1;
        localStorage.setItem('products', JSON.stringify(products));
        loadProducts();
    }
}

/* =========================
   WHATSAPP REDIRECT
========================= */
function redirectToWhatsApp(nama, harga) {
    const adminContact = localStorage.getItem('adminContact') || '6287743601940';
    const message = `Halo Admin, saya ingin memesan produk ${nama} dengan harga Rp${harga}`;
    window.open(`https://wa.me/${adminContact}?text=${encodeURIComponent(message)}`);
}

