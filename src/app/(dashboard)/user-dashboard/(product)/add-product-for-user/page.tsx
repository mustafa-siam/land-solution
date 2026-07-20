/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState } from "react";
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
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllAreasQuery } from "@/redux/features/area/areaApi";


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
    const { data } = useGetAllCategoriesQuery( 
      {page: 1,
    limit: 100,
    search: "",
    status: "published",
    isTrash: false}
  );
    const { data:area } = useGetAllAreasQuery( 
      {page: 1,
    limit: 100,
    search: "",
    status: "published",
    isTrash: false}
  );

  const allData : any[] = useMemo(() => data?.data?.data || [], [data]);
  const allArea : any[] = useMemo(() => area?.data?.data || [], [area]);
  const [handleCreate, { isLoading, error }] = useCreateProductMutation();
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
      console.log({data})
          // ✅ Build FormData
    const formData = new FormData();
//   Object.entries(data).forEach(([key, value]) =>
    //     formData.append(key, value)
    //   );
    formData.append("createBy", "user"); // send as JSON string
    formData.append("title",metaData?.title); // send as JSON string
    formData.append("description",metaData?.description); // send as JSON string
    formData.append("location",metaData?.location); // send as JSON string
    formData.append("video",metaData?.video); // send as JSON string
    formData.append("price",metaData?.price); // send as JSON string
    formData.append("termsAndConditions",metaData?.termsAndConditions); // send as JSON string
    formData.append("phone",metaData?.phone); // send as JSON string



    formData.append("condition",metaData?.condition); // send as JSON string
    formData.append("bedrooms",metaData?.bedrooms); // send as JSON string
    formData.append("bathrooms",metaData?.bathrooms); // send as JSON string
    formData.append("sizeSqft",metaData?.sizeSqft); // send as JSON string
    formData.append("balcony",metaData?.balcony); // send as JSON string
    formData.append("floorLevel",metaData?.floorLevel); // send as JSON string
    formData.append("totalFloor",metaData?.totalFloor); // send as JSON string
    formData.append("drawingSpace",data?.drawingSpace); // send as JSON string
    formData.append("diningRoom",data?.diningRoom); // send as JSON string
    formData.append("kitchen",data?.kitchen); // send as JSON string
    formData.append("parking",data?.parking); // send as JSON string
    formData.append("collegeUniversity",metaData?.collegeUniversity); // send as JSON string
    formData.append("hospitalClinic",metaData?.hospitalClinic); // send as JSON string
    formData.append("mosque",metaData?.mosque); // send as JSON string
    formData.append("supermarketGrocery",metaData?.supermarketGrocery); // send as JSON string
    formData.append("bankATM",metaData?.bankATM); // send as JSON string
    formData.append("busMetroStation",metaData?.busMetroStation); // send as JSON string
    formData.append("fullAddress",metaData?.fullAddress); // send as JSON string
    formData.append("country",metaData?.country); // send as JSON string
    formData.append("city",metaData?.city); // send as JSON string
    formData.append("state",metaData?.state); // send as JSON string
    formData.append("googleMap",metaData?.googleMap); // send as JSON string

    formData.append("categoryId",data?.categoryId); // send as JSON string
    formData.append("areaId",data?.areaId); // send as JSON string

    formData.append("metaSeoDescription",metaData?.metaSeoDescription); // send as JSON string

    {data?.gas && formData.append("gas",data?.gas)}; // send as JSON string
    { data?.facing && formData.append("facing",data?.facing)}; // send as JSON string
    {data?.electricity && formData.append("electricity",data?.electricity)}; // send as JSON string
    {data?.water && formData.append("water",data?.water)}; // send as JSON string

    {data?.availability && formData.append("availability",data?.availability)}; // send as JSON string
    {data?.propertyType && formData.append("propertyType",data?.propertyType)}; // send as JSON string


     metaData.image.file.forEach((file: File) => {
      formData.append("file", file);
    });
     metaData.feature.forEach((item: string) => {
  // Add [] to the key name
  formData.append("feature[]", item); 
});

