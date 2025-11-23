# PredictaCare

PredictaCare is a **comprehensive healthcare platform** designed to revolutionize online medical consultations, provide seamless medicine purchases, and integrate AI-powered chatbot assistance. The project aims to bridge the gap between patients and healthcare services by offering a user-friendly, secure, and efficient platform. Additionally, we integrate **blockchain technology** to securely store patient data, ensuring transparency and immutability while supporting predictive healthcare models. 

This project is being developed for **a Patent Release**, by the following team members:

- [**Aiswariya Das**](https://github.com/aiswariya13)
- [**Srilekha Roy**](https://github.com/srilu-roy)
- [**Debjit Saha**](https://github.com/ErenYeager2004)

---

## 🌐 Live Preview

Check out the live version of PredictaCare here:  
🔗 [https://predictacare-1.onrender.com/](https://predictacare-1.onrender.com/)

---

## 🚀 Key Features

- **🤖 AI-Powered Chatbot** – An intelligent chatbot that assists users by answering medical queries and guiding them to relevant healthcare solutions.
- **🧬 Predictive Disease Model** – AI-driven models to predict the probability of diseases such as **Heart Disease, Stroke, PCOS, and Diabetes**, helping users assess their health risks early and take preventive measures.
- **📑 Blockchain-Powered Health Records** – Store and manage patient health records securely on the blockchain, ensuring immutability and privacy while enabling AI model training for predictive healthcare.

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** (for version control)

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shirin-hegde/PredictaCare.git
   cd PredictaCare
   ```

2. **Install dependencies for all components:**
   ```bash
   npm run build
   ```

## ⚙️ Environment Configuration

### Backend Configuration
Create a `.env` file in the `backend` directory with the following variables:

```env
# MongoDB Configuration
MONGO_URI=your_mongodb_connection_string

# JWT Secrets
JWT_SECRET=your_jwt_secret_key
ADMIN_JWT_SECRET=your_admin_jwt_secret_key
DOCTOR_JWT_SECRET=your_doctor_jwt_secret_key

# Cloudinary Configuration
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

# Razorpay Configuration
RAZORPAY_ID=your_razorpay_id
RAZORPAY_SECRET=your_razorpay_secret

# Blockchain Configuration (Optional)
CONTRACT_ADDRESS=your_contract_address
ADMIN_PRIVATE_KEY=your_admin_private_key
SEPOLIA_RPC_URL=your_sepolia_rpc_url

# Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key

# Port Configuration
PORT=4000
```

### Frontend Configuration
The frontend `.env` file is already configured:
```env
VITE_BACKEND_URL=http://localhost:4000
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_GEMINI_MODEL=gemini-pro-latest
```

### Admin Panel Configuration
The admin panel `.env` file is already configured:
```env
VITE_BACKEND_URL=http://localhost:4000
```

## ▶️ Running the Application

### Development Mode

1. **Start all services in development mode:**
   ```bash
   npm run dev
   ```
   This will start both the Node.js backend and Python Flask servers concurrently.

2. **Start frontend separately:**
   ```bash
   npm run frontend
   ```

3. **Start admin panel separately:**
   ```bash
   npm run admin
   ```

### Production Mode

1. **Build all components:**
   ```bash
   npm run build
   ```

2. **Start the production server:**
   ```bash
   npm run node-backend
   ```

## 📁 Project Structure

```
PredictaCare/
├── frontend/          # React frontend for patients
├── admin/             # React admin dashboard
├── backend/           # Node.js backend API
│   ├── predictionModel/ # ML models and scalers
│   ├── Logistic_PredictionModels/ # Logistic regression models
│   ├── controllers/   # API controllers
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   └── config/        # Configuration files
├── blockchain/        # Smart contracts
└── README.md
```

## 🧪 Testing the Application

1. **Start MongoDB service** on your local machine or ensure your MongoDB Atlas connection is working.

2. **Run the development servers:**
   ```bash
   npm run dev
   ```

3. **In a new terminal, start the frontend:**
   ```bash
   npm run frontend
   ```

4. **In another terminal, start the admin panel:**
   ```bash
   npm run admin
   ```

5. **Access the applications:**
   - Patient Frontend: http://localhost:5173
   - Admin Panel: http://localhost:5174
   - Backend API: http://localhost:4000

## 🔄 Batch Scripts for Easy Execution

### Windows Batch Files

1. **Start Development Environment** (`start-dev.bat`):
   ```batch
   @echo off
   echo Starting PredictaCare Development Environment...
   start "Backend & ML" npm run dev
   timeout /t 10
   start "Frontend" npm run frontend
   start "Admin Panel" npm run admin
   echo All services started successfully!
   pause
   ```

2. **Start Production Environment** (`start-prod.bat`):
   ```batch
   @echo off
   echo Starting PredictaCare Production Environment...
   npm run build
   node backend/server.js
   echo Server started successfully!
   pause
   ```

3. **Health Check** (`health-check.bat`):
   ```batch
   @echo off
   echo Checking PredictaCare Health...
   curl -f http://localhost:4000/health || echo "Backend is not running"
   curl -f http://localhost:5000/ || echo "ML Server is not running"
   echo Health check completed.
   pause
   ```

## 📊 Disease Prediction Models

The application includes prediction models for:
- **Heart Disease** - 13 parameters
- **Diabetes** - 8 parameters
- **PCOS** - 16 parameters
- **Stroke** - 14 parameters

Each model requires specific input parameters which are validated before prediction.

## 🔐 User Roles

1. **Patient** - Access to prediction tools, chatbot, and personal health records
2. **Doctor** - Access to patient records and appointment management
3. **Admin** - Full access to manage doctors, patients, and predictions

## 🤝 Contribution Guidelines

We welcome contributions to enhance MediHub! If you'd like to contribute, follow these steps:

```sh
git checkout -b feature-branch
git commit -m "Implemented new feature"
git push origin feature-branch
```

For major changes, please open an issue first to discuss the proposed modifications. Contributions should align with the project's goals and maintain code quality.

---

## 📩 Contact

For inquiries, collaborations, or issues, feel free to reach out via GitHub Issues or connect with the team directly.