"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortProducts({
  current,
}: {
  current: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSort(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    const query = params.toString();

    router.push(query ? `?${query}` : "?");
  }

  return (
    <select
      className="sort"
      value={current}
      onChange={(e) => handleSort(e.target.value)}
      aria-label="পণ্য সাজানোর পদ্ধতি"
    >
      <option value="default">ডিফল্ট সাজানো</option>
      <option value="low">দাম: কম থেকে বেশি</option>
      <option value="high">দাম: বেশি থেকে কম</option>
    </select>
  );
}