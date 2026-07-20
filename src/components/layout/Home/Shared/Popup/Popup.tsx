"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useGetAllPopupsQuery } from "@/redux/features/popup/popupApi"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"

export function Popup() {
  const router = useRouter()

  const { data } = useGetAllPopupsQuery({
    page: 1,
    limit: 1,
    search: "",
    status: "published",
    isTrash: false,
  })

  const allData = useMemo(() => data?.data?.data || [], [data])
  const popup = allData[0]

  const [open, setOpen] = useState(false)

  // 🔥 Auto open popup only once per day
  useEffect(() => {
    if (!popup?.title) return

    const today = new Date().toISOString().split("T")[0]
    const lastShown = localStorage.getItem("allQiblaPopupShownDate")

    if (lastShown !== today) {
      setOpen(true)
      localStorage.setItem("allQiblaPopupShownDate", today)
    }
  }, [popup])

  // ✅ Close popup → redirect
  const handleRedirect = () => {
    setOpen(false) // close popup first

    setTimeout(() => {
      router.push(popup?.link) 
    }, 100) // small delay so dialog can close smoothly
  }
  if(!popup){
    return null
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="lg:text-3xl pr-5 text-start leading-tight">
            {popup?.title}
          </DialogTitle>
        </DialogHeader>

        <Image
          width={500}
          height={500}
          src={popup?.image}
          alt={popup?.title}
          className="w-full h-fit"
        />

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleRedirect}
            className="text-ruby-wine hover:bg-ruby-wine hover:text-white outline"
          > Learn more 
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
