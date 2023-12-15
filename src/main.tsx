import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./styles.css";
import 'file-icons-js/css/style.css';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
