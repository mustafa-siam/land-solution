/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Heading from "@/components/layout/dashboard/shared/heading";
import { Button } from "@/components/ui/button";
import GlobalHistoryModal from "@/components/layout/dashboard/shared/GlobalHistoryModal/GlobalHistoryModal";
import GlobalFieldRenderer from "@/components/layout/dashboard/shared/GlobalFieldRenderer/GlobalFieldRenderer";
import { useRouter } from "next/navigation";
import { Form, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { IFormInput } from "../type";
import { fieldConfig } from "../fieldConfig";
import { GlobalAICommandInput } from "@/components/layout/dashboard/shared/GlobalAICommandInput/GlobalAICommandInput";

import { toast } from "sonner";
import { useCreateReviewMutation } from "@/redux/features/review/reviewApi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const getInitialMetaData = () => {
  return fieldConfig.reduce((acc, field) => {
    if (field.formType === "array") {
      acc[field.valueKey] = [];
    } 
    else if (field.formType === "file") {
      acc[field.valueKey] = { url: [], file: [] };
    } 
    else {
      acc[field.valueKey] = "";
    }
    return acc;
  }, {} as Record<string, any>);
};

const getInitialMetaDataHistory = () => {
  return fieldConfig.reduce((acc, field) => {
    if (field.formType === "array") {
      acc[field.valueKey] = [[]];
    } 
    else if (field.formType === "file") {
      acc[field.valueKey] = [{ url: [], file: [] }];
    } 
    else {
      acc[field.valueKey] = [];
    }
    return acc;
  }, {} as Record<string, any>);
};

const AddPage = () => {
  const [metaData, setMetaData] = useState(getInitialMetaData);
  const [metaDataHistory, setMetaDataHistory] = useState(
    getInitialMetaDataHistory
  );

  const [handleCreate, { isLoading, error }] = useCreateReviewMutation();
  const router = useRouter();

  const [historyModal, setHistoryModal] = useState<{
    open: boolean;
    field: any;
  }>({
    open: false,
    field: null,
  });

  const defaultValues = getInitialMetaData();

  const methods = useForm<IFormInput>({ defaultValues });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {

      console.log({metaData})
          // ✅ Build FormData
    const formData = new FormData();
//   Object.entries(data).forEach(([key, value]) =>
    //     formData.append(key, value)
    //   );
    formData.append("title",metaData?.title); // send as JSON string
    formData.append("designation",metaData?.designation); // send as JSON string
    formData.append("description",metaData?.description); // send as JSON string
    formData.append("file", metaData?.image?.file[0]); // attach file
    formData.append("social", data?.social);

    await handleCreate(formData).unwrap();


      toast.success("Data added successfully!");
      router.push("/dashboard/manage-review");
    } catch (error: any) {
      console.error("Error adding:", error);

      const apiErrorMessage =
        error?.data?.payload[0]?.message ||
        "Something went wrong. Please try again.";

      toast.error(apiErrorMessage);
    }
  };

  console.log({ error });

  return (
    <div>
      <Heading
        title="Add Review"
        subTitle="Enter information to add a new Review to the list."
      />
      <Form {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="pt-5 lg:pt-7 lg:w-[60%] space-y-10"
        >
          <GlobalFieldRenderer
            fieldConfig={fieldConfig}
            metaData={metaData}
            setMetaData={setMetaData}
            methods={methods}
            setHistoryModal={setHistoryModal}
            setMetaDataHistory={setMetaDataHistory}
          />
          <FormItem className="mb-4">
  <FormLabel>Social</FormLabel>
  <Controller
    name="social"
    control={methods.control}
    rules={{ required: "Social is required" }}
    render={({ field, fieldState }) => (
      <>
        <Select
          value={field.value || ""}
          onValueChange={(value) => field.onChange(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Social" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <FormMessage>{fieldState.error?.message}</FormMessage>
      </>
    )}
  />
</FormItem>



          <Button
            type="submit"
            disabled={isLoading}
            className={`rounded-none mr-5 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Please Wait..." : "Add Review"}
          </Button>

          <GlobalAICommandInput
            metaData={metaData}
            setMetaData={setMetaData}
            setMetaDataHistory={setMetaDataHistory}
            methods={methods}
            fieldConfig={fieldConfig}
          />
        </form>
      </Form>

      <GlobalHistoryModal
        historyModal={historyModal}
        metaData={metaData}
        metaDataHistory={metaDataHistory}
        setMetaData={setMetaData}
        setHistoryModal={setHistoryModal}
        methods={methods}
      />
    </div>
  );
};

export default AddPage;
