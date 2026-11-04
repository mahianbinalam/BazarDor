
export type Product = {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  category: string;
  categorySlug: string;
  unit: string;
  price: number;
  change: number;
  minPrice: number;
  maxPrice: number;
  averagePrice: number;
  summary: string;
  bazars: { name: string; price: number }[];
};

const API = "https://openapi.programming-hero.com/api/bazardor";

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/\s+/g, "-");

const unitName = (unit: string) => {
  const units: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };
  return units[unit] ?? unit;
};

function getList(data: any): any[] {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.products)) return data.products;
  if (Array.isArray(data?.data?.products)) return data.data.products;
  return [];
}

function norm(x: any): Product {
  const markets = Array.isArray(x.markets) ? x.markets : [];

  const marketPrices = markets.map((m: any) => ({
    name: m.market ?? "বাজার",
    price: Math.round(((Number(m.min) || 0) + (Number(m.max) || 0)) / 2),
  }));

  const allMin = markets.map((m: any) => Number(m.min)).filter(Number.isFinite);
  const allMax = markets.map((m: any) => Number(m.max)).filter(Number.isFinite);

  return {
    id: String(x.id),
    slug: String(x.slug ?? slugify(x.nameBn ?? "product")),
    name: String(x.nameBn ?? x.name ?? "পণ্য"),
    emoji: String(x.image ?? x.categoryIcon ?? "🛒"),
    category: String(x.categoryNameBn ?? x.category ?? "অন্যান্য"),
    categorySlug: String(x.category ?? "other"),
    unit: unitName(String(x.unit ?? "kg")),
    price: Number(x.today) || 0,
    change: Number(x.change?.pct) || 0,
    minPrice: allMin.length ? Math.min(...allMin) : Number(x.today) || 0,
    maxPrice: allMax.length ? Math.max(...allMax) : Number(x.today) || 0,
    averagePrice: Number(x.today) || 0,
    summary: `${x.nameBn ?? "পণ্য"} এর বর্তমান বাজারদর`,
    bazars: marketPrices,
  };
}

async function get(path: string) {
  const response = await fetch(API + path, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

export async function getProducts(): Promise<Product[]> {
  try {
    const data = await get("/products");
    const products = getList(data);

    if (products.length) {
      return products.map(norm);
    }

    throw new Error("No products found in API response");
  } catch (error) {
    console.error("Product API error:", error);
    return [];
  }
}

export async function getProduct(s: string): Promise<Product | null> {
  const products = await getProducts();

  const product = products.find(
    (p) => p.slug === s || p.id === s
  );

  if (!product) return null;

  try {
    const data = await get(`/products/${product.id}`);
    const detail = data?.data ?? data?.product ?? data;

    if (
      detail &&
      typeof detail === "object" &&
      (detail.nameBn || detail.name || detail.today !== undefined)
    ) {
      return norm(detail);
    }
  } catch (error) {
    console.warn("Using product list data:", error);
  }

  return product;
}
export async function getCategories() {
  const products = await getProducts();

  const categories = Array.from(
    new Map(
      products.map((product) => [
        product.categorySlug,
        {
          slug: product.categorySlug,
          name: product.category,
          icon: product.emoji,
        },
      ])
    ).values()
  );

  return categories;
}