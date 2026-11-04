import { notFound } from "next/navigation";
import Header from "@/components/header";
import ProductCard from "@/components/product-card";
import { getProducts, getCategories } from "@/lib/products";
import SortProducts from "./sort-products";

export default async function Category({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const { slug } = await params;
  const { sort } = await searchParams;

  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const category = categories.find((x) => x.slug === slug);

  const list = products.filter((x) => x.categorySlug === slug);

  if (!category && list.length === 0) {
    notFound();
  }

  if (sort === "low") {
    list.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    list.sort((a, b) => b.price - a.price);
  }

  return (
    <>
      <Header />

      <main className="wrap page">
        <p className="muted">
          হোম / {category?.name ?? list[0]?.category}
        </p>

        <div className="sectiontitle">
          <div>
            <h1>
              {category?.icon ?? "🛒"}{" "}
              {category?.name ?? list[0]?.category}
            </h1>
            <p>এই বিভাগের পণ্যের বাজারদর</p>
          </div>

          <SortProducts current={sort ?? "default"} />
        </div>

        {list.length > 0 ? (
          <div className="grid">
            {list.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty">এই বিভাগে কোনো পণ্য নেই।</div>
        )}
      </main>
    </>
  );
}