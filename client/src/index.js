import React from "react";
import App from "./components/App";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; 
// import './styles/output.css';
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);
// root.render(<App />);
root.render(
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  );
