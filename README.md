## 📌 **News Aggregator**  

A **modern and responsive news aggregator** that fetches real-time news from **NewsAPI, The Guardian, and The New York Times**.  
It allows users to **search for news, filter by category, date, and source, personalize their feed**, and features **infinite scrolling**.  

🔗 **Live Demo:** [news-aggregator-pk.vercel.app](https://news-aggregator-pk.vercel.app/)  
📂 **GitHub Repository:** [news-aggregator](https://github.com/pushpendrakukreti/news-aggregator)  

---

## 🎯 **Features**  

👉 **Search & Filtering** – Search for news and filter by date, category, and source  
👉 **Personalized News Feed** – Save preferred categories and sources for customized news  
👉 **Infinite Scrolling** – Loads 15 articles at a time for a seamless browsing experience  
👉 **Mobile Responsive** – Optimized for all screen sizes using SCSS  
👉 **Dark Mode Support** – Easily toggle between light and dark modes  
👉 **Fully Containerized** – Runs smoothly in a Docker environment  

---

## 🛠 **Tech Stack**  

- **Frontend:** React.js (Vite) + TypeScript  
- **State Management:** React Hooks  
- **Styling:** SCSS  
- **APIs:** NewsAPI, The Guardian, NYTimes  
- **Deployment:** Vercel  
- **Containerization:** Docker  

---

## 🚀 **Installation & Setup**  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/pushpendrakukreti/news-aggregator.git
cd news-aggregator
```

### **2️⃣ Install Dependencies**  
```sh
npm install
```

### **3️⃣ Create a `.env` File**  

Create a `.env` file in the project root and add your API keys:  
```env
VITE_NEWS_API_KEY=your_newsapi_key_here
VITE_GUARDIAN_API_KEY=your_guardian_key_here
VITE_NYTIMES_API_KEY=your_nytimes_key_here
```

### **4️⃣ Run the Project Locally**  
```sh
npm run dev
```

---

## 🌍 **Deployment**  

### **Deploy to Vercel**  
```sh
npm run build
vercel deploy
```

### **Deploy to Netlify**  
```sh
npm run build
netlify deploy
```

---

## 🔥 **Folder Structure**  

```
news-aggregator/
│️── src/
│    ├── api/             # API calls
│    ├── components/      # UI components (Search, Filters, Preferences)
│    ├── pages/           # Pages (Home, Profile, etc.)
│    ├── styles/          # SCSS styles
│    ├── App.tsx          # Main App component
│    ├── main.tsx         # Entry point
│️
│️── public/
│️── .env                 # API keys
│️── Dockerfile           # Docker setup
│️── docker-compose.yml   # Docker Compose setup
│️── tsconfig.json        # TypeScript config
│️── vite.config.ts       # Vite config
│️── README.md            # Documentation
│️── package.json         # Dependencies
│️── .gitignore           # Ignore unnecessary files
```

---

## ⚠ **Known Issues & Fixes**  

### ❌ **426 Upgrade Required (NewsAPI Not Working in Production)**  
🔹 **Reason:** NewsAPI does not allow frontend requests without proper CORS handling.  
🔹 **Fix:**  
- In **local development**, NewsAPI works fine.  
- In **production**, the NewsAPI request is **commented out** to avoid breaking the app.  
- The team can **uncomment it in `news.ts` for localhost testing**.  

### ❌ **CORS Issues in Production**  
🔹 **Reason:** APIs like NYTimes and The Guardian may block frontend requests.  
🔹 **Fix:**  
- A **CORS proxy (e.g., `cors-anywhere.herokuapp.com`)** is used to bypass CORS in production.  
- Alternatively, **deploy a simple backend proxy on Vercel**.  

---

## 🤝 **Contributing**  

💡 **Want to improve this project?** Contributions are welcome!  

1. **Fork the repository**  
2. **Create a new branch** (`feature/new-feature`)  
3. **Commit changes** (`git commit -m "Added new feature"`)  
4. **Push to GitHub** (`git push origin feature/new-feature`)  
5. **Submit a Pull Request**  

---

## 📧 **Contact & Feedback**  

📩 **Email:** [kukretipushpendra@gmail.com]

---


