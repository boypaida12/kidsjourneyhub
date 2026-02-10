import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Don't protect the login page itself
  // We'll handle protection in individual pages that need it
  
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}