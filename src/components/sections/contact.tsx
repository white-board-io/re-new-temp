"use client";

import { useEffect, useState } from "react";
import { Mail, Phone } from "lucide-react";
import { CustomDropdown } from "@/components/custom-dropdown";
import { Reveal } from "@/components/reveal";
import { REQUIREMENT_TYPES } from "@/components/contact-modal";

const ROTATING_CONTACT_WORDS = ["Home", "Project", "Business"];

function Field({
  name,
  label,
  type = "text",
  optional = false,
}: {
  name: string;
  label: string;
  type?: string;
  optional?: boolean;
}) {
  return (
    <div className="relative">
      <input
        id={`contact-${name}`}
        name={name}
        type={type}
        required={!optional}
        placeholder=" "
        aria-label={label}
        className="peer w-full rounded-md bg-white px-6 py-6 text-lg text-primary-950 focus:outline-none focus:ring-2 focus:ring-primary-400"
      />
      {/* Optional fields say so outright — a missing asterisk on its own is too
          easy to read past when every neighbouring field carries one. */}
      <label
        htmlFor={`contact-${name}`}
        className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-lg text-neutral-500 peer-focus:hidden peer-[:not(:placeholder-shown)]:hidden"
      >
        {label}
        {optional ? (
          <span className="text-neutral-400"> (optional)</span>
        ) : (
          <span className="text-red-500">*</span>
        )}
      </label>
    </div>
  );
}

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [requirement, setRequirement] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const rotatingWord = ROTATING_CONTACT_WORDS[wordIndex];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % ROTATING_CONTACT_WORDS.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="contact" className="bg-primary-700 py-section text-white">
      {/* Copy column, then the form a beat later. */}
      <Reveal
        stagger
        className="mx-auto grid max-w-content gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-24 xl:grid-cols-[560px_545px] xl:gap-[323px]"
      >
        <div className="min-w-0">
          <h2
            aria-label="Power your next Home, Project, or Business with ReNew Solar Panels."
            className="max-w-lg text-[28px] font-bold leading-[1.14] sm:text-[34px] md:text-[54px] md:leading-[62px]"
          >
            Power your next{" "}
            <span aria-hidden className="inline-block align-baseline text-accent">
              <span key={rotatingWord} className="contact-rotating-word inline-block">
                {rotatingWord}
              </span>
            </span>{" "}
            <span className="whitespace-nowrap">with ReNew Solar Panels.</span>
          </h2>
          <p className="mt-8 max-w-md text-2xl leading-9 text-white/90">
            Tell us what you need and our team will get back to you within 24 hours.
          </p>
          <address className="mt-12 space-y-5 not-italic">
            <a
              href="mailto:pv.marketing@renew.com"
              className="flex min-w-0 items-center gap-3 text-lg font-bold text-primary-300 hover:text-primary-200 min-[360px]:text-xl sm:gap-4 sm:text-2xl"
            >
              <Mail aria-hidden className="size-6 shrink-0 sm:size-7" />
              <span className="min-w-0 break-all">pv.marketing@renew.com</span>
            </a>
            <a
              href="tel:9220440044"
              className="flex min-w-0 items-center gap-3 text-lg font-bold text-primary-300 hover:text-primary-200 min-[360px]:text-xl sm:gap-4 sm:text-2xl"
            >
              <Phone aria-hidden className="size-6 shrink-0 sm:size-7" />
              <span>9220 440 044</span>
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
          className="min-w-0 flex flex-col gap-5"
        >
          <Field name="name" label="Name" />
          <Field name="company" label="Company" optional />
          <Field name="phone" label="Phone" type="tel" />
          <Field name="state" label="State" />
          <div className="relative">
            <CustomDropdown
              id="contact-requirement"
              name="requirement"
              value={requirement}
              onChange={setRequirement}
              options={REQUIREMENT_TYPES}
              placeholder="Requirement type"
              required
              ariaLabel="Requirement type"
              buttonClassName="relative w-full rounded-md bg-white px-6 py-6 pr-16 text-left text-lg text-primary-950 focus:outline-none focus:ring-2 focus:ring-primary-400"
              iconClassName="right-5 size-7 text-neutral-900"
            />
            {!requirement && (
              <label
                htmlFor="contact-requirement"
                className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-lg text-neutral-500"
              >
                Requirement type<span className="text-red-500">*</span>
              </label>
            )}
          </div>
          <div className="mt-2 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            {submitted && (
              <p role="status" className="text-primary-200">
                Thanks — we&apos;ll get back to you within 24 hours.
              </p>
            )}
            <button
              type="submit"
              className="inline-flex min-h-10 min-w-[168px] items-center justify-center rounded-full bg-accent px-8 py-0 text-base font-bold text-white transition hover:bg-primary-400 md:py-2.5"
            >
              Submit
            </button>
          </div>
        </form>
      </Reveal>
    </section>
  );
}
