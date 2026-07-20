"use client";

import { useCreateContactForProductMutation } from "@/redux/features/contactForProduct/contactForProductApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormValues = {
  title: string;
  phone: string;
  message: string;
};

export default function Form({productId}:{productId: string}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
    const [handleCreate, { isLoading, error }] = useCreateContactForProductMutation();


   const onSubmit: SubmitHandler<FormValues> = async (data) => {
      try {
  
      const formData = new FormData();
  //   Object.entries(data).forEach(([key, value]) =>
      //     formData.append(key, value)
      //   );
      formData.append("title",data?.title); // send as JSON string
      formData.append("phone",data?.phone); // send as JSON string
      formData.append("message",data?.message); // send as JSON string
      formData.append("productId",productId); // send as JSON string
    
  
  
      await handleCreate(formData).unwrap();
  
  
        toast.success("Data added successfully!");
    reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Error adding:", error);
  
        const apiErrorMessage =
          error?.data?.payload[0]?.message ||
          "Something went wrong. Please try again.";
  
        toast.error(apiErrorMessage);
      }
    };

  return (
    <div className="p-5 bg-[#F5F5F5] rounded-md max-w-md">
      <p className="text-xl sm:text-2xl lg:text-3xl font-yanone-kaffeesatz mb-3">
        Want to visit the property ?
      </p>

      <p className="text-gray-700 mb-6">
        Just <span className="text-ruby-wine font-medium">fill the form</span>,
        our agent will contact you for further details and meet-ups
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1 text-sm font-medium">Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            {...register("title", { required: "Name is required" })}
            className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-ruby-wine bg-white"
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            {...register("phone", { required: "Phone number is required" })}
            className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-ruby-wine bg-white"
          />
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block mb-1 text-sm font-medium">Message</label>
          <textarea
            rows={4}
            placeholder="Enter your message"
            {...register("message",{ required: "Pessage number is required" })}
            className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-ruby-wine bg-white resize-none"
          />
           {errors.message && (
            <p className="text-sm text-red-500 mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-ruby-wine text-white px-6 py-2 rounded hover:opacity-90 transition cursor-pointer"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
