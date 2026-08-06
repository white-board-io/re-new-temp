"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const OPEN_CONTACT_MODAL_EVENT = "renew:open-contact-modal";

const FIELD_CLASS =
  "h-[58px] w-full rounded-[4px] bg-white px-[27px] text-[18px] leading-[58px] text-neutral-900 shadow-none outline-none ring-0 transition focus:ring-2 focus:ring-primary-400 sm:h-[58px] sm:text-[18px]";

function openContactModal() {
  window.dispatchEvent(new CustomEvent(OPEN_CONTACT_MODAL_EVENT));
}

function ModalField({
  name,
  label,
  type = "text",
}: {
  name: string;
  label: string;
  type?: string;
}) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <input
        name={name}
        type={type}
        required
        placeholder=" "
        className={`${FIELD_CLASS} peer`}
      />
      <span className="pointer-events-none absolute left-[27px] top-1/2 -translate-y-1/2 text-[18px] leading-none text-neutral-500 peer-focus:hidden peer-[:not(:placeholder-shown)]:hidden">
        {label}
        <span className="text-red-500">*</span>
      </span>
    </label>
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
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleOpen() {
      setIsOpen(true);
    }

    window.addEventListener(OPEN_CONTACT_MODAL_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_CONTACT_MODAL_EVENT, handleOpen);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 px-4 py-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setIsOpen(false);
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Contact us"
        className="relative h-[min(649px,calc(100dvh-40px))] w-full max-w-[568px] overflow-hidden bg-[#11663A] text-white shadow-2xl"
      >
        <Image
          src="/images/sunburst_full.svg"
          alt=""
          width={702}
          height={701}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[561px] -translate-x-1/2 -translate-y-1/2 opacity-20"
        />

        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close contact modal"
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/95 text-primary-700 shadow-sm transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
        >
          <X aria-hidden className="size-6" />
        </button>

        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
          className="relative z-[1] mx-auto flex h-full w-[calc(100%_-_48px)] max-w-[408px] flex-col items-center pt-[91px]"
        >
          <div className="flex w-full flex-col gap-[22px]">
            <ModalField name="name" label="Name" />
            <ModalField name="company" label="Company" />
            <ModalField name="phone" label="Phone" type="tel" />
            <ModalField name="email" label="Email" type="email" />
            <ModalField name="requirement" label="Requirement type" />
          </div>

          <button
            type="submit"
            className="mt-[59px] h-[39px] w-[144px] rounded-full bg-accent text-[14px] font-normal leading-[39px] text-white transition hover:bg-primary-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}
