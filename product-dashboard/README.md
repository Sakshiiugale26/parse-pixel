🛍️ Product Dashboard – React + Redux Toolkit

A modern Product Dashboard built using React, Redux Toolkit, and Tailwind CSS, featuring product listing, search, filtering, sorting, favorites management, and complete unit & integration testing.

🚀 Live Demo

👉 (Add your deployed link here — Vercel / Netlify)
Example: https://product-dashboard.vercel.app

📌 Features
🧾 Product Listing

Displays products in a responsive grid

Data fetched from Fake Store API

Clean, modern UI with Tailwind CSS

🔍 Search, Filter & Sort

Debounced search by product title

Filter products by category

Sort products by price (low → high / high → low)

📄 Product Detail Page

Shows complete product information

Add product to favorites

Handles duplicate favorite additions gracefully

❤️ Favorites

Add/remove products from favorites

Favorites stored in Redux store

Dedicated Favorites page

🧠 State Management

Redux Toolkit slices for:

Products

Favorites

Async API handling using Redux Thunks

Selectors for clean state access

🧪 Testing
✅ Unit Tests

Redux slice tests:

productSlice.test.js

favoriteSlice.test.js

✅ Integration Test

End-to-end UI flow:

Search products

Verify filtered results

📊 Test Results
Test Files  3 passed
Tests       7 passed


Testing stack:

Vitest

@testing-library/react

@testing-library/jest-dom

🛠️ Tech Stack

React (Vite)

Redux Toolkit

React Router

Tailwind CSS

Vitest

Testing Library

📁 Project Structure
src/
├── components/
├── features/
│   ├── products/
│   │   ├── productSlice.js
│   │   └── productSlice.test.js
│   └── favorites/
│       ├── favoriteSlice.js
│       └── favoriteSlice.test.js
├── pages/
│   ├── ProductListPage.jsx
│   ├── ProductDetailPage.jsx
│   └── FavoritesPage.jsx
├── hooks/
│   └── useDebounce.js
├── tests/
│   └── integration.test.jsx
├── App.jsx
├── main.jsx

⚙️ Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/your-username/product-dashboard.git
cd product-dashboard

2️⃣ Install dependencies
npm install

3️⃣ Run the app
npm run dev

4️⃣ Run tests
npx vitest run

🌟 Bonus Features

Prevents duplicate favorite addition

User-friendly alert when product is already added

Clean, accessible UI

🎥 Optional

A short Loom/video walkthrough can be added to explain:

App flow

Redux architecture

Testing approach

✅ Evaluation Mapping
Requirement	Status
React + Redux Toolkit	✅
API Integration	✅
Search / Filter / Sort	✅
Favorites (Redux)	✅
Responsive UI	✅
Unit Tests	✅
Integration Tests	✅
Best Practices	✅
👩‍💻 Author

Sakshi
Frontend Developer | React | Redux | Testing