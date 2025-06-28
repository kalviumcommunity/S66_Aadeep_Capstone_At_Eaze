# 🛍️ At Eaze – A Multi-Vendor E-Commerce Platform for Handmade Gifts

## 📌 Project Idea

**At Eaze** is an online e-commerce platform that enables artisans to sell handmade gifts. It empowers small-scale sellers to register, list, and manage their products, while providing buyers a personalized and secure shopping experience for unique items.

---

## 🎯 Objectives

* Build a full-stack multi-vendor marketplace.
* Provide independent artisans a user-friendly platform to list and sell products.
* Implement secure buyer and seller authentication.
* Integrate key e-commerce features: product management, cart, orders, payments, and reviews.
* Ensure scalability, usability, and responsiveness across devices.

---

## 🧩 Problem Statement

Many artisans face challenges in selling handmade products online due to high platform fees, limited exposure, and lack of technical knowledge. **At Eaze** offers a commission-friendly, simple, and scalable solution to help sellers reach their ideal customers.

---

## 🛠️ Tech Stack

| Layer          | Tools / Technologies                 |
| -------------- | ------------------------------------ |
| **Frontend**   | React.js + Tailwind CSS              |
| **Backend**    | Node.js + Express.js                 |
| **Database**   | MongoDB                              |
| **Auth**       | JWT + bcrypt.js                      |
| **Payments**   | Razorpay                             |
| **Hosting**    | Vercel (frontend) + Render (backend) |
| **Versioning** | GitHub                               |
| **Workflow**   | Agile + Kanban                       |

---

## 🚀 Live Deployment

| Service   | URL                                       |
| --------- | ----------------------------------------- |
| **Backend API** | https://at-eaze-backend.onrender.com/ |
| **Frontend**    | _Coming Soon_                        |

---

## ⛔ Challenges

* Handling multi-vendor complexity (individual dashboards, unique products, independent transactions).
* Ensuring payment security with multiple sellers.
* Attracting initial seller and buyer base.
* Responsive, fast UI/UX.
* Shipping/logistics management (MVP may exclude this).

---

## 🗓️ 14-Day Capstone Plan

### 🗂️ **Week 1: Foundation + Core Features**

#### **Day 1 – Project Setup & Auth**

* Create GitHub repo, initialize backend and frontend.
* Install necessary dependencies.
* Design User model (`name`, `email`, `password`, `role`).
* Implement JWT authentication (register/login).
* Set up routing and Tailwind CSS.

#### **Day 2 – Auth UI + Deployment**

* Create React Router structure.
* Build Sign up/Login pages with form validation.
* Connect to backend APIs.
* Deploy backend on Render, frontend on Vercel.

#### **Day 3 – Seller Role & Dashboard**

* Extend User model with `role: buyer/seller`.
* Create protected routes for sellers.
* Design basic seller dashboard layout.
* Implement seller-specific auth & routing.

#### **Day 4 – Product Model & CRUD APIs**

* Design Product schema (`title`, `price`, `desc`, `image`, `sellerId`, `category`, `stock`).
* Implement Create, Read, Update, Delete APIs.
* Secure routes with JWT middleware.

#### **Day 5 – Product Upload & Display**

* Design product upload/edit form for sellers.
* Integrate form with API.
* Display seller-specific product listings on dashboard.

#### **Day 6 – Public Product Listing Page**

* Design public product feed (all products).
* Add basic filters (category, price, etc.).
* Add individual product page (details, seller info).

#### **Day 7 – Testing & Refactoring**

* Test full auth + product flow.
* Add error handling & success toasts.
* Refactor folder structure and optimize codebase.

---

### 🛒 **Week 2: Cart, Orders, Payments, and Polishing**

#### **Day 8 – Shopping Cart**

* Design cart component.
* Allow users to add/remove items.
* Store cart in localStorage or Redux.
* Add cart total + quantity logic.

#### **Day 9 – Razorpay Integration**

* Register Razorpay developer account.
* Implement checkout backend API.
* Connect payment flow from frontend.
* Test successful and failed payments.

#### **Day 10 – Order Model & History**

* Create Order schema (`items`, `total`, `userId`, `status`).
* Store successful orders post-payment.
* Create "My Orders" page for buyers.
* Add order summary in seller dashboard.

#### **Day 11 – Reviews & Ratings**

* Create review model (`user`, `product`, `rating`, `comment`).
* Allow users to review purchased products.
* Display ratings on product cards and details.

#### **Day 12 – Wishlist Feature**

* Allow buyers to "favorite" products.
* Store wishlist in backend or localStorage.
* Add wishlist page for easy browsing.

#### **Day 13 – UI Polishing & Responsiveness**

* Make all pages mobile-friendly.
* Add loading states, error boundaries.
* Improve dashboard design (icons, modals).

#### **Day 14 – Final Testing & Deployment**

* End-to-end testing of all flows.
* Fix any bugs or edge cases.
* Final push to GitHub.
* Update README + create project presentation/demo video.

---

## ✅ Future Improvements

* Admin dashboard for monitoring sellers/products.
* Shipping & delivery integration.
* Notifications system (emails/SMS).
* Analytics dashboard for sellers.
* Category-wise homepage customization.