metaData.metaSeoTags.forEach((item: string) => {
  formData.append("metaSeoTags[]", item);
});
  


    await handleCreate(formData).unwrap();


      toast.success("Data added successfully!");
      router.push("/user-dashboard/manage-product-for-user");
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
        title="Add Product"
        subTitle="Enter information to add a new Product to the list."
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

              {/* Drawing Space */}
<FormItem className="mb-4">
  <FormLabel>Drawing Space</FormLabel>
  <Controller
    name="drawingSpace"
    control={methods.control}
    rules={{ required: false }}
    render={({ field, fieldState }) => (
      <>
        <Select
          value={field.value || ""}
          onValueChange={(value) => field.onChange(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select drawing space" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="YES">Yes</SelectItem>
              <SelectItem value="NO">No</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage>{fieldState.error?.message}</FormMessage>
      </>
    )}
  />
</FormItem>

{/* Dining Room */}
<FormItem className="mb-4">
  <FormLabel>Dining Room</FormLabel>
  <Controller
    name="diningRoom"
    control={methods.control}
    rules={{ required: false }}
    render={({ field, fieldState }) => (
      <>
        <Select
          value={field.value || ""}
          onValueChange={(value) => field.onChange(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select dining room" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="YES">Yes</SelectItem>
              <SelectItem value="NO">No</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage>{fieldState.error?.message}</FormMessage>
      </>
    )}
  />
</FormItem>

{/* Kitchen */}
<FormItem className="mb-4">
  <FormLabel>Kitchen</FormLabel>
  <Controller
    name="kitchen"
    control={methods.control}
    rules={{ required: false }}
    render={({ field, fieldState }) => (
      <>
        <Select
          value={field.value || ""}
          onValueChange={(value) => field.onChange(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select kitchen" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="YES">Yes</SelectItem>
              <SelectItem value="NO">No</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage>{fieldState.error?.message}</FormMessage>
      </>
    )}
  />
</FormItem>

{/* Parking */}
<FormItem className="mb-4">
  <FormLabel>Parking</FormLabel>
  <Controller
    name="parking"
    control={methods.control}
    rules={{ required: false }}
    render={({ field, fieldState }) => (
      <>
        <Select
          value={field.value || ""}
          onValueChange={(value) => field.onChange(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select parking" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="YES">Yes</SelectItem>
              <SelectItem value="NO">No</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage>{fieldState.error?.message}</FormMessage>
      </>
    )}
  />
</FormItem>

            <FormItem className="mb-4">
            <FormLabel>Gas Connection</FormLabel>
            <Controller
              name="gas"
              control={methods.control}
              rules={{ required: false }}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    value={field.value || ""}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select gas type" />
                    </SelectTrigger>
          
                    <SelectContent>
                      <SelectGroup><SelectItem value="line">Line</SelectItem>
              <SelectItem value="cylinder">Cylinder</SelectItem>
                       
                      </SelectGroup>
                    </SelectContent>
                  </Select>
          
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </>
              )}
            />
          </FormItem>
            <FormItem className="mb-4">
            <FormLabel>Facing Direction</FormLabel>
            <Controller
              name="facing"
              control={methods.control}
              rules={{ required: false }}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    value={field.value || ""}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select facing direction" />
                    </SelectTrigger>
          
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="north" >North</SelectItem>
                        <SelectItem value="south" >South</SelectItem>
                        <SelectItem value="east" >East</SelectItem>
                        <SelectItem value="west" >West</SelectItem>
                        <SelectItem value="northeast" >Northeast</SelectItem>
                        <SelectItem value="northwest" >Northwest</SelectItem>
                        <SelectItem value="southeast" >Southeast</SelectItem>
                        <SelectItem value="southwest" >Southwest</SelectItem>
                       
                      </SelectGroup>
                    </SelectContent>
                  </Select>
          
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </>
              )}
            />
          </FormItem>
            <FormItem className="mb-4">
            <FormLabel>Electricity Type</FormLabel>
            <Controller
              name="electricity"
              control={methods.control}
              rules={{ required: false }}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    value={field.value || ""}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select electricity type" />
                    </SelectTrigger>
          
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="prepaid" >Prepaid</SelectItem>
                        <SelectItem value="postpaid" >Postpaid</SelectItem>
                        <SelectItem value="metered" >Metered</SelectItem>
                       
                      </SelectGroup>
                    </SelectContent>
                  </Select>
          
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </>
              )}
            />
          </FormItem>
            <FormItem className="mb-4">
            <FormLabel>Select water source</FormLabel>
            <Controller
              name="water"
              control={methods.control}
              rules={{ required: false }}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    value={field.value || ""}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Water" />
                    </SelectTrigger>
          
                    <SelectContent>
                      <SelectGroup><SelectItem value="wasa">WASA</SelectItem>
              <SelectItem value="govt_supply">Government Supply</SelectItem>
              <SelectItem value="deep_tube_well">Deep Tube Well</SelectItem>
              <SelectItem value="shallow_tube_well">Shallow Tube Well</SelectItem>
              <SelectItem value="borewell">Borewell</SelectItem>
              <SelectItem value="community_tank">Community Tank</SelectItem>
              <SelectItem value="rainwater_harvesting">Rainwater Harvesting</SelectItem>
              <SelectItem value="surface_water">Surface Water</SelectItem>
              <SelectItem value="none">None</SelectItem>
                       
                      </SelectGroup>
                    </SelectContent>
                  </Select>
          
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </>
              )}
            />
          </FormItem>

            <FormItem className="mb-4">
            <FormLabel>Availability</FormLabel>
            <Controller
              name="availability"
              control={methods.control}
              rules={{ required: false }}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    value={field.value || ""}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Availability" />
                    </SelectTrigger>
          
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="available" >Available</SelectItem>
                        <SelectItem value="booked" >Booked</SelectItem>
                        <SelectItem value="rented" >Rented</SelectItem>
                        <SelectItem value="sold" >Sold</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
          
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </>
              )}
            />
          </FormItem>
            <FormItem className="mb-4">
            <FormLabel>Property Type</FormLabel>
            <Controller
              name="propertyType"
              control={methods.control}
              rules={{ required: false }}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    value={field.value || ""}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Property Type" />
                    </SelectTrigger>
          
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="apartment" >Apartment</SelectItem>
                        <SelectItem value="flat" >Flat</SelectItem>
                        <SelectItem value="room" >Room</SelectItem>
                        <SelectItem value="house" >House</SelectItem>
                        <SelectItem value="office" >Office</SelectItem>
                        <SelectItem value="shop" >Shop</SelectItem>
                        <SelectItem value="warehouse" >Warehouse</SelectItem>
                        <SelectItem value="land" >Land</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
          
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </>
              )}
            />
          </FormItem>


            <FormItem className="mb-4">
            <FormLabel>Category</FormLabel>
            <Controller
              name="categoryId"
              control={methods.control}
              rules={{ required: "Category is required" }}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    value={field.value || ""}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
          
                    <SelectContent>
                      <SelectGroup>
                        {
                          allData.map(i=>

                            <SelectItem value={i?._id} key={i?._id}>{i?.title}</SelectItem>
                          )
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
          
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </>
              )}
            />
          </FormItem>
            <FormItem className="mb-4">
            <FormLabel>Area</FormLabel>
            <Controller
              name="areaId"
              control={methods.control}
              rules={{ required: "Area is required" }}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    value={field.value || ""}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Area" />
                    </SelectTrigger>
          
                    <SelectContent>
                      <SelectGroup>
                        {
                          allArea.map(i=>

                            <SelectItem value={i?._id} key={i?._id}>{i?.title}</SelectItem>
                          )
                        }
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
            {isLoading ? "Please Wait..." : "Add Product"}
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
