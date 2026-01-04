const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const path = require('path');

// --- Firebase Initialization ---
const serviceAccount = require('./firebase-canz.json'); // Ensure this path is correct

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://canzstore-fefe0.firebaseio.com" // IMPORTANT: Replace with your Firebase project's database URL
});

const db = admin.database();
// --- End Firebase Initialization ---


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


// =========================
// PRODUCT ROUTES
// =========================
app.get('/api/products', async (req, res) => {
    try {
        const snapshot = await db.ref('products').once('value');
        const products = snapshot.val();
        if (products) {
            // Convert object of objects to array of objects
            const productsArray = Object.keys(products).map(key => ({ id: key, ...products[key] }));
            res.json(productsArray);
        } else {
            res.json([]);
        }
    } catch (error) {
        console.error("Failed to retrieve products:", error);
        res.status(500).json({ message: "Failed to retrieve products." });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const newProduct = req.body;
        // Push generates a unique key for the new product
        const productRef = db.ref('products').push(newProduct);
        newProduct.id = productRef.key; // Add the generated ID to the product object
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Failed to add product:", error);
        res.status(500).json({ message: "Failed to add product." });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        const productId = req.params.id; // Firebase ID is string
        await db.ref(`products/${productId}`).remove();
        res.status(200).json({ message: "Product deleted successfully." });
    } catch (error) {
        console.error("Failed to delete product:", error);
        res.status(500).json({ message: "Failed to delete product." });
    }
});

app.put('/api/products/:id/stock', async (req, res) => {
    try {
        const productId = req.params.id; // Firebase ID is string
        const { stok } = req.body;
        await db.ref(`products/${productId}`).update({ stok });
        res.status(200).json({ message: "Stock updated successfully." });
    } catch (error) {
        console.error("Failed to update stock:", error);
        res.status(500).json({ message: "Failed to update stock." });
    }
});

// =========================
// USER ROUTES
// =========================
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password, role = "user" } = req.body;

        const snapshot = await db.ref('users').orderByChild('username').equalTo(username).once('value');
        if (snapshot.exists()) {
            return res.status(400).json({ message: "Username already exists." });
        }

        const newUser = { username, email, password, role };
        // Push generates a unique key for the new user, we don't store it here, but in real apps you might
        await db.ref('users').push(newUser);
        res.status(201).json({ message: "User registered successfully.", user: { username, role } });
    } catch (error) {
        console.error("Failed to register user:", error);
        res.status(500).json({ message: "Failed to register user." });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const snapshot = await db.ref('users').orderByChild('username').equalTo(username).once('value');
        const users = snapshot.val();

        if (users) {
            const userId = Object.keys(users)[0];
            const user = users[userId];

            if (user.password === password) {
                res.status(200).json({ message: "Login successful.", user: { username: user.username, role: user.role } });
            } else {
                res.status(401).json({ message: "Invalid username or password." });
            }
        } else {
            res.status(401).json({ message: "Invalid username or password." });
        }
    } catch (error) {
        console.error("Failed to login user:", error);
        res.status(500).json({ message: "Failed to login user." });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const snapshot = await db.ref('users').once('value');
        const users = snapshot.val();
        if (users) {
            const usersArray = Object.keys(users).map(key => ({ username: users[key].username, role: users[key].role }));
            res.json(usersArray);
        } else {
            res.json([]);
        }
    } catch (error) {
        console.error("Failed to get users:", error);
        res.status(500).json({ message: "Failed to retrieve users." });
    }
});


// =========================
// ANNOUNCEMENT ROUTES
// =========================
app.get('/api/announcement', async (req, res) => {
    try {
        const snapshot = await db.ref('announcement').once('value');
        const announcement = snapshot.val();
        res.json(announcement || { text: '' });
    } catch (error) {
        console.error("Failed to retrieve announcement:", error);
        res.status(500).json({ message: "Failed to retrieve announcement." });
    }
});

app.put('/api/announcement', async (req, res) => {
    try {
        const { text } = req.body;
        await db.ref('announcement').set({ text });
        res.status(200).json({ message: "Announcement updated successfully.", text });
    } catch (error) {
        console.error("Failed to update announcement:", error);
        res.status(500).json({ message: "Failed to update announcement." });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
