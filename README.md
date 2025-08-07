# 🛍️ ShopEZ Buyer Assistant - Node.js Backend

This is the backend service for the **ShopEZ Buyer Assistant**, a smart chatbot that answers customer queries using AI. It exposes an API to receive user questions, sends them to an internal Python microservice for response generation, and returns the chatbot's reply to the frontend.

---

## 🚀 Features

- 🌐 RESTful API with Express.js
- 📦 Python microservice integration (LangChain, Pinecone, OpenAI)
- 🧠 Session-based context using UUIDs
- 🧰 Robust error handling and validation
- 🔒 CORS & environment-based configuration

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **Axios** (for calling Python microservice)
- **dotenv** (for environment management)
- **uuid** (for session management)
- **CORS**

---

## 📁 Project Structure

```

backend/
├── controllers/
│   └── chatController.ts      # Handles incoming chat requests
├── routes/
│   └── chatRoutes.ts          # Defines /api/chat endpoint
├── utils/
│   └── validateInput.ts       # Optional: Input validation logic
├── app.ts                     # Express app config
├── server.ts                  # Entry point
├── .env                       # Environment variables
├── package.json
└── tsconfig.json              # TypeScript config

````

---

## 📦 Installation

```bash
git clone https://github.com/yourusername/shopez-backend.git
cd shopez-backend
npm install
````

---

## ⚙️ Environment Variables

Create a `.env` file in the root of the backend with the following:

```
PORT=5000
PYTHON_API_URL=http://localhost:8000/chat
```

* `PORT`: The port this backend server runs on.
* `PYTHON_API_URL`: The URL of your Python microservice (LangChain + Pinecone).

---

## ▶️ Running the Server

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

---

## 🔄 API Endpoint

### POST `/api/chat`

Sends a user message to the chatbot.

#### 📥 Request Body:

```json
{
  "message": "What is your return policy?",
  "sessionId": "f309b91e-1eaa-48f2-93dc-14e809a7f932"
}
```

#### 📤 Response:

```json
{
  "results": [
    {
      "text": "Our return policy allows returns within 30 days of delivery..."
    }
  ]
}
```

---

## 🧪 Sample CURL Request

```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Where is my order?", "sessionId": "1234-5678"}'
```
