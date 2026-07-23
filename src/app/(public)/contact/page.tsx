import type { Metadata } from "next";
import ContactClient from "@/components/contact/ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the NestKitchen team for support, feedback, or partnership inquiries.",
};

export default function ContactPage() {
  return <ContactClient />;
}