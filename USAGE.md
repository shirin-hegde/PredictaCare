# PredictaCare Usage Guide

This guide explains how to set up, run, and use the PredictaCare healthcare platform.

## 📋 Prerequisites

Before running PredictaCare, ensure you have the following installed:
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Git (for version control)

## 🚀 Quick Start

### 1. Initial Setup

Run the setup script to install all dependencies:
```batch
setup.bat
```

### 2. Environment Configuration

Update the following `.env` files with your configuration:

#### Backend (.env in backend directory)
```env
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/predictacare

# JWT Secrets (change to secure values)
JWT_SECRET=predictacare_jwt_secret_key
ADMIN_JWT_SECRET=predictacare_admin_jwt_secret_key
DOCTOR_JWT_SECRET=predictacare_doctor_jwt_secret_key

# Cloudinary Configuration (provided)
CLOUDINARY_NAME=Root
CLOUDINARY_API_KEY=657849328131895
CLOUDINARY_SECRET_KEY=B-2mdm0O9U2skLZB3LvqAzku-p8

# Razorpay Configuration (optional)
RAZORPAY_ID=your_razorpay_id
RAZORPAY_SECRET=your_razorpay_secret

# Blockchain Configuration (optional)
CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
ADMIN_PRIVATE_KEY=
SEPOLIA_RPC_URL=

# Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key

# Port Configuration
PORT=4000
```

#### Frontend (.env in frontend directory)
```env
VITE_BACKEND_URL=http://localhost:4000
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_GEMINI_MODEL=gemini-pro-latest
```

#### Admin (.env in admin directory)
```env
VITE_BACKEND_URL=http://localhost:4000
```

### 3. Starting the Application

#### Development Mode
```batch
start-dev.bat
```

This will start:
- Backend Node.js server on port 4000
- Python Flask ML server on port 5000
- Frontend React app on port 5173
- Admin panel React app on port 5174

#### Production Mode
```batch
start-prod.bat
```

This will build all components and start the production server on port 4000.

### 4. Accessing the Application

After starting the development servers, access the applications at:
- **Patient Frontend**: http://localhost:5173
- **Admin Panel**: http://localhost:5174
- **Backend API**: http://localhost:4000

## 🔧 Features and Usage

### Patient Features

1. **Disease Prediction**
   - Navigate to the Prediction page
   - Select a disease (Heart, Diabetes, PCOS, or Stroke)
   - Fill in the required medical parameters
   - Click "Predict" to get risk assessment

2. **AI Health Suggestions**
   - After getting a prediction, click "AI Suggestions"
   - Receive personalized health advice based on your data

3. **AI Chatbot**
   - Click the chatbot icon in the bottom right
   - Ask medical questions or get general health advice

4. **Doctor Appointments**
   - Browse doctors and book appointments
   - View appointment history

5. **Health Records**
   - View prediction history and certificates
   - Download PDF certificates of predictions

### Admin Features

1. **Doctor Management**
   - Add, edit, and remove doctors
   - Manage doctor profiles and availability

2. **Prediction Review**
   - Review patient predictions
   - Upload predictions to blockchain (if configured)

3. **Appointment Management**
   - View and manage all appointments
   - Cancel appointments if necessary

4. **Dashboard Analytics**
   - View system statistics and analytics

### Doctor Features

1. **Appointment Management**
   - View upcoming appointments
   - Manage appointment schedule

2. **Patient Records**
   - Access patient prediction history
   - Review patient health data

## 🛠️ Technical Details

### Project Structure
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

### API Endpoints

#### Authentication
- `POST /api/user/register` - Patient registration
- `POST /api/user/login` - Patient login
- `POST /api/admin/login` - Admin login
- `POST /api/doctor/login` - Doctor login

#### Predictions
- `POST /api/predict/:disease` - Disease prediction
- `POST /api/predictions/savePrediction` - Save prediction
- `GET /api/predictions/user` - Get user predictions

#### User Management
- `GET /api/user/profile` - Get user profile
- `POST /api/user/update-profile` - Update user profile

#### Doctor Management
- `POST /api/admin/add-doctor` - Add doctor (admin only)
- `GET /api/admin/all-doctors` - Get all doctors
- `POST /api/doctor/change-availability` - Change doctor availability

### Disease Prediction Models

1. **Heart Disease**
   - Parameters: age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal
   - Model: Neural network

2. **Diabetes**
   - Parameters: age, hypertension, heart_disease, bmi, HbA1c_level, blood_glucose_level, gender, smoking_history
   - Model: Neural network

3. **PCOS**
   - Parameters: Age (yrs), BMI, AMH(ng/mL), LH(mIU/mL), FSH(mIU/mL), FSH/LH, Cycle length(days), Cycle(R/I), Weight gain(Y/N), hair growth(Y/N), Skin darkening (Y/N), Hair loss(Y/N), Pimples(Y/N), Follicle No. (L), Follicle No. (R), Avg. F size (L) (mm), Avg. F size (R) (mm), TSH (mIU/L), Endometrium (mm), PRL(ng/mL)
   - Model: Neural network

4. **Stroke**
   - Parameters: Chest Pain, Shortness of Breath, Irregular Heartbeat, Fatigue & Weakness, Dizziness, Swelling (Edema), Excessive Sweating, Persistent Cough, Nausea/Vomiting, High Blood Pressure, Chest Discomfort (Activity), Cold Hands/Feet, Anxiety/Feeling of Doom, Age
   - Model: Neural network

## 🔄 Batch Scripts

### start-dev.bat
Starts all development servers concurrently.

### start-prod.bat
Builds and starts the production server.

### health-check.bat
Checks if all required services are running.

### setup.bat
Installs all dependencies for the project.

### stop-all.bat
Stops all running services.

## 🔒 Security Considerations

1. **JWT Tokens**
   - Use strong, random secrets for JWT signing
   - Implement token expiration and refresh mechanisms

2. **Database Security**
   - Use strong passwords for MongoDB
   - Implement proper access controls
   - Regularly backup data

3. **API Security**
   - Rate limiting is implemented
   - CORS is configured properly
   - Input validation is performed

## 📊 Performance Optimization

1. **Caching**
   - Implement Redis caching for frequently accessed data
   - Cache prediction results where appropriate

2. **Database Indexing**
   - Ensure proper indexes on frequently queried fields
   - Use MongoDB aggregation pipelines for complex queries

3. **Frontend Optimization**
   - Code splitting for React components
   - Image optimization with Cloudinary
   - Lazy loading for non-critical resources

## 🐛 Troubleshooting

### Common Issues

1. **"Module not found" errors**
   - Run `setup.bat` to reinstall dependencies
   - Check if all `.env` files are properly configured

2. **MongoDB connection errors**
   - Ensure MongoDB is running
   - Check `MONGO_URI` in backend `.env`

3. **Prediction service not working**
   - Ensure Python Flask server is running on port 5000
   - Check if ML models are in the correct directories

4. **AI features not working**
   - Verify Gemini API key is valid
   - Check if the API key has proper permissions

### Health Checks

Run `health-check.bat` to verify all services are running properly.

## 📈 Future Enhancements

1. **Mobile Application**
   - React Native mobile app for iOS and Android

2. **Advanced Analytics**
   - Machine learning for pattern recognition in health data
   - Predictive analytics for disease outbreaks

3. **Telemedicine Features**
   - Video consultation capabilities
   - Real-time health monitoring integration

4. **Enhanced Security**
   - Two-factor authentication
   - End-to-end encryption for sensitive data

## 📞 Support

For issues, questions, or contributions, please:
1. Open an issue on GitHub
2. Contact the development team
3. Refer to the documentation in each component directory