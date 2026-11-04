
import Link from "next/link";
import Header from "@/components/header";
import Ticker from "@/components/ticker";
import ProductCard from "@/components/product-card";
import { getProducts } from "@/lib/products";

export const revalidate = 300;

export default async function Home() {
  const p = await getProducts();

  const up = [...p]
    .filter((x) => x.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 6);

  const down = [...p]
    .filter((x) => x.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 6);

  return (
    <>
      <Header />
      <Ticker products={p} />

      <section className="hero">
        <div className="wrap herogrid">
          <div>
            <span className="eyebrow">আপনার প্রতিদিনের বাজারদর</span>
            <h1>
              বাজারের সঠিক খবর,
              <br />
              <em>আপনার হাতেই।</em>
            </h1>
            <p>
              বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর জানুন সহজেই।
              দাম দেখুন, তুলনা করুন এবং সচেতনভাবে বাজার করুন।
            </p>
            <a className="btn primary cta" href="#সব-পণ্য">
              সব পণ্যের দাম দেখুন ↓
            </a>
          </div>
          <div className="heroart">🥬 🥕 🍅 🧅</div>
        </div>
      </section>

      <main className="wrap">
        <section className="section">
          <div className="sectiontitle">
            <div>
              <h2>📈 দাম বেড়েছে</h2>
              <p>যেসব পণ্যের দামে ঊর্ধ্বগতি</p>
            </div>
          </div>

          {up.length ? (
            <div className="grid">
              {up.map((x) => (
                <ProductCard key={x.id} product={x} />
              ))}
            </div>
          ) : (
            <div className="empty">দাম বৃদ্ধির তথ্য নেই।</div>
          )}
        </section>

        <section className="section">
          <div className="sectiontitle">
            <div>
              <h2>📉 দাম কমেছে</h2>
              <p>যেসব পণ্যের দামে নিম্নগতি</p>
            </div>
          </div>

          {down.length ? (
            <div className="grid">
              {down.map((x) => (
                <ProductCard key={x.id} product={x} />
              ))}
            </div>
          ) : (
            <div className="empty">দাম কমার তথ্য নেই।</div>
          )}
        </section>

        <section className="section" id="সব-পণ্য">
          <div className="sectiontitle">
            <div>
              <h2>🛒 সব পণ্য</h2>
              <p>নিত্যপ্রয়োজনীয় পণ্যের তালিকা</p>
            </div>
            <span>{p.length} টি পণ্য</span>
          </div>

          <div className="grid">
            {p.map((x) => (
              <ProductCard key={x.id} product={x} />
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <b className="brand">বাজার দর</b>
          <p>বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর জানার সহজ প্ল্যাটফর্ম।</p>
          <Link href="/signin">লগইন</Link>　
          <Link href="/signup">নিবন্ধন</Link>
          <p>© {new Date().getFullYear()} BazarDor. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
