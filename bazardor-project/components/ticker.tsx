import type { Product } from "@/lib/products";

export default function Ticker({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="ticker">
        <div className="tickertrack">
          <span>বর্তমানে বাজারদরের তথ্য পাওয়া যাচ্ছে না।</span>
        </div>
      </div>
    );
  }

  const items = [...products, ...products];

  return (
    <div className="ticker" aria-label="পণ্যের বর্তমান বাজারদর">
      <div className="tickertrack">
        {items.map((product, index) => (
          <span key={`${product.id}-${index}`}>
            {product.emoji} {product.name}{" "}
            <b>
              ৳{new Intl.NumberFormat("bn-BD").format(product.price)}
              /{product.unit}
            </b>{" "}
            <i
              className={
                product.change > 0
                  ? "rise"
                  : product.change < 0
                    ? "fall"
                    : ""
              }
            >
              {product.change > 0
                ? "▲"
                : product.change < 0
                  ? "▼"
                  : "—"}{" "}
              {Math.abs(product.change)}%
            </i>
          </span>
        ))}
      </div>
    </div>
  );
}