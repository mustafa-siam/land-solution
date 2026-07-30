"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

const faqs: FAQItem[] = [
  {
    category: "Services",
    question: "What types of renovation and design projects do you handle?",
    answer:
      "We handle everything from full home remodeling, kitchen and bath renovations, to custom interior styling and architectural planning. Whether it is a single room refresh or a complete rebuild, our team covers end-to-end management.",
  },
  {
    category: "Process",
    question: "How long does a typical project usually take?",
    answer:
      "Timelines depend heavily on the project scope. Minor interior updates take around 2–4 weeks, while major structural renovations typically take 2–5 months. During our initial consultation, we provide a detailed project schedule.",
  },
  {
    category: "Pricing",
    question: "How do you handle project quotes and budgeting?",
    answer:
      "We provide transparent, itemized estimates after our site visit and initial design phase. We work closely with you to align materials and scope with your target budget, ensuring no hidden charges mid-project.",
  },
  {
    category: "Guarantees",
    question: "Are your services covered by warranties or guarantees?",
    answer:
      "Yes! All structural work and custom installations come with our standard workmanship warranty. Material warranties are passed directly from suppliers to give you complete peace of mind.",
  },
  {
    category: "Consultation",
    question: "Is the initial consultation free?",
    answer:
      "Yes, our initial 30-minute discovery call or virtual consultation is completely free. We discuss your vision, review site details, and explain how we can help before any commitment.",
  },
];

export default function FaqItem() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default first open

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-8 font-sans text-gray-900 border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        
        {/* Header & Subheading */}
        <div className="text-center mb-12">
           <h1 className="text-4xl sm:text-5xl  font-bold tracking-tight text-gray-900">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-500 mt-4 text-sm sm:text-[15px] leading-relaxed">
            Everything you need to know about working with us, our design process, and project expectations.
            </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-indigo-200 bg-indigo-50/30 shadow-xs"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="pr-4 flex flex-col sm:flex-row sm:items-center gap-2">
                    {faq.category && (
                      <span className="text-[10px] font-bold tracking-wider uppercase text-indigo-600 bg-indigo-100/60 px-2 py-0.5 rounded-md self-start sm:self-auto">
                        {faq.category}
                      </span>
                    )}
                    <span className="text-sm sm:text-base font-semibold text-gray-900">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`p-2 rounded-full text-gray-500 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-180 bg-indigo-100 text-indigo-600" : "bg-gray-100"
                    }`}
                  >
                    <FaChevronDown className="text-xs" />
                  </div>
                </button>

                {/* Animated Body Content */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Help Footer CTA */}
        <div className="mt-12 text-center p-6 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-gray-900">Still have questions?</h4>
            <p className="text-xs text-gray-500">Can&apos;t find the answer you&apos;re looking for? Please chat with our friendly team.</p>
          </div>
          <button className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors duration-200 shadow-xs flex-shrink-0 cursor-pointer">
            Get in Touch
          </button>
        </div>

      </div>
    </section>
  );
}