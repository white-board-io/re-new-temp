"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown } from "lucide-react";

type CustomDropdownProps = {
  id?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  ariaLabel?: string;
  required?: boolean;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
  optionClassName?: string;
  selectedOptionClassName?: string;
  iconClassName?: string;
};

export function CustomDropdown({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = "Select",
  ariaLabel,
  required = false,
  className = "",
  buttonClassName = "",
  menuClassName = "",
  optionClassName = "",
  selectedOptionClassName = "",
  iconClassName = "",
}: CustomDropdownProps) {
  const generatedId = useId();
  const dropdownId = id ?? `${name}-${generatedId}`;
  const listboxId = `${dropdownId}-listbox`;
  const rootRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, options.indexOf(value)),
  );

  const selectedLabel = options.find((option) => option === value);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  const selectOption = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const openDropdown = () => {
    const selectedIndex = options.indexOf(value);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setIsOpen(true);
  };

  const moveActive = (step: number) => {
    if (!isOpen) openDropdown();
    setActiveIndex((current) => (current + step + options.length) % options.length);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveActive(1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      moveActive(-1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (isOpen) {
        selectOption(options[activeIndex]);
      } else {
        openDropdown();
      }
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      {/* A hidden input is barred from constraint validation per the HTML spec,
          so `required` on one is silently ignored and the form submits with no
          selection. A *text* input does participate — but it must stay laid out
          and focusable, because Chrome refuses to submit (and logs "not
          focusable") when an invalid control is display:none or
          visibility:hidden. So: transparent, stretched over the button so the
          validation bubble anchors in the right place, click-through, and
          skipped by the tab order. `readOnly` is deliberately NOT used — it
          would bar validation again. */}
      <input
        type="text"
        name={name}
        value={value}
        required={required}
        onChange={() => {}}
        tabIndex={-1}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px w-full border-0 bg-transparent p-0 text-transparent opacity-0 outline-none"
      />
      <button
        id={dropdownId}
        type="button"
        role="combobox"
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        aria-required={required || undefined}
        data-has-value={value ? "true" : "false"}
        onClick={() => (isOpen ? setIsOpen(false) : openDropdown())}
        onKeyDown={handleKeyDown}
        className={buttonClassName}
      >
        <span className={selectedLabel ? "text-current" : "text-transparent"}>
          {selectedLabel ?? placeholder}
        </span>
        <ChevronDown
          aria-hidden
          className={`pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 transition-transform ${
            isOpen ? "rotate-180" : ""
          } ${iconClassName}`}
        />
      </button>
      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          aria-labelledby={dropdownId}
          className={`absolute z-40 mt-2 max-h-72 w-full overflow-auto rounded-xl border border-neutral-200 bg-white py-2 text-primary-950 shadow-[0_16px_36px_rgba(0,0,0,0.16)] ${menuClassName}`}
        >
          {options.map((option, index) => {
            const selected = option === value;
            const active = index === activeIndex;

            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => selectOption(option)}
                className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm transition ${
                  active ? "bg-primary-50 text-primary-700" : "hover:bg-primary-50"
                } ${selected ? selectedOptionClassName : ""} ${optionClassName}`}
              >
                <span>{option}</span>
                {selected && <Check aria-hidden className="size-4 shrink-0 text-primary-700" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
