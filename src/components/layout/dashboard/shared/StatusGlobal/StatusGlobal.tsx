/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import { useState, useCallback } from "react";
import { UserCog } from "lucide-react";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


interface StatusGlobalProps {
  filters: { isTrash?: boolean };
  item: { _id: string; status: string };
  handleUpdateStatus: any;
  isUpdatingStatus: boolean;
  statusOption: string[];
}

export default function StatusGlobal({
  filters,
  item,
  handleUpdateStatus,
  isUpdatingStatus,
  statusOption
}: StatusGlobalProps) {
  const [statusForUpdate, setStatusForUpdate] = useState(item?.status || "");

  const handleStatusUpdateFunction = useCallback(
    async (id: string, status: string) => {
      try {
        await handleUpdateStatus({ id, status }).unwrap();
        toast.success("Successfully updated status!");
      } catch (error: any) {
        const errorMessage =
          error?.data?.payload?.message || error?.data?.message || "Something went wrong";
        toast.error(errorMessage);
      }
    },
    [handleUpdateStatus]
  );

  if (filters?.isTrash) return null;

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="cursor-pointer text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 flex w-full h-full px-2 py-1.5"
>
            <UserCog className="mr-2 mt-1 h-4 w-4 text-blue-600 dark:text-blue-400" />
            Status
          </button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to update the status?</AlertDialogTitle>
          </AlertDialogHeader>

     <div className="mt-4">
  <label
    htmlFor="status"
    className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
  >
    Select New Status:
  </label>
  <select
    id="status"
    value={statusForUpdate}
    onChange={(e) => setStatusForUpdate(e.target.value)}
    className="w-full border border-gray-300 dark:border-gray-600 
               bg-white dark:bg-gray-800 
               text-gray-900 dark:text-gray-100 
               px-3 py-2 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               transition-colors duration-200"
  >
    {statusOption.map((status) => (
      <option
        key={status}
        value={status}
        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </option>
    ))}
  </select>
</div>


          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="
  bg-blue-600 hover:bg-blue-700 
  dark:bg-blue-700 dark:hover:bg-blue-800 
  text-white 
  transition-colors duration-200
"

              onClick={() => handleStatusUpdateFunction(item._id, statusForUpdate)}
              disabled={isUpdatingStatus}
            >
              {isUpdatingStatus ? "Updating..." : "Update"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <DropdownMenuSeparator />
    </div>
  );
}
