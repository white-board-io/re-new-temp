import Image from "next/image";
import Link from "next/link";
import { Building2, Factory, Phone } from "lucide-react";
import { Reveal } from "@/components/reveal";

type IconProps = { className?: string };

function FacebookLogo({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}><path d="M13.5 21.888v-7.403h2.438l.465-3.02h-2.903V9.51c0-.826.405-1.632 1.703-1.632h1.318V5.307s-1.196-.204-2.34-.204c-2.387 0-3.947 1.447-3.947 4.066v2.296H7.578v3.02h2.656v7.403a10.06 10.06 0 0 0 3.266 0Z" /></svg>;
}

function InstagramLogo({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className={className}><rect x="2.5" y="2.5" width="19" height="19" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" stroke="none" /></svg>;
}

function LinkedInLogo({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}><path d="M6.94 8.75H3.56V20.5h3.38V8.75ZM5.25 7.19a1.97 1.97 0 1 0 0-3.94 1.97 1.97 0 0 0 0 3.94ZM20.5 13.06c0-3.06-1.63-4.56-3.94-4.56-1.4 0-2.37.66-2.94 1.56V8.75H10.3V20.5h3.37v-6.19c0-1.5.75-2.31 1.94-2.31 1.13 0 1.7.75 1.7 2.31v6.19h3.19v-7.44Z" /></svg>;
}

function XLogo({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}><path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.43L5.54 22H2.4l7.25-8.29L1.8 2h6.41l4.43 6.77L18.9 2Zm-1.1 18h1.73L7.27 3.9H5.42L17.8 20Z" /></svg>;
}

function YouTubeLogo({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}><path d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42A2.5 2.5 0 0 0 2.42 7.2 26.2 26.2 0 0 0 2 12a26.2 26.2 0 0 0 .42 4.81 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77A26.2 26.2 0 0 0 22 12a26.2 26.2 0 0 0-.42-4.81ZM10 15.13V8.87L15.25 12 10 15.13Z" /></svg>;
}

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/renew-solar-panels/", Icon: LinkedInLogo },
  { label: "Instagram", href: "https://www.instagram.com/renewsolarpanels?igsh=cW0zNDRmbW9kemp3", Icon: InstagramLogo },
  { label: "Facebook", href: "https://www.facebook.com/61591585425865/", Icon: FacebookLogo },
  { label: "X", href: "https://x.com/ReNew_Power", Icon: XLogo },
  { label: "YouTube", href: "https://youtube.com/@renewsolarpanels?si=6_wf2xVRPulDcb6C", Icon: YouTubeLogo },
];

const mainLink = "text-lg font-semibold leading-8 hover:text-primary-300 xl:text-xl";
const smallLink = "text-base font-light leading-6 text-white/80 hover:text-primary-300";

