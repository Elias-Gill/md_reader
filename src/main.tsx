import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <div className="bg-background text-white">
            <App />
        </div>
    </React.StrictMode>
);
