# DevFinder Pro Frontend 🚀

Modern and interactive user interface for DevFinder Pro, built with React, Vite, and Framer Motion. Consumes the DevFinder Pro API to enable semantic and direct search for GitHub developer profiles.

**[➡️ Live Demo!](https://devfinder-3w8r.onrender.com)** | **[➡️ Backend API (Hugging Face)](https://eoGuuga-devfinder-api.hf.space)**

## 📖 About

This Single-Page Application (SPA) serves as the primary interface for interacting with the DevFinder Pro system. It offers two distinct search modes:

1.  **Semantic Search (AI):** Allows users to input natural language queries (e.g., "python developer interested in IoT projects in Brazil") to discover relevant GitHub profiles based on semantic similarity, powered by the backend API's AI model and Pinecone index.
2.  **Username Search:** Enables users to directly look up a specific GitHub profile by entering the exact username, fetching data in real-time from the backend API (which calls the GitHub API).

The interface is designed to be visually engaging and informative, featuring dynamic layouts, subtle animations, and clear presentation of search results.

---

## ✨ Features (The "TCHAN")

- **Hybrid Search Interface:** Clear toggle between Semantic (AI) and Direct Username search modes.
- **Semantic Search Results:** Displays AI-ranked profiles based on query relevance.
- **Direct Profile Lookup:** Fetches and displays detailed profile information, including recent repositories.
- **Dynamic Gallery Layout:** Renders results in a responsive grid.
- **Relevance Visualization (Semantic Search):** Card styling (e.g., opacity) subtly reflects the AI similarity score.
- **Interactive 3D Cards:** Profile cards tilt and react to mouse movement with parallax effects and dynamic glare.
- **Fluid Animations:** Smooth entry animations for results (using `Framer Motion`) and polished hover effects.
- **Skeleton Loaders:** Provides a professional loading state experience.
- **Light/Dark Theme:** User-selectable light and dark modes with persistent preference.
- **Accessible Design (A11y):** Implemented semantic HTML, ARIA attributes, and keyboard navigation support.
- **Responsive Design:** Adapts gracefully to various screen sizes.
- **Animated Background:** Subtle particle animations using `react-tsparticles` enhance the visual appeal.

---

## 🛠️ Tech Stack

- **React:** JavaScript library for building the component-based UI.
- **Vite:** Modern frontend build tool.
- **JavaScript (ES6+):** Core application language.
- **CSS3:** Styling with CSS variables (for themes), Grid/Flexbox, and custom animations/effects.
- **Framer Motion:** Library for declarative animations in React.
- **React Icons:** For scalable vector icons.
- **react-tsparticles:** For the animated particle background.
- **Fetch API:** For asynchronous calls to the backend API.
- **Render (Static Site):** Hosting platform for the static frontend application.
- **Environment Variables (`.env`):** Configuration for the backend API URL (`VITE_API_URL`).
- **Context API (React):** For global theme state management.

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
    * Add the URL of your running backend API (local or deployed):
      ```
      VITE_API_URL=[http://127.0.0.1:8000](http://127.0.0.1:8000) 
      # Or use [https://eoGuuga-devfinder-api.hf.space](https://eoGuuga-devfinder-api.hf.space) if testing against the live API
      ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```
5.  The application will be available at `http://localhost:5173` (or another port indicated by Vite).

**Prerequisite:** The DevFinder Pro backend API must be running and accessible at the URL configured in the `.env` file for searches to work.

---

## 👨‍💻 Author

Developed with 🐍 by **Gustavo Henrick**.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gustavo-henrick-dev20/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/eoGuuga)