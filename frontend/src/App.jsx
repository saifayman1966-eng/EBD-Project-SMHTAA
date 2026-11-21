
import ProductList from "./components/ProductList.jsx";
import { openRestockInterface } from "../restock.js";

export default function App() {
  return (
    <>
      <button
        onClick={() => openRestockInterface("demo-product")}
        style={{
          position: "fixed",
          top: "100px",
          right: "20px",
          zIndex: 9999,
          padding: "15px 25px",
          background: "#321444",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Test Restock Interface
      </button>

      <ProductList onRequestRestock={openRestockInterface} />
    </>
  );
}
