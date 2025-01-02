import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import { Provider } from "react-redux"; // Import Redux Provider
import App from "./App"; // Import the App component
import { store } from "./app/store"; // Import the Redux store

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}> {/* Provide the Redux store */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
