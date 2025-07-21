

## 🔗 GitHub Repository Links

* **Frontend:** [cleanServiceBooking-metasync](https://github.com/karuna3laka/cleanServiceBooking-metasync)
* **Backend:** [cleanServiceBookingBE-metasync](https://github.com/karuna3laka/cleanServiceBookingBE-metasync)

---

## 📌 Initial Planning

The project was designed to simulate a full-stack cleaning service booking system using:

* **Frontend:** React + Vite + Firebase Auth + Firestore
* **Backend:** Flask + Firebase Admin SDK
* **Deployment:** Firebase Hosting (Frontend)

**Core Features:**

* Firebase authentication (Sign up / Sign in)
* Service booking form (with user info and time/date)
* Firestore storage of bookings
* Admin dashboard to view/edit bookings (only for authorized admin)

---

## 🔐 Test Admin Credentials

To access **admin features**, please log in using:

* **Email:** `admin@example.com`
* **Password:** `admin@example.com`

**Steps:**

1. Login with the above credentials.
2. Click the **"Are you admin?"** button on the **top-center** of the home page.
3. You will be redirected to the **Admin Dashboard** (if verified as admin in Firestore).

---

## 🧪 User Instructions

### ✅ Regular Client Usage

* Any user can **register** and **book services** via the main interface.
* Auth & Firestore handle secure data and bookings.

---

## 🚀 How to Run the Application Locally

### 🔧 Backend (Flask + Firebase Admin SDK)

1. Navigate to the backend folder:

   ```bash
   cd metasyncBE-1
   ```

2. Create and activate a virtual environment:

   **Windows:**

   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```

   **Mac/Linux:**

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Add your Firebase Admin credentials to a `.env` or config file (not pushed to GitHub for security).

5. Run the Flask API:

   ```bash
   python app.py
   ```

   > Flask runs by default on `http://localhost:5000`

---

### 💻 Frontend (React + Vite + Firebase)

1. Navigate to the frontend folder:

   ```bash
   cd metasync-cleanService
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

   > This runs the app locally at `http://localhost:3071`

---

## 🌐 Live Demo (Frontend Only)

You can view the live frontend here:
👉 [https://kavindu2002-04270.web.app](https://kavindu2002-04270.web.app)

> ⚠️ **Note:** Backend deployment was not completed before the deadline, so admin features requiring backend support may not function fully on the live site.

---

## 📩 Submission Details

* **Submission Email:** Sent to `careers@metazync.com`
* **Subject:** Cleaning Service Assignment Submission – Kavindu Karunathilaka
* **Attached:** GitHub links and this document

---

**Thank you for the opportunity!**
*Kavindu Karunathilaka*
📧 [careers@metazync.com](mailto:careers@metazync.com)

---

Let me know if you want this in **PDF**, **DOCX**, or any specific format for submission.
<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# cleanServiceNooking-metasync
Assesment 
>>>>>>> 6a5f4a2cd207074cef9ec4194ce2fdad45872940
