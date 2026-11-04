export default function Loading() {
  return (
    <main className="wrap page">
      <h2>Loading...</h2>

      <div className="grid">
        {Array.from({ length: 6 }, (_, i) => (
          <div className="skeleton card-skel" key={i} />
        ))}
      </div>

      <p>বাজারদরের তথ্য লোড হচ্ছে...</p>
    </main>
  );
}