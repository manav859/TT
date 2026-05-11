import { PageSEO } from '@/components/seo/PageSEO'
import { RevealText } from '@/lib/animations/RevealText'

export function PrivacyPage() {
  return (
    <>
      <PageSEO pageTitle="Privacy Policy" noindex />

      <div className="tt-section">
        <div className="tt-wide max-w-2xl">
          <RevealText as="h1" className="tt-heading-xl tt-serif text-tt-ink mb-12">
            Privacy Policy
          </RevealText>

          <div className="tt-prose space-y-6">
            <p>
              Tusk Tales collects minimal personal information — only what you
              provide through our contact and newsletter forms. This includes your
              name, email address, and the content of your message.
            </p>
            <h2>How we use your information</h2>
            <p>
              We use your contact details solely to respond to your inquiry or to
              send newsletter communications if you have opted in. We do not sell,
              share, or rent your information to third parties.
            </p>
            <h2>Cookies</h2>
            <p>
              This site uses no tracking cookies. We may use minimal technical
              cookies required for basic site function.
            </p>
            <h2>Data retention</h2>
            <p>
              Inquiry data is stored securely in our system for business
              correspondence purposes. You may request deletion at any time by
              contacting us directly.
            </p>
            <h2>Contact</h2>
            <p>
              For any privacy-related questions, please reach out through our{' '}
              <a href="/contact">contact page</a>.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
