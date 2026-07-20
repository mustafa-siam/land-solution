import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Eye } from "lucide-react"

export function GlobalDescriptionModal({title, description}:{title: string, description:string}) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="ghost" className="text-blue-600 hover:underline hover:text-blue-700"><Eye/> View</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
             <p dangerouslySetInnerHTML={{ __html: description}}></p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </form>
    </Dialog>
  )
}
