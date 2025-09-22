import Link from "next/link";

const PrivacyPolicy = () => {
  const privacyData = [
    {
      title: "1. Introduction",
      content: [
        <>
          This Privacy Policy explains how{" "}
          <span className="font-semibold">NextCybr</span> (“we,” “our,” or “us”)
          collects, uses, and protects information when you use our platform. By
          using NextCybr, you agree to the terms herein.
        </>,
      ],
    },
    {
      title: "2. Information We Collect",
      list: [
        <>
          <span className="font-semibold">Personal Information:</span>{" "}
          Information you voluntarily provide, such as name, email, phone
          number, work experience, education, and profile details.
        </>,
        <>
          <span className="font-semibold">Account Credentials:</span> Email,
          password, or third-party login identifiers.
        </>,
        <>
          <span className="font-semibold">Non-Personal Information:</span>{" "}
          Automatically collected data such as IP address, browser type, device
          type, referring URL, pages visited, and cookies.
        </>,
        <>
          <span className="font-semibold">User Interactions:</span> Information
          about connections, messages, posts, and activities performed within
          the platform.
        </>,
      ],
    },
    {
      title: "3. How We Use Your Information",
      list: [
        "To provide and improve platform features and user experience.",
        "To personalize content, suggestions, and job or connection recommendations.",
        "To communicate with you regarding updates, notifications, or support requests.",
        "For analytics and research to improve platform functionality.",
        "To prevent fraud, abuse, or illegal activity and to enforce our Terms & Conditions.",
      ],
    },
    {
      title: "4. Cookies & Tracking Technologies",
      content: [
        "We use cookies, web beacons, and similar technologies to enhance user experience, monitor platform usage, and deliver personalized content. You can disable cookies through your browser settings, but some features may be affected.",
      ],
    },
    {
      title: "5. How We Share Your Information",
      list: [
        <>
          <span className="font-semibold">With Other Users:</span> Your public
          profile information is visible to other users and connections.
        </>,
        "With trusted service providers who assist us with hosting, analytics, email, or technical support under strict confidentiality obligations.",
        "When legally required or to protect our rights, safety of users, or in response to law enforcement requests.",
        "In connection with business transfers, mergers, or acquisitions (with safeguards to protect personal data).",
      ],
    },
    {
      title: "6. Data Retention",
      content: [
        "We retain your personal information as long as your account is active or as needed to provide services, comply with legal obligations, resolve disputes, or enforce agreements.",
      ],
    },
    {
      title: "7. Data Security",
      content: [
        "We implement reasonable technical and organizational measures to protect your data, including encryption and secure storage. However, no online platform is completely secure, and we cannot guarantee absolute security.",
      ],
    },
    {
      title: "8. Your Rights",
      list: [
        "Access, update, or correct personal information stored on your account.",
        "Request deletion of your personal data, subject to legal obligations.",
        "Opt-out of marketing communications by changing your preferences.",
        "For users in India, EU, UK, or California, exercise rights under applicable privacy laws (e.g., GDPR, CCPA, DPDP).",
      ],
    },
    {
      title: "9. Children’s Privacy",
      content: [
        "NextCybr is not intended for individuals under 16. We do not knowingly collect personal information from children.",
      ],
    },
    {
      title: "10. Third-Party Links & Integrations",
      content: [
        "Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies.",
      ],
    },
    {
      title: "11. Policy Updates",
      content: [
        "We may revise this Privacy Policy to reflect changes in our practices or for legal, operational, or regulatory reasons. Continued use of NextCybr after changes implies acceptance of the updated policy. We recommend reviewing this policy periodically.",
      ],
    },
    {
      title: "12. Contact Us",
      content: [
        "For questions about this Privacy Policy or to exercise your data rights, please contact us at:",
        <>
          <span className="font-semibold">Email:</span>{" "}
          <Link href="mailto:support@nextcybr.com">support@nextcybr.com</Link>
        </>,
        <>
          <span className="font-semibold">Address:</span> 448 GIDC Makarpura,
          Vadodara – 390 010, Gujarat, India
        </>,
      ],
    },
  ];

  return (
    <section className="w-full">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 flex flex-col gap-5 py-15 pt-25">
        <h1 className=" mt-5 text-[32px] leading-[40px] sm:text-[48px] sm:leading-[60px]">Privacy Policy</h1>
        <div className="space-y-10 font-montserrat text-base leading-relaxed text-text">
          {privacyData.map((item, index) => (
            <div key={index}>
              <h4 className="font-semibold text-xl font-monda text-heading">
                {item.title}
              </h4>

              {item.list ? (
                <ul className="list-disc pl-5 mt-5 space-y-1">
                  {item.list.map((li, i) => (
                    <li key={i}>{li}</li>
                  ))}
                </ul>
              ) : (
                item.content?.map((p, i) => (
                  <p key={i} className="mt-5">
                    {p}
                  </p>
                ))
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
