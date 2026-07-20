/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, Undo2 } from "lucide-react";

interface TrashGlobalProps {
  filters: { isTrash: boolean };
  handleUpdateTrash: any;
  isLoadingUpdateTrash: boolean;
  id: string;
}

export default function TrashGlobal({
  filters,
  handleUpdateTrash,
  isLoadingUpdateTrash,
  id,
}: TrashGlobalProps) {
  const handleUpdateTrashFunction = async (id: string) => {
    try {
      const data = { id, isTrash: !filters?.isTrash };
      await handleUpdateTrash(data).unwrap();
      toast.success("Successfully updated trash status!");
    } catch (error: any) {
      toast.error(
        error?.data?.payload?.message ||
          error?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const isTrash = filters.isTrash;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className={`cursor-pointer flex w-full h-full px-2 py-1.5
            ${
              isTrash
                ? "text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                : "text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
            }
          `}
        >
          {isTrash ? (
            <Undo2 className="mr-2 mt-1 h-4 w-4" />
          ) : (
            <Trash2 className="mr-2 mt-1 h-4 w-4" />
          )}
          {isTrash ? "Restore" : "Move to Trash"}
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="dark:bg-slate-900 dark:text-gray-100">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold">
            {isTrash ? "Restore this item?" : "Move this item to trash?"}
          </AlertDialogTitle>

          <AlertDialogDescription className="text-sm text-gray-600 dark:text-gray-400">
            {isTrash
              ? "This will restore the item and make it visible again in your main list."
              : "This item will be moved to the trash. You can restore it later if needed."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className=" bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-gray-200 transition-all">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            className={` px-4 py-2 text-white transition-all
              ${
                isTrash
                  ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                  : "bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
              }`}
            onClick={() => handleUpdateTrashFunction(id)}
            disabled={isLoadingUpdateTrash}
          >
            {isLoadingUpdateTrash
              ? "Processing..."
              : isTrash
              ? "Restore"
              : "Move to Trash"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
