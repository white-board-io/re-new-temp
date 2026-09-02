import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type ProcessStep = {
  number: string;
  title: string;
  body: ReactNode;
  icon: string;
  cta?: string;
  href?: string;
};

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Access the Official Portal",
    body: (
      <p className="max-w-[527px]">
        Start your application by visiting the <strong className="font-bold">PM Surya Ghar: Muft Bijli Yojana website</strong>
      </p>
    ),
    icon: "/images/muft-bijli-captive-portal.svg",
    cta: "Click Here to Apply",
    href: "https://pmsuryaghar.gov.in/",
  },
  {
    number: "02",
    title: "Begin the Registration Process",
    body: (
      <>
        <p>You can proceed in either of the following ways:</p>
        <ul className="mt-4 list-disc space-y-0 pl-8">
          <li>Select <strong className="font-bold">“Apply Now”</strong> from the consumer section of the portal, or</li>
          <li>Click the <strong className="font-bold">“Login”</strong> menu and choose <strong className="font-bold">“Consumer Login”</strong></li>
        </ul>
      </>
    ),
    icon: "/images/muft-bijli-checkbook.svg",
  },
  {
    number: "03",
    title: "Register Using Your Mobile Number",
    body: (
      <>
        <p>To create your account:</p>
        <ul className="mt-4 list-disc space-y-0 pl-8">
          <li>Enter the mobile number linked to your electricity connection</li>
          <li>Complete the captcha verification displayed on the screen</li>
        </ul>
      </>
    ),
    icon: "/images/muft-bijli-remember-me.svg",
  },
  {
    number: "04",
    title: "Verify Your Mobile Number",
    body: (
      <>
        <p>A one-time password (OTP) will be sent to your registered mobile number through SMS.</p>
        <ul className="mt-4 list-disc space-y-0 pl-8">
          <li>Enter the OTP in the designated field to continue</li>
        </ul>
      </>
    ),
    icon: "/images/muft-bijli-task-alt.svg",
  },
  {
    number: "05",
    title: "Create and Complete Your Profile",
    body: (
      <>
        <p>After verification, provide the following details:</p>
        <ul className="mt-4 list-disc space-y-0 pl-8">
          <li>Consumer name</li>
          <li>Email address</li>
          <li>Residential address</li>
          <li>State</li>
          <li>District</li>
          <li>PIN code</li>
        </ul>
        <p className="mt-4">Ensure all information is entered accurately before proceeding</p>
      </>
    ),
    icon: "/images/muft-bijli-3p.svg",
  },
  {
    number: "06",
    title: "Submit an Application for Rooftop Solar",
    body: (
      <>
        <p>
          Once your profile is complete, select <strong className="font-bold">“Apply for Solar Rooftop”</strong>
        </p>
        <p className="mt-6">You will be asked to provide:</p>
        <ul className="mt-4 list-disc space-y-0 pl-8">
          <li>State</li>
          <li>District</li>
          <li>Electricity distribution company (DISCOM)</li>
          <li>Electricity consumer/account number</li>
        </ul>
        <p className="mt-6">
          After entering these details, click <strong className="font-bold">“Fetch Details”.</strong>
        </p>
      </>
    ),
    icon: "/images/muft-bijli-assignment.svg",
  },
];

