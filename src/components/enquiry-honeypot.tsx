import { HONEYPOT_FIELD } from "@/lib/enquiry";

/*
 * A field for bots only. It is moved off-screen rather than `display: none`
 * (which the better form-fillers skip), hidden from assistive tech, out of the
 * tab order, and opted out of autofill — so a person never reaches it and a
 * script that fills every input gives itself away. The route handler discards
 * any submission that arrives with it filled.
 */
export function EnquiryHoneypot({ id }: { id: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -left-[9999px] top-auto size-px overflow-hidden"
    >
      <label htmlFor={id}>Company website</label>
      <input
        id={id}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}
