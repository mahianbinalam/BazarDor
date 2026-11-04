import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Header from "@/components/header";
import ProfileForm from "@/components/profile-form";
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return (
    <>
      <Header />

      <main className="wrap page">
        <div className="sectiontitle">
          <div>
            <h1>আপনার প্রোফাইল</h1>
            <p className="muted">
              আপনার ব্যক্তিগত তথ্য দেখুন ও আপডেট করুন।
            </p>
          </div>
        </div>

        <ProfileForm
          name={session.user.name}
          email={session.user.email}
        />
      </main>
    </>
  );
}