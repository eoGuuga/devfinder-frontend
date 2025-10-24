# DevFinder Pro Frontend 🚀

User interface (Frontend) for the DevFinder Pro application, built with React, Vite, and Framer Motion. Consumes the neural search API to find GitHub developer profiles.

**[➡️ Live Demo!](https://devfinder-3w8r.onrender.com)** | **[➡️ Backend API (Hugging Face)](https://eoGuuga-devfinder-api.hf.space)**

## 📖 About

This is a Single-Page Application (SPA) serving as the face of DevFinder Pro. It allows users to enter a natural language query (e.g., "python developer with machine learning experience") and displays a dynamic gallery of GitHub developer profiles that semantically match the search.

The application consumes the [DevFinder Pro API](https://eoGuuga-devfinder-api.hf.space) (hosted separately) to retrieve the AI-ranked results.

---

## ✨ Features (The "TCHAN")

- **Semantic Search:** Find developers based on descriptions of skills and projects, not just names.
- **Dynamic Gallery:** Displays results in a responsive grid layout.
- **Relevance Visualization:** The style (opacity, border) of each profile card reflects the AI similarity score, highlighting the most relevant results.
- **Fluid Animations:** Uses `Framer Motion` for smooth cascading entry animations and subtle hover effects, providing a polished user experience.
- **Loading & Error States:** Provides clear visual feedback during searches and in case of failures.
- **Responsive Design:** Interface adapts gracefully to different screen sizes.

---

## 🛠️ Tech Stack

- **React:** JavaScript library for building the component-based user interface.
- **Vite:** Modern and fast build tool for the development environment.
- **JavaScript (ES6+):** Core language of the application.
- **CSS3:** Styling with CSS variables, Grid/Flexbox layout.
- **Framer Motion:** Library for complex and performant animations in React.
- **Fetch API:** For making asynchronous calls to the backend API.
- **Render (Static Site):** Hosting platform for the static frontend application.
- **Environment Variables (`.env`):** For configuring the backend API URL.

---

## 🚀 Running Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/eoGuuga/devfinder-frontend.git](https://github.com/eoGuuga/devfinder-frontend.git)
    cd devfinder-frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure Environment Variable:**
    * Create a `.env` file in the project root.
    * Add the URL of your backend API (local or deployed):
      ```
      VITE_API_URL=[http://127.0.0.1:8000](http://127.0.0.1:8000) 
      # Or use [https://eoGuuga-devfinder-api.hf.space](https://eoGuuga-devfinder-api.hf.space) to test with the live API
      ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```
5.  The application will be available at `http://localhost:5173` (or another port indicated by Vite).

**Prerequisite:** For the search to work, the DevFinder Pro backend API must be running (locally or online) and accessible at the URL configured in the `.env` file.

---

## 👨‍💻 Author

Made with ❤️ by **Gustavo Henrick**.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gustavo-henrick-dev20/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/eoGuuga)