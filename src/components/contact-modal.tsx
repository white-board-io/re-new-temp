"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { Check, Mail, Phone, X } from "lucide-react";
import { CustomDropdown } from "@/components/custom-dropdown";
import { REQUIREMENT_TYPES } from "@/lib/enquiry";
import { useEnquiryForm } from "@/lib/use-enquiry-form";

const OPEN_CONTACT_MODAL_EVENT = "renew:open-contact-modal";

const FOCUSABLE =
  'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])';

/* Box only — the floating label it pairs with lives in globals.css, which is
   also where the "field has a value" rules that raise the label are explained. */
const FIELD_CLASS =
  "contact-modal-field h-[60px] w-full rounded-md border border-neutral-200 bg-white px-4 pb-2 pt-[22px] text-[15px] text-primary-950 outline-none transition-colors duration-150 hover:border-neutral-300 focus:border-primary-400 focus:ring-4 focus:ring-primary-400/20";

const CONTACT_CHIP_CLASS =
  "inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[13px] text-white/90 transition hover:bg-white/20 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

function openContactModal() {
  window.dispatchEvent(new CustomEvent(OPEN_CONTACT_MODAL_EVENT));
}

function ModalField({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  optional = false,
  error,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  optional?: boolean;
  error?: string;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={!optional}
        placeholder=" "
        className={FIELD_CLASS}
      />
      {/* Optional fields say so outright — a missing asterisk on its own is too
          easy to read past when every neighbouring field carries one. */}
      <label htmlFor={id} className="contact-modal-label">
        {label}
        {optional ? (
          <span className="font-normal normal-case tracking-normal text-neutral-400">
            {" "}
            (optional)
          </span>
        ) : (
          <span className="text-red-500">*</span>
        )}
      </label>
      {error && <p className="mt-1.5 text-[13px] leading-5 text-red-600">{error}</p>}
    </div>
  );
}

export function ContactModalTrigger({
  children,
  className,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-haspopup="dialog"
      onClick={openContactModal}
      className={className}
    >
      {children}
    </button>
  );
}