function StepCard({ step }: { step: ProcessStep }) {
  const heightClass =
    step.number === "01"
      ? "xl:min-h-[442px]"
      : step.number === "05"
        ? "xl:min-h-[646px]"
        : step.number === "06"
          ? "xl:min-h-[1013px]"
          : "xl:min-h-[412px]";

  return (
    <article className={`relative overflow-hidden rounded-[6px] bg-[#0069340F] px-6 py-12 sm:px-12 lg:px-[69px] lg:pb-0 lg:pt-[57px] ${heightClass}`}>
      <div className="relative z-10 max-w-[1059px]">
        <div className="flex items-center gap-[22px]">
          <span className="-ml-[3px] flex size-[58px] shrink-0 items-center justify-center rounded-full bg-[#8DC63F]">
            <Image
              src={step.icon}
              alt=""
              width={33}
              height={33}
              className="size-[33px] shrink-0"
            />
          </span>
          <p className="text-[24px] font-extrabold leading-8 text-primary-700">STEP {step.number}</p>
        </div>
        <h2 className="mt-[26px] max-w-[630px] font-[family-name:var(--font-inter)] text-[24px] font-bold leading-8 text-primary-950 lg:text-[32px] lg:leading-10">
          {step.title}
        </h2>
        <div className={`mt-[17px] font-sans text-[18px] font-normal leading-8 text-[#737373] sm:text-[22px] lg:text-[28px] lg:leading-10 ${step.number === "05" || step.number === "06" ? "lg:min-h-[399px]" : ""}`}>
          {step.body}
        </div>
        {step.cta && step.href && (
          <Link
            href={step.href}
            target="_blank"
            rel="noreferrer"
            className="mt-9 inline-flex min-h-[56px] items-center rounded-[44px] bg-[#77BB44] px-8 text-lg font-bold leading-8 text-white transition-colors hover:bg-[#6aa83c] lg:h-[69px] lg:w-[338px] lg:justify-center lg:px-0 lg:text-[20px]"
          >
            {step.cta}
          </Link>
        )}
      </div>
      {step.number === "06" && (
        <div className="relative z-10 mt-12 rounded-[6px] bg-[#0069341A] px-6 py-8 sm:px-12 lg:mt-[66px] lg:px-[50px] lg:py-[42px]">
          <div className="text-[18px] leading-8 text-[#737373] sm:text-[22px] lg:text-[28px] lg:leading-10">
            When your consumer information is displayed:
            <ul className="mt-4 list-disc space-y-0 pl-8">
              <li>Review the details carefully.</li>
              <li>Click <strong className="font-bold">“Next”.</strong></li>
              <li>Complete the remaining application form and submit it through the portal.</li>
            </ul>
          </div>
        </div>
      )}
      <p
        aria-hidden
        className="absolute hidden right-8 top-6 text-[150px] font-light leading-none text-[#006B380D] sm:right-20 sm:text-[220px] lg:block lg:right-[98px] lg:top-[121px] lg:text-[315px] lg:leading-[0.72]"
      >
        {step.number}
      </p>
    </article>
  );
}

