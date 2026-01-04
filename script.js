let currentCategory = 'all'; // Global variable to keep track of the active category

/* =========================
   ANNOUNCEMENT DISPLAY
========================= */
async function loadAndDisplayAnnouncement() {
    try {
        const response = await fetch('http://localhost:3000/api/announcement');
        const data = await response.json();
        const announcementBanner = document.getElementById('announcement-banner');
        if (announcementBanner && data.text) {
            announcementBanner.textContent = data.text;
            announcementBanner.style.display = 'block';
        } else if (announcementBanner) {
            announcementBanner.style.display = 'none';
        }

        const announcementTextInput = document.getElementById('announcement-text');
        if (announcementTextInput) {
            announcementTextInput.value = data.text || '';
        }
    } catch (error) {
        console.error("Error loading announcement:", error);
        const announcementBanner = document.getElementById('announcement-banner');
        if (announcementBanner) announcementBanner.style.display = 'none';
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    initDefaultAdmin();
    checkUserRole();
    await loadProducts(); // This will now call filterAndRenderProducts internally
    await loadAndDisplayAnnouncement(); // Load announcement on page load

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
        saveAnnouncementButton.addEventListener('click', async () => {
            const announcementText = document.getElementById('announcement-text').value.trim();
            try {
                const response = await fetch('http://localhost:3000/api/announcement', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ text: announcementText })
                });

                if (response.ok) {
                    if (announcementText) {
                        alert('Pengumuman berhasil disimpan!');
                    } else {
                        alert('Pengumuman berhasil dihapus.');
                    }
                    // Optionally, update the displayed announcement on the page
                    // This assumes there's a function to load announcement
                    // loadAnnouncementDisplay();
                } else {
                    alert('Gagal menyimpan pengumuman.');
                }
            } catch (error) {
                console.error("Error saving announcement:", error);
                alert('Terjadi kesalahan saat menyimpan pengumuman.');
            }
        });
    }

    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', filterAndRenderProducts); // Use filterAndRenderProducts here
    }

    // Category navigation event listeners
    document.querySelectorAll('.category-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Remove active class from all category links
            document.querySelectorAll('.category-link').forEach(l => l.classList.remove('active'));
            // Add active class to the clicked link
            link.classList.add('active');
            // Update currentCategory and filter products
            currentCategory = link.dataset.category;
            filterAndRenderProducts();
        });
    });
});

/* =========================
   DEFAULT ADMIN (ONCE)
========================= */
async function initDefaultAdmin() {
    try {
        const response = await fetch('http://localhost:3000/api/users');
        const users = await response.json();

        if (users.length === 0) {
            const defaultAdmin = {
                username: "canda",
                password: "pracanda231",
                role: "admin",
                email: "admin@example.com" // Email is now required by register API
            };
            const registerResponse = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(defaultAdmin)
            });
            if (registerResponse.ok) {
                console.log("Default admin dibuat di backend");
            } else {
                console.error("Gagal membuat default admin di backend");
            }
        }
    } catch (error) {
        console.error("Error checking/creating default admin:", error);
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
document.getElementById('login-form')?.addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim().toLowerCase();
    const password = document.getElementById('password').value.trim();

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('loggedInUser', JSON.stringify(data.user)); // Store user info from backend
            alert("Login berhasil!");
            window.location.href = "index.html";
        } else {
            alert(data.message || "Username atau password salah!");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("Terjadi kesalahan saat login.");
    }
});

/* =========================
   REGISTER
========================= */
document.getElementById('register-form')?.addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('reg-username').value.trim().toLowerCase();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value.trim();

    try {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registrasi berhasil, silakan login");
            window.location.href = "login.html";
        } else {
            alert(data.message || "Registrasi gagal.");
        }
    } catch (error) {
        console.error("Error during registration:", error);
        alert("Terjadi kesalahan saat registrasi.");
    }
});

/* =========================
   PRODUCT RENDERING
========================= */
function renderProducts(productsToRender) {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    productList.innerHTML = ''; // Clear the list

    if (productsToRender.length === 0) {
        productList.innerHTML = '<p style="text-align: center; width: 100%;">Produk tidak ditemukan.</p>';
        return;
    }

    productsToRender.forEach(product => {
        let isInStock = false;
        if (typeof product.stok === 'number') {
            isInStock = product.stok > 0;
        } else if (typeof product.stok === 'string') {
            const lowerCaseStock = product.stok.toLowerCase();
            isInStock = !(lowerCaseStock === 'habis' || lowerCaseStock === 'out of stock' || lowerCaseStock === '0');
        }

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
    });
}

/* =========================
   FILTER AND RENDER PRODUCTS (Centralized)
========================= */
async function filterAndRenderProducts() {
    const searchTerm = document.getElementById('search')?.value.toLowerCase() || '';
    
    // Fetch products from the backend API
    const response = await fetch('http://localhost:3000/api/products');
    let allProducts = await response.json();

    // Filter by category
    if (currentCategory !== 'all') {
        allProducts = allProducts.filter(product => product.kategori === currentCategory);
    }

    // Filter by search term
    const filteredProducts = allProducts.filter(product => {
        const productName = product.nama ? product.nama.toLowerCase() : '';
        const productDesc = product.deskripsi ? product.deskripsi.toLowerCase() : '';
        return productName.includes(searchTerm) || productDesc.includes(searchTerm);
    });

    renderProducts(filteredProducts);
}

