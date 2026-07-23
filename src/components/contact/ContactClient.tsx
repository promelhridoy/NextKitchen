"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";

export default function ContactClient() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in your name, email, and message.");
      return;
    }

    setSubmitting(true);
    try {
      // TODO(wire-up): POST to your backend, e.g. `${process.env.NEXT_PUBLIC_API_URL}/api/contact`
      await new Promise((resolve) => setTimeout(resolve, 900));
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setError("Something went wrong. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">Get in Touch</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500 dark:text-gray-400">
          Questions, feedback, or partnership ideas — we&apos;d love to hear from you.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Contact info */}
        <div className="space-y-4 lg:col-span-2">
          <div className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 dark:bg-orange-900/40">
              <Mail size={18} />
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Email</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">hello@nestkitchen.app</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400">
              <Phone size={18} />
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Phone</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">+880 1XXX-XXXXXX</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 dark:bg-orange-900/40">
              <MapPin size={18} />
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Location</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 lg:col-span-3"
        >
          {submitted ? (
            <div className="flex flex-col items-center py-10 text-center">
              <CheckCircle2 size={40} className="text-green-700" />
              <p className="mt-3 font-semibold text-gray-900 dark:text-gray-100">Message sent!</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Thanks for reaching out — we&apos;ll get back to you within 1–2 business days.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-5 text-sm font-semibold text-orange-500 hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                  <input
                    value={form.name}
                    onChange={handleChange("name")}
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                <input
                  value={form.subject}
                  onChange={handleChange("subject")}
                  placeholder="What's this about?"
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                <textarea
                  value={form.message}
                  onChange={handleChange("message")}
                  rows={5}
                  placeholder="Tell us how we can help..."
                  className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-60"
              >
                {submitting ? "Sending..." : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </button>
            </div>
          )}
        </motion.form>
      </div>
    </div>
  );
}