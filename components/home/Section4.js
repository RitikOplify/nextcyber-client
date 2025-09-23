"use client";
import React, { useState } from "react";

const FAQSection = () => {
  const [openItems, setOpenItems] = useState(new Set([]));

  const faqItems = [
    {
      id: 0,
      question: "How long does it take to complete a web development project?",
      answer:
        "The timeline varies depending on the project's complexity and requirements. Our team strives to deliver projects on time while maintaining the highest quality standards.",
    },
    {
      id: 1,
      question: "Can you handle large-scale mobile app development projects?",
      answer:
        "Yes, we have extensive experience in developing large-scale mobile applications across various platforms including iOS and Android.",
    },
    {
      id: 2,
      question:
        "Do you offer maintenance services for websites and apps developed by other companies?",
      answer:
        "Absolutely! We provide comprehensive maintenance and support services for existing websites and applications, regardless of who originally developed them.",
    },
    {
      id: 3,
      question:
        "How do you ensure the security of user data in your web applications?",
      answer:
        "We implement industry-standard security practices including encryption, secure authentication, regular security audits, and compliance with data protection regulations.",
    },
    {
      id: 4,
      question:
        "Can you create a responsive website design that looks great on all devices?",
      answer:
        "Yes, all our websites are built with responsive design principles to ensure optimal viewing experience across desktop, tablet, and mobile devices.",
    },
    {
      id: 5,
      question:
        "What digital marketing strategies do you employ to drive website traffic?",
      answer:
        "We utilize SEO optimization, content marketing, social media marketing, PPC campaigns, and analytics-driven strategies to increase your website's visibility and traffic.",
    },
    {
      id: 6,
      question: "Can you integrate third-party APIs into our mobile app?",
      answer:
        "Yes, we have expertise in integrating various third-party APIs including payment gateways, social media APIs, mapping services, and custom business APIs.",
    },
    {
      id: 7,
      question:
        "How do you ensure cross-platform compatibility for mobile apps?",
      answer:
        "We use modern cross-platform frameworks like React Native and Flutter, along with thorough testing across different devices and operating systems.",
    },
  ];

  const half = Math.ceil(faqItems.length / 2);
  const leftItems = faqItems.slice(0, half);
  const rightItems = faqItems.slice(half);

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const PlusIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  );

  const MinusIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18 12H6"
      />
    </svg>
  );

  return (
    <div className="bg-g-900 py-20 ">
      <div className=" max-w-[1440px] mx-auto px-5 sm:px-10">
        {/* Header Section */}
        <div className="text-center mb-15">
          <h2 className="text-accent-color-1 text-4xl leading-11 font-medium mb-3.5">
            Frequently Asked Questions
          </h2>
          <p className="text-g-200 text-base leading-6 max-w-3xl mx-auto">
            Got questions? We&apos;ve got answers. Check out our frequently
            asked questions section to find valuable insights into our
            processes, pricing, and more. Transparency is at the core of our
            client interactions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            {leftItems.map((item) => (
              <div
                key={item.id}
                className="border-b border-g-500 flex flex-col gap-6 overflow-hidden p-7.5"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full text-left flex items-center justify-between"
                >
                  <span className="text-g-100 font-medium text-base leading-6">
                    {item.question}
                  </span>
                  <div className="text-g-200 p-2 rounded-full bg-g-600 flex-shrink-0">
                    {openItems.has(item.id) ? <MinusIcon /> : <PlusIcon />}
                  </div>
                </button>

                {openItems.has(item.id) && (
                  <div>
                    <p className="text-g-200 pr-8 text-base leading-[150%]">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {rightItems.map((item) => (
              <div
                key={item.id}
                className="border-b border-g-500 flex flex-col gap-6 overflow-hidden p-7.5"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full text-left flex items-center justify-between"
                >
                  <span className="text-g-100 font-medium text-base leading-6">
                    {item.question}
                  </span>
                  <div className="text-g-200 p-2 rounded-full bg-g-600 flex-shrink-0">
                    {openItems.has(item.id) ? <MinusIcon /> : <PlusIcon />}
                  </div>
                </button>

                {openItems.has(item.id) && (
                  <div>
                    <p className="text-g-200 pr-8 text-base leading-[150%]">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
