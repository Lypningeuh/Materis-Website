import { Metadata } from "next";
import AdminPanel from "./AdminPanel";

export const metadata: Metadata = {
  title: "Administration — MATERIS",
  robots: "noindex, nofollow",
};

export default function AdminPage() {
  return <AdminPanel />;
}

