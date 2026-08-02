"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export function FAQ() {
  const faqList = [
    {
      id: "item-1",
      question: "How do I start the process of buying a property through UrbanKeys?",
      answer:
        "Simply browse our available listings or reach out to our team directly. We will schedule a personalized consultation to understand your requirements, arrange property visits, and guide you through legal checks, price negotiations, and final registration.",
    },
    {
      id: "item-2",
      question: "Are there any hidden fees or upfront costs when listing my property?",
      answer:
        "No. We pride ourselves on total transparency. There are zero upfront or hidden fees for staging, valuation, or initial marketing. Our service commission is agreed upon beforehand and paid only when your property successfully closes.",
    },
    {
      id: "item-3",
      question: "What documents do I need to prepare before renting out my apartment?",
      answer:
        "You will typically need proof of property ownership (Title Deed / Mutation), national ID (NID), tax clearance certificates, and utility bill copies. Our legal team assists landlords with drafting legally binding rental agreements compliant with Bangladesh tenancy laws.",
    },
    {
      id: "item-4",
      question: "How does the luxury staging and HDR photography service work?",
      answer:
        "Once you list your property with us, our design team evaluates your interior. We furnish or re-style the space using high-end decor and capture it using professional HDR and drone cameras to maximize buyer interest and offer value.",
    },
    {
      id: "item-5",
      question: "Can UrbanKeys help with property valuation and legal verification?",
      answer:
        "Yes, absolutely. Our legal experts verify all land titles, land revenue records, and RS/BS mutation records to ensure clear title ownership before any deal is signed, protecting both buyers and sellers.",
    },
    {
      id: "item-6",
      question: "How long does it typically take to sell a property in Dhaka?",
      answer:
        "While timelines vary depending on location, property condition, and pricing, our targeted marketing network and exclusive buyer pool generally close sales 30% faster than traditional market listings.",
    },
  ];

  return (
    <section className="px-[5%] py-16 sm:py-24 bg-gradient-to-b from-gray-50 via-gray-100/50 to-gray-50 relative z-20 font-sans text-gray-900">
      <div className="max-w-screen-lg mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#800020]/10 border border-ruby-wine/20 text-[#800020] text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            Everything you need to know about buying, selling, and renting properties with UrbanKeys.
          </p>
        </div>

        {/* Accordion List */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-sm">
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-3"
            defaultValue="item-1"
          >
            {faqList.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border border-gray-100 rounded-xl px-5 py-1 bg-gray-50/50 data-[state=open]:bg-white data-[state=open]:border-gray-200 data-[state=open]:shadow-sm transition-all duration-200"
              >
                <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-gray-800 hover:text-[#800020] hover:no-underline py-4 transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-gray-600 leading-relaxed pb-4 pt-1">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}