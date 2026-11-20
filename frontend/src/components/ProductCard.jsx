import { useEffect, useRef } from "react";
import { createProductCard } from "../../product-card.js";

export default function ProductCard({ product, onAddToCart, onRequestRestock }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const card = createProductCard(product, { onAddToCart, onRequestRestock });
    mount.replaceChildren(card);

    return () => mount.replaceChildren();
  }, [product, onAddToCart, onRequestRestock]);

  return <div className="product-card-mount" ref={mountRef} />;
}
