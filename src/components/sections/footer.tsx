import Image from "next/image";

const navItems = [
  { label: "Who We Serve", href: "#who-we-serve" },
  { label: "Products", href: "#products" },
  { label: "Manufacturing", href: "#manufacturing" },
  { label: "Our Projects", href: "#our-projects" },
  { label: "Channel Partners", href: "#channel-partners" },
];

// TODO(batch-4-followup): real download URLs (datasheets, warranty docs, brochure)
const linkColumns = [
  {
    heading: "Downloads",
    links: [
      { label: "Product Datasheets", href: "#" },
      { label: "Installation & Warranty", href: "#" },
      { label: "Certificates", href: "#" },
    ],
  },
  {
    heading: "Corporate",
    links: [{ label: "Corporate Brochure", href: "#" }],
  },
];

const portals = [
  {
    caption: "Module Warranty Registration",
    label: "warranty.renew.com",
    href: "https://warranty.renew.com",
  },
  {
    caption: "Register a Complain",
    label: "renew.freshdesk.com",
    href: "https://renew.freshdesk.com",
  },
];

// lucide-react no longer ships brand icons, so these are inlined
type IconProps = { className?: string };

function FacebookLogo({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M13.5 21.888v-7.403h2.438l.465-3.02h-2.903V9.51c0-.826.405-1.632 1.703-1.632h1.318V5.307s-1.196-.204-2.34-.204c-2.387 0-3.947 1.447-3.947 4.066v2.296H7.578v3.02h2.656v7.403a10.06 10.06 0 0 0 3.266 0Z" />
    </svg>
  );
}

function InstagramLogo({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className={className}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInLogo({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M6.94 8.75H3.56V20.5h3.38V8.75ZM5.25 7.19a1.97 1.97 0 1 0 0-3.94 1.97 1.97 0 0 0 0 3.94ZM20.5 13.06c0-3.06-1.63-4.56-3.94-4.56-1.4 0-2.37.66-2.94 1.56V8.75H10.3V20.5h3.37v-6.19c0-1.5.75-2.31 1.94-2.31 1.13 0 1.7.75 1.7 2.31v6.19h3.19v-7.44Z" />
    </svg>
  );
}

function XLogo({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YouTubeLogo({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42A2.5 2.5 0 0 0 2.42 7.2 26.2 26.2 0 0 0 2 12a26.2 26.2 0 0 0 .42 4.81 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77A26.2 26.2 0 0 0 22 12a26.2 26.2 0 0 0-.42-4.81ZM10 15.13V8.87L15.25 12 10 15.13Z" />
    </svg>
  );
}

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/renewofficial", Icon: FacebookLogo },
  { label: "Instagram", href: "https://www.instagram.com/renew_official", Icon: InstagramLogo },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/renew-", Icon: LinkedInLogo },
  { label: "X", href: "https://x.com/ReNew_Official", Icon: XLogo },
  { label: "YouTube", href: "https://www.youtube.com/@ReNewOfficial", Icon: YouTubeLogo },
];

export function Footer() {
  return (
    <footer className="bg-primary-950 py-20 text-white">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Image
              src="/images/logo-white.svg"
              alt="ReNew Solar Panels"
              width={239}
              height={159}
              className="h-36 w-auto"
            />
            <p className="mt-10 max-w-md text-lg leading-8 text-white/90">
              ReNew Solar is the manufacturing arm of ReNew, India&apos;s leading
              decarbonisation solutions company listed on Nasdaq. With three world-class
              facilities in Jaipur, Dholera, and Vizag, we build the panels that are powering
              India&apos;s net-zero future.
            </p>
            <ul className="mt-12 flex gap-4">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-12 items-center justify-center rounded-full bg-white/10 transition hover:bg-primary-700"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-10 gap-y-3 lg:justify-between">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-lg hover:text-primary-300">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-16 grid gap-10 sm:grid-cols-3">
              {linkColumns.map((column) => (
                <div key={column.heading}>
                  <h3 className="text-xl font-bold">{column.heading}</h3>
                  <ul className="mt-6 space-y-4">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a href={link.href} className="text-white/90 hover:text-primary-300">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div>
                <h3 className="text-xl font-bold">Support Portals</h3>
                <ul className="mt-6 space-y-6">
                  {portals.map((portal) => (
                    <li key={portal.label}>
                      <p className="text-sm text-white/60">{portal.caption}</p>
                      <a
                        href={portal.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block underline underline-offset-4 hover:text-primary-300"
                      >
                        {portal.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-20 border-t border-white/10 pt-8 text-sm text-white/60">
          © {new Date().getFullYear()} ReNew. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
