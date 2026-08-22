import type { Metadata } from "next";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Privacy() {
  return (
    <div className="prose">
      <p className="eyebrow">Legal</p>
      <h1>Privacy Policy</h1>
      <p className="lead">Short version: your quiz answers never leave your browser, and we do not ask who you are.</p>

      <h2>Quiz answers</h2>
      <p>
        Your answers are held in your browser&apos;s memory while you take the test and are used only to calculate the result
        shown on the screen. They are not sent to our servers, not stored, and not linked to you. Closing the tab discards them.
      </p>

      <h2>Analytics</h2>
      <p>
        We use Vercel Analytics to count page views and see which pages people reach. It is cookie-free and does not build a
        profile of individual visitors. If Google AdSense is enabled on this site, Google may set cookies to serve and measure
        ads; you can manage that at <a href="https://adssettings.google.com" target="_blank" rel="noopener">Google Ad Settings</a>.
      </p>

      <h2>Affiliate links</h2>
      <p>
        Product buttons lead to Amazon, Olive Young Global and similar retailers, and carry a tracking parameter so a purchase
        can be credited to us. Those retailers apply their own privacy policies once you leave this site. We receive only
        aggregate commission reports — never your name, address or payment details.
      </p>

      <h2>Email</h2>
      <p>
        If you submit an email address for the four-week plan, it is used to send that plan and related follow-ups, and nothing
        else. We do not sell or share it. Every message includes an unsubscribe link.
      </p>

      <h2>Your rights</h2>
      <p>
        Because we hold almost nothing about you, there is usually nothing to delete. If you have sent us an email address and
        want it removed, write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and it will be deleted.
      </p>

      <h2>Changes</h2>
      <p>If this policy changes materially, the updated version will be posted here with a new date. {SITE_NAME} last updated this policy in 2026.</p>
    </div>
  );
}
