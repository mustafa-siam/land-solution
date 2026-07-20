"use client";
import { Mail, MapPin, Phone } from "lucide-react";
import Breadcrumb from "./Breadcrumb";

export default function Page() {
  return (
    <div >
      <Breadcrumb />
      <div className="px-[5%] py-16">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="my-auto">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-yanone-kaffeesatz font-semibold">Want to sell or rent your property / home, <span className="text-ruby-wine">Contact Us</span> </h1>
            <hr className="my-5"/>
            <div className="flex gap-3">
              <MapPin className="text-ruby-wine mt-1" size={18} />
              <div className="">
                <h1 className="font-medium">Address</h1>
                <p>403, Port Washington Road, Canada.</p>
              </div>
            </div>
            <hr className="my-5"/>
            <div className="grid grid-cols-2 gap-5">
            <div className="flex gap-3">
              <Phone className="text-ruby-wine mt-1" size={18} />
              <div className="">
                <h1 className="font-medium">phone</h1>
                <p> +1 800-525-54-589</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Mail className="text-ruby-wine mt-1" size={18} />
              <div className="">
                <h1 className="font-medium">Email</h1>
                <p>info@wdesignkit.com</p>
              </div>
            </div>

            </div>
            <hr className="my-5"/>
          </div>
          <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4526.996667986299!2d90.41561327615845!3d24.01784927848886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755da4eced0c537%3A0x8d54b38a823b5212!2sDhaka%20University%20of%20Engineering%20and%20Technology%20(DUET)!5e1!3m2!1sen!2sbd!4v1764601436951!5m2!1sen!2sbd"
  width={600}
  height={450}
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  className="w-full"
/>
        </div>
      </div>
    </div>
  );
}
