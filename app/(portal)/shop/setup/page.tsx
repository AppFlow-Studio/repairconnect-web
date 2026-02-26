"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const SLUG_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export default function ShopSetupPage() {
  const router = useRouter();
  const createShop = useMutation(api.shops.create);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });
  const [slugManual, setSlugManual] = useState(false);
  const [slugError, setSlugError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);

  const slugCheckResult = useQuery(
    api.shops.getBySlug,
    form.slug.length >= 2 && !slugError ? { slug: form.slug } : "skip"
  );
  const isSlugTaken = slugCheckResult !== undefined && slugCheckResult !== null;

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    setForm((prev) => ({
      ...prev,
      name,
      ...(!slugManual ? { slug: toSlug(name) } : {}),
    }));
  }

  function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-+/, "");
    setSlugManual(value !== "");
    setForm((prev) => ({ ...prev, slug: value }));
    if (value.length > 0 && !SLUG_REGEX.test(value)) {
      const hasLeadingOrTrailingHyphen = value.startsWith("-") || value.endsWith("-");
      setSlugError(
        hasLeadingOrTrailingHyphen
          ? "The starting or ending character cannot be a hyphen."
          : "Use only lowercase letters, numbers, and hyphens."
      );
    } else {
      setSlugError(null);
    }
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    let formatted = digits;
    if (digits.length >= 7) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else if (digits.length >= 4) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else if (digits.length >= 1) {
      formatted = `(${digits}`;
    }
    setForm((prev) => ({ ...prev, phone: formatted }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitErrors([]);

    const errors: string[] = [];
    if (!form.name.trim()) errors.push("Please enter a shop name.");
    if (!form.slug || !SLUG_REGEX.test(form.slug)) {
      setSlugError("Please enter a valid URL-safe slug.");
      errors.push("Please enter a valid URL-safe slug.");
    } else if (isSlugTaken) {
      setSlugError("This slug is already taken. Please choose another.");
      errors.push("This slug is already taken. Please choose another.");
    } else {
      setSlugError(null);
    }
    if (form.phone.replace(/\D/g, "").length < 10) errors.push("Phone number must be 10 digits.");
    if (form.zipCode.length < 5) errors.push("Zip code must be 5 digits.");
    if (!form.address.trim()) errors.push("Please enter a street address.");
    if (!form.city.trim()) errors.push("Please enter a city.");
    if (!form.state.trim()) errors.push("Please enter a state.");

    if (errors.length > 0) {
      setSubmitErrors(errors);
      return;
    }

    setSubmitting(true);
    try {
      await createShop({
        name: form.name,
        slug: form.slug,
        address: form.address,
        city: form.city,
        state: form.state,
        zipCode: form.zipCode,
        phone: form.phone,
      });
      router.push("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      if (message.toLowerCase().includes("slug")) {
        setSlugError("This slug is already taken. Please choose another.");
        setSubmitErrors(["This slug is already taken. Please choose another."]);
      } else {
        setSubmitErrors([message || "Failed to create shop. Please try again."]);
      }
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full px-3.5 py-2.5 rounded-lg border border-border text-foreground text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  const slugStatus = (() => {
    if (slugError) return { text: slugError, className: "text-red-600" };
    if (form.slug.length < 2)
      return { text: "Enter at least 2 characters.", className: "text-gray-400" };
    if (slugCheckResult === undefined)
      return { text: "Checking availability…", className: "text-gray-500" };
    if (isSlugTaken)
      return { text: "This slug is already taken. Please choose another.", className: "text-red-600" };
    return { text: "✓ Available", className: "text-green-600 font-medium" };
  })();

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Shop Setup</h1>
      <p className="text-gray-600 mb-8">
        Let&apos;s get your shop set up on Otopair.
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white rounded-xl border border-gray-200 p-8 space-y-6"
      >
        {/* Shop Name */}
        <div>
          <label className={labelClass}>
            Shop Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={handleNameChange}
            placeholder="Otopair Service Center"
            className={inputClass}
          />
        </div>

        {/* Slug */}
        <div>
          <label className={labelClass}>
            Shop URL Slug <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-0 rounded-lg border border-border overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent">
            <span className="px-3.5 py-2.5 bg-gray-50 text-gray-500 text-sm border-r border-gray-300 shrink-0 select-none">
              otopair.com/shop/
            </span>
            <input
              type="text"
              required
              value={form.slug}
              onChange={handleSlugChange}
              placeholder="otopair-service-center"
              className="flex-1 px-3.5 py-2.5 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none bg-white"
            />
          </div>
          <p className={`mt-1.5 text-xs min-h-[1.25rem] ${slugStatus.className}`}>
            {slugStatus.text}
          </p>
          <p className="mt-1.5 text-xs text-gray-500">
            Lowercase letters, numbers, and hyphens only. Auto-generated from
            your shop name.
          </p>
        </div>

        {/* Street Address */}
        <div>
          <label className={labelClass}>
            Street Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={form.address}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, address: e.target.value }))
            }
            placeholder="1234 Main St"
            className={inputClass}
          />
        </div>

        {/* City / State / ZIP */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-1">
            <label className={labelClass}>
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={form.city}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, city: e.target.value }))
              }
              placeholder="Austin"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              maxLength={2}
              value={form.state}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  state: e.target.value.toUpperCase(),
                }))
              }
              placeholder="TX"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              ZIP Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              minLength={5}
              maxLength={5}
              pattern="\d{5}"
              value={form.zipCode}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  zipCode: e.target.value.replace(/\D/g, "").slice(0, 5),
                }))
              }
              placeholder="78701"
              className={inputClass}
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className={labelClass}>
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={handlePhoneChange}
            placeholder="(512) 555-0100"
            minLength={14}
            maxLength={14}
            className={inputClass}
          />
        </div>

        {/* Submit errors */}
        {submitErrors.length > 0 && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 space-y-1">
            {submitErrors.map((msg, i) => (
              <p key={i}>{msg}</p>
            ))}
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Creating shop…" : "Create Shop"}
          </button>
        </div>
      </form>
    </div>
  );
}