export function Footer({ sectionPrefix = "" }: { sectionPrefix?: string } = {}) {
  const sectionHref = (hash: string) => `${sectionPrefix}${hash}`;

  return (
    <footer className="bg-primary-950 pt-14 text-white md:pt-24">
      <div className="mx-auto max-w-[1650px] pl-4 pr-14 sm:pl-6 sm:pr-16 xl:relative xl:h-[910px] xl:px-0">
        <Reveal className="xl:absolute xl:left-0 xl:top-0">
          <Image src="/images/logo-white.svg" alt="ReNew Solar Panels" width={247} height={164} className="h-28 w-auto md:h-[164px]" />
          <p className="mt-8 max-w-[495px] text-base font-light leading-7 text-white/90 md:mt-20 md:text-xl md:leading-[30px] xl:mt-[80px]">
            ReNew Solar Panels is the manufacturing arm of ReNew, India&apos;s leading decarbonisation solutions company listed on Nasdaq. With three world-class facilities in Jaipur, Dholera, and Vizag, we build the panels that are powering India&apos;s net-zero future.
          </p>
        </Reveal>

        <Reveal className="mt-12 xl:absolute xl:left-[760px] xl:top-[166px] xl:mt-0">
          <nav aria-label="Footer" className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-4 xl:grid-cols-[213px_159px_210px_158px] xl:gap-x-[50px]">
            <div>
              <Link href={sectionHref("#who-we-serve")} className={mainLink}>Who We Serve</Link>
              <div className="mt-7 xl:mt-[47px]">
                <Link href={sectionHref("#why-renew")} className={mainLink}>Why ReNew</Link>
                <div className="mt-7 xl:mt-[44px]">
                  <Link href="/downloads" className={mainLink}>Downloads</Link>
                  <ul className="mt-4 space-y-2 xl:mt-[22px]">
                    <li><Link href="/downloads#product-datasheets" className={smallLink}>Product Datasheets</Link></li>
                    <li><Link href="/downloads#installation-warranty" className={smallLink}>Installation &amp; Warranty</Link></li>
                    <li><Link href="/downloads#certificates" className={smallLink}>Certificates</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <Link href={sectionHref("#products")} className={mainLink}>Products</Link>
              <ul className="mt-7 space-y-4 xl:mt-[47px] xl:space-y-[26px]">
                <li><Link href={sectionHref("#our-projects")} className={mainLink}>Projects</Link></li>
                <li><Link href={sectionHref("#blogs")} className={mainLink}>Blogs</Link></li>
                <li><Link href={sectionHref("#press-releases")} className={mainLink}>Press Releases</Link></li>
                <li><a href="https://www.renew.com/coverage-and-events" target="_blank" rel="noopener noreferrer" className={mainLink}>Events</a></li>
              </ul>
            </div>
            <div>
              <Link href={sectionHref("#manufacturing")} className={mainLink}>Manufacturing</Link>
              <div className="mt-7 xl:mt-[47px]">
                <h3 className="text-lg font-semibold leading-8 xl:text-xl">Support Portals</h3>
                <ul className="mt-4 space-y-4 xl:mt-[27px] xl:space-y-6">
                  <li><p className="text-[10px] font-light leading-[22px] text-white/60">Module Warranty Registration</p><a href="https://warranty.renew.com" target="_blank" rel="noopener noreferrer" className="text-lg font-light leading-[22px] underline hover:text-primary-300">warranty.renew.com</a></li>
                  <li><p className="text-[10px] font-light leading-[22px] text-white/60">Register a Complain</p><a href="https://renew.freshdesk.com" target="_blank" rel="noopener noreferrer" className="text-lg font-light leading-[22px] underline hover:text-primary-300">renew.freshdesk.com</a></li>
                </ul>
              </div>
            </div>
            <div>
              <Link href={sectionHref("#channel-partners")} className={mainLink}>Channel Partners</Link>
              <div className="mt-7 xl:mt-[47px]">
                <h3 className="text-lg font-semibold leading-8 xl:text-xl">Corporate</h3>
                <a href="/downloads/corporate-brochure/corporate-brochure.pdf" download className={`mt-4 block xl:mt-[27px] ${smallLink}`}>Corporate Brochure</a>
              </div>
            </div>
          </nav>
        </Reveal>

        <Reveal className="mt-14 grid gap-10 md:grid-cols-2 md:gap-12 xl:absolute xl:left-[760px] xl:top-[534px] xl:mt-0 xl:grid-cols-[397px_453px] xl:gap-[75px]">
          <div>
            <h3 className="flex items-center gap-4 text-lg font-semibold leading-[25px] xl:text-xl"><Building2 className="size-[25px] shrink-0" aria-hidden />India-Headquarter</h3>
            <div className="mt-6 text-base font-light leading-[22px] text-white/80 xl:mt-[30px]">
              <p className="font-semibold text-white">ReNew Private Limited</p>
              <p className="mt-4">ReNew, Commercial Block-1, Zone 6, Golf Course Road, DLF City Phase-V, Gurugram-122009, Haryana.</p>
              <a href="tel:+911244896670" className="mt-4 inline-flex items-center gap-2 hover:text-primary-300"><Phone className="size-4" aria-hidden />Tel. +91 124 489 6670/80</a>
            </div>
          </div>
          <div>
            <h3 className="flex items-center gap-4 text-lg font-semibold leading-[25px] xl:text-xl"><Factory className="size-[25px] shrink-0" aria-hidden />Manufacturing Plant</h3>
            <div className="mt-6 text-base font-light leading-[22px] text-white/80 xl:mt-[30px]">
              <p className="font-semibold text-white">Dholera Plant</p>
              <p className="mt-4">Plot No 232, TP-2/A, Survey No 151, Dholera Special Investment Region, Dholera, Ahmedabad, Gujarat, 382455</p>
              <p className="mt-7 font-semibold text-white">Jaipur Plant</p>
              <p className="mt-4">Plot No- DTA-02-40 TO 45, Domestic Tariff Area phase-II, Mahindra World City, Tahsil-Sanganer, Dist-Jaipur, Jaipur, Rajasthan, 302037</p>
            </div>
          </div>
        </Reveal>

        <Reveal as="ul" className="mt-14 flex flex-wrap items-center gap-5 pb-14 sm:gap-[52px] xl:absolute xl:left-0 xl:top-[760px] xl:mt-0 xl:gap-[52px] xl:pb-0">
          {socials.map(({ label, href, Icon }) => (
            <li key={label}><a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex size-12 items-center justify-center rounded-full bg-primary-700 text-primary-400 transition hover:bg-primary-800 hover:text-primary-300 xl:size-[60px]"><Icon className="size-5 xl:size-6" /></a></li>
          ))}
        </Reveal>
      </div>

      <div className="border-t border-white/35">
        <div className="mx-auto max-w-[1650px] pb-8 pl-4 pr-14 pt-5 text-sm font-light leading-[26px] text-white/80 sm:pl-6 sm:pr-16 md:text-lg md:leading-[34px] xl:px-0 xl:pb-[34px]">
          © All rights reserved ReNew Solar Panels 2026 |{" "}<a href="https://www.renew.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-primary-300">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
