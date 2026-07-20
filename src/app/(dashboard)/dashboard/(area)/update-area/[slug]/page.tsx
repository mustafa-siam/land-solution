/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Heading from "@/components/layout/dashboard/shared/heading";
import { Button } from "@/components/ui/button";
import GlobalHistoryModal from "@/components/layout/dashboard/shared/GlobalHistoryModal/GlobalHistoryModal";
import GlobalFieldRenderer from "@/components/layout/dashboard/shared/GlobalFieldRenderer/GlobalFieldRenderer";

import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { ParamsSlug } from "@/Type/IFields";
import { IFormInput } from "../../type";
import { fieldConfig } from "../../fieldConfig";
import { toast } from "sonner";
import { GlobalAICommandInput } from "@/components/layout/dashboard/shared/GlobalAICommandInput/GlobalAICommandInput";
import { useGetSingleAreaBySlugQuery, useUpdateAreaMutation } from "@/redux/features/area/areaApi";

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

const UpdatePage: React.FC<{ params: Promise<ParamsSlug> }> = ({ params }) => {
  const [slug, setSlug] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [metaData, setMetaData] = useState(getInitialMetaData);
  
  const [metaDataHistory, setMetaDataHistory] = useState(
    getInitialMetaDataHistory
  );
  const [handleUpdate, { isLoading, error }] =
    useUpdateAreaMutation();
  const router = useRouter();

  console.log({ error });

  const [historyModal, setHistoryModal] = useState<{
    open: boolean;
    field: any;
  }>({ open: false, field: null });

  const { data, refetch } = useGetSingleAreaBySlugQuery(slug);
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    resolveParams();
  }, [params]);

  const defaultValues = fieldConfig.reduce((acc, field) => {
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

const methods = useForm<IFormInput>({ defaultValues });


const onSubmit: SubmitHandler<IFormInput> = async () => {
  try {
    // Create FormData for file uploads
    const formData = new FormData();
//   Object.entries(data).forEach(([key, value]) =>
    //     formData.append(key, value)
    //   );

    // Add text fields
    formData.append("title",metaData?.title); // send as JSON string
    
    // Send formData instead of JSON
    await handleUpdate({ id, payload: formData }).unwrap();

    toast.success("Data updated successfully!");
    refetch();
    router.push("/dashboard/manage-area");
  } catch (error: any) {
    console.error({ error });
    toast.error(
      error?.data?.payload?.message ||
        error?.data?.message ||
        "An error occurred"
    );
  }
};


  console.log({data});

  // useEffect(() => {
  //   if (data?.data) {
  //     const payload = data.data;
  //     const newData = {
  //       title: payload.title || "",
  //     };
  //     setMetaData(newData);
  //     setMetaDataHistory(newData);
  //     methods.reset(newData);
  //     setId(payload._id);
  //   }
  // }, [data, methods]);

  useEffect(() => {
  if (data?.data) {
    const payload = data.data;

    const newData = fieldConfig.reduce((acc, field) => {
      if (field.formType === "array") {
        acc[field.valueKey] = payload[field.valueKey] || [];
      } 
      else if (field.formType === "file") {
        // For image fields, store old image URLs in `url`, keep file empty
        acc[field.valueKey] = {
          url: payload[field.valueKey]
            ? Array.isArray(payload[field.valueKey])
              ? payload[field.valueKey] // multiple images
              : [payload[field.valueKey]] // single image string
            : [],
          file: [],
        };
      } 
      else {
        acc[field.valueKey] = payload[field.valueKey] || "";
      }
      return acc;
    }, {} as Record<string, any>);

    setMetaData(newData);
    setMetaDataHistory(newData);
    methods.reset(newData);
    setId(payload._id);
  }
}, [data, methods]);


  return (
    <div>
      <Heading
        title="Update Area"
        subTitle="Edit the details of an existing Area."
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

          <Button
            type="submit"
            disabled={isLoading}
            className={`rounded-none mr-5 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Please Wait..." : "Update Area"}
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

export default UpdatePage;
