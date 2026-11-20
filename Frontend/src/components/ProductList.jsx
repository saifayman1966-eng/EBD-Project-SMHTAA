import { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard.jsx";
import "./ProductList.css";

const PRODUCTS_URL = "http://localhost:3000/api/products";

export default function ProductList({ onAddToCart, onRequestRestock }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [family, setFamily] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const response = await fetch(PRODUCTS_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Could not load perfumes. Please try again later.");
        }

        const data = await response.json();

        if (!Array.isArray(data.products)) {
          throw new Error("The products response has an unexpected format.");
        }

        setProducts(data.products.filter((product) => product.isActive !== false));
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Could not load perfumes.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => controller.abort();
  }, []);

  const families = useMemo(() => {
    const values = products.flatMap((product) =>
      Array.isArray(product.fragranceFamilies)
        ? product.fragranceFamilies
        : [],
    );

    return [...new Set(values)].sort((a, b) => a.localeCompare(b));
  }, [products]);

  const visibleProducts = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const searchableText = [
        product.name,
        product.description,
        ...(product.scentNotes || []),
        ...(product.fragranceFamilies || []),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(searchText);
      const matchesFamily =
        !family || (product.fragranceFamilies || []).includes(family);

      return matchesSearch && matchesFamily;
    });

    return filtered.sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return a.name.localeCompare(b.name);
    });
  }, [products, search, family, sortBy]);

  if (loading) {
    return <p role="status">Loading perfumes...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <section className="product-listing" aria-labelledby="products-heading">
      <h2 id="products-heading">Explore perfumes</h2>

      <div className="product-controls">
        <label>
          Search perfumes
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name or scent"
          />
        </label>

        <label>
          Fragrance family
          <select
            value={family}
            onChange={(event) => setFamily(event.target.value)}
          >
            <option value="">All families</option>
            {families.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label>
          Sort by
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="name">Name</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </label>
      </div>

      {visibleProducts.length === 0 ? (
        <p>No perfumes match your search.</p>
      ) : (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product._id ?? product.id}
              product={product}
              onAddToCart={onAddToCart}
              onRequestRestock={onRequestRestock}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// Cart and restock actions are supplied by their respective flows when connected.