export function MuftBijliYojana() {
  return (
    <div className="overflow-hidden bg-white text-primary-950">
      <section className="relative flex min-h-[430px] items-end overflow-hidden sm:min-h-[530px] lg:h-[704px] lg:min-h-0">
        <Image
          src="/images/muft-bijli-hero.png"
          alt="Rooftop solar panels surrounded by trees"
          fill
          priority
          sizes="100vw"
          className="object-[75%_center] object-cover lg:object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(19,42,0,0.92)_0%,rgba(19,42,0,0.58)_48%,rgba(19,42,0,0)_100%)] lg:bg-[linear-gradient(270deg,rgba(19,42,0,0)_20%,rgba(19,42,0,0.9)_89%)]" />
        <div className="relative z-10 mx-auto w-full max-w-content px-4 pb-14 sm:px-6 sm:pb-20 lg:pb-[196px] xl:px-0">
          <p className="text-xl font-bold leading-8 text-white sm:text-[28px] lg:text-[32px]">Apply for</p>
          <h1 className="mt-3 max-w-[625px] text-[42px] font-bold leading-[1.12] tracking-[0.03em] text-accent sm:text-[58px] lg:text-[75px] lg:leading-[88px]">
            <span className="font-normal">PM Surya Ghar </span>
            <span className="font-black">Muft Bijli Yojana</span>
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-[1530px] px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:pb-[128px] lg:pt-[109px] xl:px-0">
        <h2 className="mb-12 text-[28px] font-bold leading-10 sm:text-[32px] lg:mb-[78px]">Step-by-Step Process</h2>
        <div className="space-y-6 lg:space-y-[50px]">
          {PROCESS_STEPS.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>
      </section>

      <section className="bg-[#11663A] px-4 py-16 text-white sm:px-6 sm:py-24 lg:min-h-[1287px] lg:px-0 lg:py-[156px]">
        <div className="mx-auto max-w-[1392px]">
          <div>
            <h2 className="max-w-[597px] font-[family-name:var(--font-inter)] text-[30px] font-medium leading-10">
              <span className="block text-white">What Happens</span>
              <span className="block text-[#8DC63F] text-[32px] font-bold">After You Submit the Application?</span>
            </h2>
            <div className="mt-10 max-w-[1418px] font-sans text-[18px] font-normal leading-8 text-white sm:text-[22px] lg:mt-[47px] lg:min-h-[399px] lg:text-[28px] lg:leading-10">
              <p>The application and installation process generally follows these stages:</p>
              <ol className="mt-6 list-decimal pl-7 lg:mt-6 lg:leading-[50px]">
                <li>The concerned DISCOM reviews the application and grants approval.</li>
                <li>The applicant selects a vendor registered under the scheme and gets the rooftop solar system installed.</li>
                <li>Installation-related information is uploaded to the portal.</li>
                <li>The DISCOM conducts an inspection and arranges net meter installation.</li>
                <li>Commissioning details and bank account information are submitted online.</li>
                <li>After successful verification, the subsidy amount is transferred to the applicant’s bank account.</li>
              </ol>
            </div>
          </div>

          <div className="mt-20 max-w-[1418px] lg:mt-[96px]">
            <h2 className="max-w-[597px] font-[family-name:var(--font-inter)] text-[30px] font-medium leading-10">
              <span className="block text-white">Subsidy Available for</span>
              <span className="block text-[#8DC63F] text-[32px] font-bold">Residential Households</span>
            </h2>
            <div className="mt-10 max-w-[1418px] font-sans text-[18px] font-normal leading-8 text-white sm:text-[22px] lg:mt-[47px] lg:text-[28px] lg:leading-10">
              <p>The Central Financial Assistance (CFA) under the scheme is structured as follows:</p>
              <ul className="mt-6 list-disc pl-7 lg:mt-6 lg:leading-10">
                <li>₹30,000 per kW for systems up to 2 kW</li>
                <li>₹18,000 per kW for the additional capacity between 2 kW and 3 kW</li>
                <li>Maximum subsidy of ₹78,000 for residential rooftop solar systems with a capacity above 3 kW</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0069340F] px-4 py-16 text-primary-950 sm:px-6 sm:py-24 lg:min-h-[582px] lg:px-0 lg:py-[123px]">
        <div className="mx-auto max-w-[1530px]">
          <div className="relative z-10 max-w-[1015px]">
            <h2 className="font-[family-name:var(--font-inter)] text-[28px] font-bold leading-10 text-[#132A00] sm:text-[32px]">
              Documents Commonly Required
            </h2>
            <div className="mt-6 font-sans text-[18px] font-normal leading-8 text-[#737373] sm:text-[22px] lg:mt-[17px] lg:text-[28px] lg:leading-10">
              <p>Applicants should generally keep the following documents and information ready:</p>
              <ul className="mt-6 list-disc pl-7 lg:mt-6 lg:leading-10">
                <li>Latest electricity bill</li>
                <li>Electricity consumer/account number</li>
                <li>Aadhaar card</li>
                <li>Mobile number linked to the electricity connection</li>
                <li>Bank account details for receiving the subsidy</li>
              </ul>
            </div>
          </div>
          <Image
            src="/images/muft-bijli-article-person.svg"
            alt=""
            width={380}
            height={380}
            className="absolute hidden w-[260px] lg:top-[115px] lg:right-[163px] lg:block lg:w-[380px]"
          />
        </div>
      </section>
    </div>
  );
}
