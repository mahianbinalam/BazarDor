import Link from "next/link";

export default function NotFound() {
  return (
    <main className="notfound">
      <div>
        <h1>404</h1>
        <h2>পাতাটি পাওয়া যায়নি</h2>
        <p>
          দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি খুঁজে পাওয়া যায়নি।
        </p>

        <Link className="btn primary" href="/">
          হোমে ফিরে যান
        </Link>
      </div>
    </main>
  );
}