/* =========================
   LOAD PRODUCTS (Initial Admin Display)
========================= */
async function loadProducts() {
    let products = [];
    try {
        const response = await fetch('http://localhost:3000/api/products');
        products = await response.json();
    } catch (error) {
        console.error("Error fetching products:", error);
        // Optionally display an error message to the user
    }
    
    // For admin.html
    const adminProductList = document.getElementById('admin-product-list');
    if (adminProductList) {
        adminProductList.innerHTML = '';
        if (products.length === 0) {
            adminProductList.innerHTML = '<p style="text-align: center; width: 100%;">Belum ada produk.</p>';
        } else {
            products.forEach(product => {
                let isInStock = false;
                if (typeof product.stok === 'number') {
                    isInStock = product.stok > 0;
                } else if (typeof product.stok === 'string') {
                    const lowerCaseStock = product.stok.toLowerCase();
                    isInStock = !(lowerCaseStock === 'habis' || lowerCaseStock === 'out of stock' || lowerCaseStock === '0');
                }

                adminProductList.innerHTML += `
                    <div class="product-card">
                        <h3>${product.nama}</h3>
                        <p>Kategori: ${product.kategori || 'Tidak ada'}</p>
                        <p>Harga: Rp${product.harga}</p>
                        <p>Stok: ${product.stok}</p>
                        <button onclick="deleteProduct(${product.id})">Hapus</button>
                        <button onclick="toggleStockStatus(${product.id})">
                            ${isInStock ? 'Set Stok Habis' : 'Set Stok Tersedia'}
                        </button>
                    </div>
                `;
            });
        }
    }

    // Initial render for index.html via centralized function
    filterAndRenderProducts();
}

/* =========================
   ADD PRODUCT (ADMIN)
========================= */
document.getElementById('add-product-button')?.addEventListener('click', async () => {
    const name = document.getElementById('product-name').value;
    const imageInput = document.getElementById('product-image');
    const price = document.getElementById('product-price').value;
    const description = document.getElementById('product-description').value;
    const category = document.getElementById('product-category').value;
    const stock = parseInt(document.getElementById('product-stock').value);

    if (!name || !imageInput.files[0] || !price || !description || !category || isNaN(stock)) {
        alert("Semua field harus diisi, termasuk kategori!");
        return;
    }

    const imageFile = imageInput.files[0];
    const reader = new FileReader();

    reader.onload = async function(e) {
        const imageDataUrl = e.target.result;

        const newProduct = {
            nama: name,
            gambar: imageDataUrl,
            harga: price,
            deskripsi: description,
            kategori: category,
            stok: stock
        };

        try {
            const response = await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });

            if (response.ok) {
                alert('Produk berhasil ditambahkan!');
                loadProducts(); // Refresh product list
                // Clear input fields after adding product
                document.getElementById('product-name').value = '';
                imageInput.value = ''; // Clear file input
                document.getElementById('product-price').value = '';
                document.getElementById('product-description').value = '';
                document.getElementById('product-category').value = '';
                document.getElementById('product-stock').value = '';
            } else {
                alert('Gagal menambahkan produk.');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Terjadi kesalahan saat menambahkan produk.');
        }
    };

    reader.readAsDataURL(imageFile);
});

/* =========================
   DELETE PRODUCT
========================= */
async function deleteProduct(id) {
    if (!confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
        return;
    }
    try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Produk berhasil dihapus!');
            loadProducts(); // Refresh product list
        } else {
            alert('Gagal menghapus produk.');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Terjadi kesalahan saat menghapus produk.');
    }
}

/* =========================
   TOGGLE STOCK STATUS
========================= */
async function toggleStockStatus(id) {
    let products = [];
    try {
        const response = await fetch('http://localhost:3000/api/products');
        products = await response.json();
    } catch (error) {
        console.error("Error fetching products for stock toggle:", error);
        alert("Gagal mengambil produk untuk memperbarui stok.");
        return;
    }

    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex > -1) {
        const currentStock = products[productIndex].stok;
        let isInStock = false;
        if (typeof currentStock === 'number') {
            isInStock = currentStock > 0;
        } else if (typeof currentStock === 'string') {
            const lowerCaseStock = currentStock.toLowerCase();
            isInStock = !(lowerCaseStock === 'habis' || lowerCaseStock === 'out of stock' || lowerCaseStock === '0');
        }

        const newStockValue = isInStock ? "habis" : 1;

        try {
            const response = await fetch(`http://localhost:3000/api/products/${id}/stock`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ stok: newStockValue })
            });

            if (response.ok) {
                alert('Status stok berhasil diperbarui!');
                loadProducts(); // Refresh product list
            } else {
                alert('Gagal memperbarui status stok.');
            }
        } catch (error) {
            console.error('Error updating stock status:', error);
            alert('Terjadi kesalahan saat memperbarui status stok.');
        }
    } else {
        alert("Produk tidak ditemukan.");
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
