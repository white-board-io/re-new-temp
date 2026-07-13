"use client";

import { useState } from "react";
import { Mail, Phone } from "lucide-react";

const REQUIREMENT_TYPES = [
  "Residential Rooftop",
  "Commercial & Industrial",
  "Utility-scale Project",
  "Channel Partnership",
  "Other",
];

function Field({
  name,
  label,
  type = "text",
}: {
  name: string;
  label: string;
  type?: string;
}) {
  return (
    <div className="relative">
      <input
        id={`contact-${name}`}
        name={name}
        type={type}
        required
        placeholder=" "
        aria-label={label}
        className="peer w-full rounded-lg bg-white px-6 py-5 text-lg text-primary-950 focus:outline-none focus:ring-2 focus:ring-primary-400"
      />
      <label
        htmlFor={`contact-${name}`}
        className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-lg text-neutral-500 peer-focus:hidden peer-[:not(:placeholder-shown)]:hidden"
      >
        {label}
        <span className="text-red-500">*</span>
      </label>
    </div>
  );
}

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="bg-primary-700 py-section text-white">
      <div className="mx-auto grid max-w-content gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-24">
        <div>
          <h2 className="max-w-lg text-4xl font-bold sm:text-[54px] sm:leading-[62px]">
            Power your next <span className="text-accent">project</span> with ReNew Solar
            Panel.
          </h2>
          <p className="mt-8 max-w-md text-2xl leading-9 text-white/90">
            Tell us what you need and our team will get back to you within 24 hours.
          </p>
          <address className="mt-12 space-y-5 not-italic">
            <a
              href="mailto:pv.marketing@renew.com"
              className="flex items-center gap-4 text-2xl font-bold text-primary-300 hover:text-primary-200"
            >
              <Mail aria-hidden className="size-7" />
              pv.marketing@renew.com
            </a>
            <a
              href="tel:9220440044"
              className="flex items-center gap-4 text-2xl font-bold text-primary-300 hover:text-primary-200"
            >
              <Phone aria-hidden className="size-7" />
              9220 440 044
            </a>
          </address>
        </div>

        {/* TODO(batch-4-followup): external form endpoint — static export has no
            server; submission currently just confirms locally. */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="flex flex-col gap-5"
        >
          <Field name="name" label="Name" />
          <Field name="company" label="Company" />
          <Field name="phone" label="Phone" type="tel" />
          <Field name="state" label="State" />
          <select
            name="requirement"
            required
            defaultValue=""
            aria-label="Requirement type"
            className="w-full appearance-none rounded-lg bg-white bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2210%22%3E%3Cpath d=%22M1 1l7 7 7-7%22 stroke=%22%23404040%22 stroke-width=%222%22 fill=%22none%22/%3E%3C/svg%3E')] bg-[position:right_1.5rem_center] bg-no-repeat px-6 py-5 text-lg text-primary-950 invalid:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            <option value="" disabled>
              Requirement type*
            </option>
            {REQUIREMENT_TYPES.map((t) => (
              <option key={t} value={t} className="text-primary-950">
                {t}
              </option>
            ))}
          </select>
          <div className="mt-2 flex items-center justify-end gap-6">
            {submitted && (
              <p role="status" className="text-primary-200">
                Thanks — we&apos;ll get back to you within 24 hours.
              </p>
            )}
            <button
              type="submit"
              className="rounded-full bg-accent px-14 py-3.5 text-xl font-medium text-white transition hover:bg-primary-400"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
