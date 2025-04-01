import Card from '@/components/modules/Card';
import Title from '@/components/modules/Title';

export default function PrivacyPolicy() {
  return (
    <div className="container max-w-6xl py-8">
      <Card className="p-8">
        <Title title="Privacy Policy" className="text-center" />

        <div className="max-w-4xl mx-auto py-10 px-6 text-white">
          <section className="mb-8">
            <h2 className="text-xl font-semibold">1. Introduction</h2>
            <p className="mt-2 text-navy-100 text-sm">
              Welcome to Flicker (“we”, “us”, “our”). We are committed to
              protecting your privacy and handling your personal data
              responsibly. This Privacy Policy explains how we collect, use,
              share, and protect your information when you use our TikTok
              analytics platform, which integrates directly with TikTok
              (“Platform”). By accessing or using the Platform, you agree to the
              collection and use of your data in accordance with this Privacy
              Policy. If you do not agree with our practices, please discontinue
              the use of our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold">2. Information We Collect</h2>
            <ul className="list-disc list-outside pl-5 mt-2 text-navy-100 text-sm">
              <li>
                <strong>Account Information:</strong> When you connect your
                TikTok account to our Platform, we collect account-related
                information such as your username, profile details, follower
                count, and other publicly available information.
              </li>
              <li>
                <strong>Analytics Data:</strong> We collect performance data
                directly from TikTok, including video views, engagement metrics
                (likes, comments, shares), follower growth, and audience
                demographics (where available).
              </li>
              <li>
                <strong>Device and Usage Information:</strong> We collect data
                about how you interact with our Platform, including your device
                type, browser information, IP address, and other technical data.
              </li>
              <li>
                <strong>Contact Information:</strong> If you sign up for an
                account, we may also collect your email address and any other
                contact details you provide.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc list-outside pl-5 mt-2 text-navy-100 text-sm">
              <li>
                <strong>Providing Services:</strong> To deliver TikTok analytics
                services, including data tracking, reporting, and insights
                related to your TikTok account.
              </li>
              <li>
                <strong>Improving Our Platform:</strong> To monitor and improve
                the performance, reliability, and security of our Platform.
              </li>
              <li>
                <strong>Communication:</strong> To send you updates, respond to
                inquiries, or provide customer support.
              </li>
              <li>
                <strong>Legal Compliance:</strong> To comply with applicable
                laws, regulations, and legal obligations.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold">4. Sharing of Information</h2>
            <p className="mt-2 text-navy-100 text-sm">
              We do not sell or rent your personal information to third parties.
              However, we may share your information in the following
              situations:
            </p>
            <ul className="list-disc list-outside pl-5 mt-2 text-navy-100 text-sm">
              <li>
                <strong>With TikTok:</strong> As our Platform integrates with
                TikTok, we may share certain data with TikTok to facilitate the
                functionality of our services.
              </li>
              <li>
                <strong>Service Providers:</strong> We may share your data with
                third-party service providers who assist in operating our
                Platform or processing data on our behalf, under strict
                confidentiality agreements.
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose your data
                when required by law or to protect our legal rights, comply with
                legal proceedings, or prevent fraud or abuse of our services.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold">5. Data Security</h2>
            <p className="mt-2 text-navy-100 text-sm">
              We implement appropriate technical and organizational measures to
              protect your personal data against unauthorized access,
              alteration, disclosure, or destruction. Despite these measures, no
              data transmission over the internet or storage system can be
              guaranteed to be 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold">6. Your Rights</h2>
            <p className="mt-2 text-navy-100 text-sm">
              Depending on your location, you may have certain rights regarding
              your personal information, including:
            </p>
            <ul className="list-disc list-outside pl-5 mt-2 text-navy-100 text-sm">
              <li>
                <strong>Access:</strong> You can request access to the personal
                data we hold about you.
              </li>
              <li>
                <strong>Correction:</strong> You can request corrections to
                inaccurate or incomplete information.
              </li>
              <li>
                <strong>Deletion:</strong> You may request the deletion of your
                personal data, subject to certain legal obligations.
              </li>
              <li>
                <strong>Objection:</strong> You can object to the processing of
                your data in specific situations.
              </li>
            </ul>
            <p className="mt-2 text-navy-100 text-sm">
              To exercise any of these rights, please contact us at
              support@goflicker.co
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold">7. Data Retention</h2>
            <p className="mt-2 text-navy-100 text-sm">
              We retain personal data only for as long as necessary to fulfill
              the purposes described in this Privacy Policy, comply with legal
              obligations, or resolve disputes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold">8. Children’s Privacy</h2>
            <p className="mt-2 text-navy-100 text-sm">
              Our Platform is not intended for individuals under the age of 13.
              We do not knowingly collect personal data from children. If you
              believe we have unintentionally collected such data, please
              contact us, and we will take steps to delete it.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold">
              9. International Data Transfers
            </h2>
            <p className="mt-2 text-navy-100 text-sm">
              If you are accessing our Platform from outside the USA, please be
              aware that your data may be transferred to, stored, and processed
              in your country or other jurisdictions. We take steps to ensure
              that your data is treated securely and in accordance with this
              Privacy Policy, regardless of where it is processed.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold">
              10. Changes to this Privacy Policy
            </h2>
            <p className="mt-2 text-navy-100 text-sm">
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated “Effective Date.” We
              encourage you to review this Privacy Policy periodically to stay
              informed about how we are protecting your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold">11. Contact Us</h2>
            <p className="mt-2 text-navy-100 text-sm">
              If you have any questions or concerns regarding this Privacy
              Policy or our data practices, please contact us at: <br />
              Email:{' '}
              <a
                href="mailto:support@goflicker.co"
                className="text-blue-500 underline"
              >
                support@goflicker.co
              </a>
            </p>
          </section>
        </div>
      </Card>
    </div>
  );
}
