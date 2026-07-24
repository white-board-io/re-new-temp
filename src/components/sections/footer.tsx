import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Who We Serve", href: "#who-we-serve" },
  { label: "Products", href: "#products" },
  { label: "Manufacturing", href: "#manufacturing" },
  { label: "Channel Partners", href: "#channel-partners" },
];

const linkColumns = [
  {
    heading: "Downloads",
    headingHref: "/downloads",
    links: [
      { label: "Product Datasheets", href: "/downloads#product-datasheets" },
      { label: "Installation & Warranty", href: "/downloads#installation-warranty" },
      { label: "Certificates", href: "/downloads#certificates" },
    ],
  },
  {
    heading: "Projects",
    headingHref: undefined,
    links: [
      { label: "Blogs", href: "#blogs" },
      { label: "Press Releases", href: "#press-releases" },
      { label: "Why ReNew", href: "#why-renew" },
    ],
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
  { label: "LinkedIn", href: "https://www.linkedin.com/company/renew-", Icon: LinkedInLogo },
  { label: "Instagram", href: "https://www.instagram.com/renew_official", Icon: InstagramLogo },
  { label: "Facebook", href: "https://www.facebook.com/renewofficial", Icon: FacebookLogo },
  { label: "X", href: "https://x.com/ReNew_Official", Icon: XLogo },
  { label: "YouTube", href: "https://www.youtube.com/@ReNewOfficial", Icon: YouTubeLogo },
];

export function Footer({ sectionPrefix = "" }: { sectionPrefix?: string } = {}) {
  return (
    <footer className="bg-primary-950 pt-24 text-white">
      <div className="mx-auto max-w-[1650px] px-4 sm:px-6 xl:px-0">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] xl:grid-cols-[620px_1fr] xl:gap-[140px]">
          <div>
            <Image
              src="/images/logo-white.svg"
              alt="ReNew Solar Panels"
              width={239}
              height={159}
              className="h-40 w-auto"
            />
            <p className="mt-20 max-w-[480px] text-lg font-light leading-8 text-white/90 xl:mt-[88px] xl:text-xl">
              ReNew Solar Panels is the manufacturing arm of ReNew, India&apos;s leading
              decarbonisation solutions company listed on Nasdaq. With three world-class
              facilities in Jaipur, Dholera, and Vizag, we build the panels that are powering
              India&apos;s net-zero future.
            </p>
            <ul className="mt-20 flex gap-4 xl:mt-[88px] xl:gap-[52px]">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-12 items-center justify-center rounded-full bg-primary-700 text-primary-400 transition hover:bg-primary-800 xl:size-[60px]"
                  >
                    <Icon className="size-5 xl:size-6" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav
            aria-label="Footer"
            className="grid gap-12 sm:grid-cols-2 xl:grid-cols-[213px_159px_210px_158px] xl:gap-[50px] xl:pt-[170px]"
          >
            <div>
              <a
                href={`${sectionPrefix}${navItems[0].href}`}
                className="text-lg hover:text-primary-300 xl:text-xl"
              >
                {navItems[0].label}
              </a>
              <div className="mt-16 xl:mt-14">
                <h3 className="text-xl font-bold leading-8">
                  <Link href={linkColumns[0].headingHref!} className="hover:text-primary-300">
                    {linkColumns[0].heading}
                  </Link>
                </h3>
                <ul className="mt-6 space-y-4">
                  {linkColumns[0].links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-lg font-light leading-7 text-white/90 hover:text-primary-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <a
                href={`${sectionPrefix}${navItems[1].href}`}
                className="text-lg hover:text-primary-300 xl:text-xl"
              >
                {navItems[1].label}
              </a>
              <div className="mt-16 xl:mt-14">
                <h3 className="text-xl font-bold leading-8">{linkColumns[1].heading}</h3>
                <ul className="mt-6 space-y-4">
                  {linkColumns[1].links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={`${sectionPrefix}${link.href}`}
                        className="text-lg font-light leading-7 text-white/90 hover:text-primary-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <a
                href={`${sectionPrefix}${navItems[2].href}`}
                className="text-lg hover:text-primary-300 xl:text-xl"
              >
                {navItems[2].label}
              </a>
              <div className="mt-16 xl:mt-14">
                <h3 className="text-xl font-bold leading-8">Support Portals</h3>
                <ul className="mt-6 space-y-6">
                  {portals.map((portal) => (
                    <li key={portal.label}>
                      <p className="text-[10px] font-light leading-[22px] text-white/60">
                        {portal.caption}
                      </p>
                      <a
                        href={portal.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-lg font-light leading-[22px] underline hover:text-primary-300"
                      >
                        {portal.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <a
                href={`${sectionPrefix}${navItems[3].href}`}
                className="text-lg hover:text-primary-300 xl:text-xl"
              >
                {navItems[3].label}
              </a>
              <div className="mt-16 xl:mt-14">
                <h3 className="text-xl font-bold leading-8">Corporate</h3>
                <ul className="mt-6 space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-lg font-light leading-7 text-white/90 hover:text-primary-300"
                    >
                      Corporate Brochure
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="mt-20 h-16 border-t border-white" aria-hidden />
    </footer>
  );
}
