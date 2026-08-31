"use client";

import { useCallback, useState, type FormEvent } from "react";
import type { EnquiryErrors, EnquirySource } from "@/lib/enquiry";

/*
 * Submit behaviour shared by the homepage Contact section and the Enquire
 * modal. Both post the same shape to the same endpoint and need the same four
 * states, so only their markup differs.
 */

export type EnquiryStatus = "idle" | "sending" | "sent" | "error";

/* Static hosts serve the site from a different origin than the API in some
   deployments; leave this unset and it posts same-origin. */
const ENDPOINT = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT || "/api/enquiry";

export function useEnquiryForm(source: EnquirySource) {
  const [status, setStatus] = useState<EnquiryStatus>("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<EnquiryErrors>({});

  const reset = useCallback(() => {
    setStatus("idle");
    setMessage("");
    setFieldErrors({});
  }, []);

  const submit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;

      // The requirement dropdown is a button + hidden input, so the browser's
      // own required-field check never sees it. Catch it here rather than
      // making the user wait for a round trip to be told.
      const payload = Object.fromEntries(new FormData(form).entries());
      if (!String(payload.requirement ?? "").trim()) {
        setStatus("error");
        // Same split the server uses: a summary on the form, the specifics
        // against the field, so neither line repeats the other.
        setMessage("Please check the highlighted fields.");
        setFieldErrors({ requirement: "Please pick a requirement type." });
        return;
      }

      setStatus("sending");
      setMessage("");
      setFieldErrors({});

      try {
        const response = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, source }),
        });

        const result = (await response.json().catch(() => ({}))) as {
          ok?: boolean;
          message?: string;
          errors?: EnquiryErrors;
        };

        if (!response.ok || !result.ok) {
          setStatus("error");
          setFieldErrors(result.errors ?? {});
          setMessage(
            result.message ?? "We could not send your enquiry. Please try again.",
          );
          return;
        }

        form.reset();
        setStatus("sent");
      } catch {
        // Offline, DNS failure, or the endpoint is down — all the enquirer can
        // usefully do is retry or use the phone number beside the form.
        setStatus("error");
        setMessage(
          "We could not reach our server. Please check your connection and try again.",
        );
      }
    },
    [source],
  );

  return { status, message, fieldErrors, submit, reset };
}
