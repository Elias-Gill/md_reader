/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        plugins: [],
        extend: {
            colors: {
                background: "#2c2c2c",
                sidebar: "#343434"
            },
            maxWidth: {
                128: "96rem"
            },
            minWidth: {
                custom: "400px"
            },
            width: {
                "sidebar-xl": "345px",
                "sidebar-lg": "245px",
            }
        }
    }
};
