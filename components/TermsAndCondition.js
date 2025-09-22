import Link from "next/link";

const TermsAndConditions = () => {
  const termsData = [
    {
      title: "1. Acceptance of Terms",
      content: [
        "By accessing or using NextCybr, you confirm that you have read, understood, and agree to comply with these Terms & Conditions. If you do not agree, please do not use the platform.",
      ],
    },
    {
      title: "2. Eligibility",
      content: [
        "You must be at least 16 years old to use NextCybr. By registering, you confirm that you have the legal right to form a binding contract and are not prohibited by law from using the platform.",
      ],
    },
    {
      title: "3. Account Registration",
      list: [
        "Provide accurate, current, and complete information during registration.",
        "Keep your account credentials secure and confidential.",
        "You are responsible for all activities performed under your account.",
        "Notify NextCybr immediately if you suspect any unauthorized use of your account.",
      ],
    },
    {
      title: "4. User Conduct",
      list: [
        "Do not post content that is illegal, offensive, defamatory, obscene, or infringes on intellectual property rights.",
        "Do not harass, intimidate, or harm other users.",
        "Do not impersonate another person or entity.",
        "Do not upload viruses, malware, or spam.",
        "Do not use automated scripts or bots to access or collect data from the platform.",
        "Do not attempt to disrupt or bypass security features of the platform.",
      ],
    },
    {
      title: "5. Content Ownership and License",
      content: [
        "You retain ownership of content you post on NextCybr. By posting, you grant NextCybr a non-exclusive, worldwide, royalty-free license to display, distribute, and promote your content on the platform.",
        "You confirm that your content does not violate any laws or third-party rights.",
        "NextCybr may remove content that violates these Terms or applicable law without prior notice.",
      ],
    },
    {
      title: "6. Intellectual Property",
      content: [
        "All rights, titles, and interests in the platform (including software, logos, trademarks, and designs) are owned by NextCybr or its licensors.",
        "You may not copy, modify, distribute, or create derivative works without prior written consent.",
      ],
    },
    {
      title: "7. Paid Services / Subscription (Optional)",
      list: [
        "Some features may require paid subscriptions.",
        "Payments are non-refundable except where required by law.",
        "We may modify pricing, features, or terms for paid services at any time.",
        "Use of paid features is subject to compliance with these Terms.",
      ],
    },
    {
      title: "8. Privacy",
      content: [
        "Your use of NextCybr is also governed by our Privacy Policy, which explains how we collect, use, and protect your data.",
      ],
    },
    {
      title: "9. Disclaimers",
      content: [
        "NextCybr is provided 'as is' and 'as available'.",
        "We do not guarantee that the platform will be uninterrupted, secure, or error-free.",
        "We are not responsible for any user-generated content or third-party links.",
      ],
    },
    {
      title: "10. Limitation of Liability",
      content: [
        "To the fullest extent allowed by law, NextCybr is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the platform.",
        "You agree to use the platform at your own risk.",
      ],
    },
    {
      title: "11. Indemnification",
      content: [
        "You agree to indemnify and hold harmless NextCybr, its affiliates, employees, and agents from any claims, losses, or damages arising from your violation of these Terms or your use of the platform.",
      ],
    },
    {
      title: "12. Termination",
      content: [
        "We may suspend or terminate your account if you violate these Terms or misuse the platform.",
        "Upon termination, your rights to access the platform will end immediately.",
      ],
    },
    {
      title: "13. Governing Law and Dispute Resolution",
      content: [
        "These Terms are governed by the laws of [Insert Your Country/State].",
        "Any disputes will be resolved in the courts of [Insert Location].",
        "You agree to resolve disputes with NextCybr in good faith before taking legal action.",
      ],
    },
    {
      title: "14. Modifications to Terms",
      content: [
        "NextCybr may update these Terms from time to time.",
        "Continued use of the platform constitutes acceptance of the updated Terms.",
        "Significant changes will be communicated through the platform or email.",
      ],
    },
    {
      title: "15. Contact Information",
      content: [
        "For questions about these Terms, please contact:",
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
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 flex flex-col items-start gap-5 py-15">
        <h1 className="text-[32px] leading-[40px] sm:text-[48px] sm:leading-[60px] text-gray-100">
          Terms & Conditions
        </h1>

        <div className="space-y-10 text-base leading-relaxed text-text">
          {termsData.map((item, index) => (
            <div key={index}>
              <h4 className="font-semibold text-xl text-heading text-gray-200">
                {item.title}
              </h4>

              {item.list ? (
                <ul className="list-disc pl-5 mt-5 space-y-1 text-gray-300">
                  {item.list.map((li, i) => (
                    <li key={i}>{li}</li>
                  ))}
                </ul>
              ) : (
                item.content?.map((p, i) => (
                  <p key={i} className="mt-5 text-gray-300">
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

export default TermsAndConditions;