export function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [requirement, setRequirement] = useState("");
  const { status, message, fieldErrors, submit, reset } =
    useEnquiryForm("enquire-modal");
  const panelRef = useRef<HTMLElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const uid = useId();
  const titleId = `${uid}-title`;

  useEffect(() => {
    function handleOpen() {
      openerRef.current = document.activeElement as HTMLElement | null;
      reset();
      setRequirement("");
      setIsOpen(true);
    }

    window.addEventListener(OPEN_CONTACT_MODAL_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_CONTACT_MODAL_EVENT, handleOpen);
  }, [reset]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    // Locking the body also removes its scrollbar, so pad the gap back on or
    // the page behind the scrim jumps sideways as the modal opens.
    const { overflow, paddingRight } = document.body.style;
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gutter > 0) {
      document.body.style.paddingRight = `${gutter}px`;
    }

    // Focus the panel rather than the first field: it lets the dialog announce
    // its own title, and does not throw up the keyboard on a phone.
    panelRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const panel = panelRef.current;
      if (!panel) {
        return;
      }

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) {
        return;
      }

      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      window.removeEventListener("keydown", handleKeyDown);
      openerRef.current?.focus();
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="presentation"
      className="contact-modal-scrim fixed inset-0 z-[100] flex items-end justify-center bg-primary-950/70 backdrop-blur-[3px] sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setIsOpen(false);
        }
      }}
    >
      {/* Full-width sheet on a phone, centred card from sm up. */}
      <section
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="contact-modal-card relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-md bg-white shadow-[0_40px_90px_-30px_rgb(0_0_0/0.6)] outline-none sm:max-h-[92dvh] sm:max-w-[540px] sm:rounded-md"
      >
        {/* The header carries the card's own top radius: clipping a square
            corner against the white card below it leaves a pale fringe on the
            arc, which reads as a notch cut out of each top corner. */}
        <header className="relative shrink-0 overflow-hidden rounded-t-md bg-primary-700 px-6 pb-5 pt-5 text-white viewport-short:pb-4 viewport-short:pt-4 sm:px-8 sm:pb-6 sm:pt-6 sm:viewport-short:pb-4">
          {/*
            The sunburst is the same mark as the Enquire FAB this modal opens
            from, so it stays for continuity — but anchored off the top-right
            corner and masked out towards the copy, rather than sitting behind
            the whole form where it competed with every field.
          */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-28 -top-52 w-[380px] opacity-25 [mask-image:linear-gradient(to_left,black_25%,transparent_85%)]"
          >
            <Image
              src="/images/sunburst_full.svg"
              alt=""
              width={702}
              height={701}
              className="w-full animate-sunburst motion-reduce:animate-none"
            />
          </div>

          <button
            type="button"
            aria-label="Close contact form"
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6 sm:top-6"
          >
            <X aria-hidden className="size-[18px]" />
          </button>

          <div className="relative">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-300">
              Enquire now
            </p>
            <h2
              id={titleId}
              className="mt-2 whitespace-nowrap pr-10 text-[24px] font-bold leading-[1.2] viewport-short:mt-1.5 viewport-short:text-[22px] sm:text-[30px]"
            >
              Tell us about your project
            </h2>
            <p className="mt-2 max-w-[44ch] text-[14px] leading-5 text-white/75 viewport-short:hidden">
              Share a few details and our team will get back to you.
            </p>

            <div className="mt-4 flex flex-wrap gap-2 viewport-short:hidden">
              <a href="mailto:pv.marketing@renew.com" className={CONTACT_CHIP_CLASS}>
                <Mail aria-hidden className="size-3.5 shrink-0 text-primary-300" />
                <span className="min-w-0 break-all">pv.marketing@renew.com</span>
              </a>
              <a href="tel:9220440044" className={CONTACT_CHIP_CLASS}>
                <Phone aria-hidden className="size-3.5 shrink-0 text-primary-300" />
                9220 440 044
              </a>
            </div>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-visible px-6 pb-6 pt-4 sm:px-8 sm:pb-7 sm:pt-5">
          {status === "sent" ? (
            <div role="status" className="flex flex-col items-center py-8 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                <Check aria-hidden className="size-7" />
              </span>
              <p className="mt-5 text-xl font-bold text-primary-950">
                Thanks — request received.
              </p>
              <p className="mt-2 max-w-[34ch] text-[15px] leading-6 text-neutral-500">
                Our team will review your details and get back to you.
              </p>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="mt-7 rounded-full bg-primary-700 px-10 py-3 text-[15px] font-medium text-white transition hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
              >
                Close
              </button>
            </div>
          ) : (
            <form
              onSubmit={async (event) => {
                await submit(event);
                // `form.reset()` only clears native inputs; the dropdown holds
                // its value in React state, so it has to be cleared by hand.
                setRequirement("");
              }}
              className="grid gap-3.5"
            >
              <ModalField
                id={`${uid}-name`}
                name="name"
                label="Name"
                autoComplete="name"
                error={fieldErrors.name}
              />
              <ModalField
                id={`${uid}-company`}
                name="company"
                label="Company"
                autoComplete="organization"
                optional
                error={fieldErrors.company}
              />
              <ModalField
                id={`${uid}-phone`}
                name="phone"
                label="Phone"
                type="tel"
                autoComplete="tel"
                error={fieldErrors.phone}
              />
              <ModalField
                id={`${uid}-email`}
                name="email"
                label="Email"
                type="email"
                autoComplete="email"
                error={fieldErrors.email}
              />

              <div className="relative">
                <CustomDropdown
                  id={`${uid}-requirement`}
                  name="requirement"
                  value={requirement}
                  onChange={setRequirement}
                  options={REQUIREMENT_TYPES}
                  placeholder="Requirement type"
                  required
                  buttonClassName={`${FIELD_CLASS} relative pr-12 text-left`}
                  menuClassName="bottom-full mb-2 mt-0 border-0 py-1 shadow-[0_16px_36px_rgba(0,0,0,0.14)]"
                  iconClassName="text-neutral-400"
                />
                <label htmlFor={`${uid}-requirement`} className="contact-modal-label">
                  Requirement type<span className="text-red-500">*</span>
                </label>
                {fieldErrors.requirement && (
                  <p className="mt-1.5 text-[13px] leading-5 text-red-600">
                    {fieldErrors.requirement}
                  </p>
                )}
              </div>

              {/* Failures keep the filled-in form on screen — the success state
                  replaces it, but an error must not cost the user their typing.
                  This line carries the summary only; the specifics sit against
                  the fields they belong to. */}
              {status === "error" && (
                <p role="alert" className="text-[13px] leading-5 text-red-600">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-1 flex h-[50px] w-full items-center justify-center rounded-full bg-primary-700 text-[15px] font-medium text-white transition-colors hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Submit"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
