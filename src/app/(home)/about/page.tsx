"use client";
import WhyUs from "@/components/layout/Home/About/WhyUs/WhyUs";
import Breadcrumb from "./Breadcrumb";
import AboutUs from "@/components/layout/Home/About/AboutUs/AboutUs";
import { FAQ } from "@/components/layout/Home/About/FAQ/FAQ";
import OurClientReviews from "@/components/layout/Home/Home/OurClientReviews/OurClientReviews";

export default function Page() {
  return (
    <div >
      <Breadcrumb />
      <AboutUs />
      <WhyUs  />
      <FAQ  />
      <OurClientReviews/>
    </div>
  );
}
