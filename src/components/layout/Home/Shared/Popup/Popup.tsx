"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { useGetAllPopupsQuery } from "@/redux/features/popup/popupApi"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { X, Building2, ArrowRight } from "lucide-react"

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
    const lastShown = localStorage.getItem("UrbanKeyPopupShownDate")

    if (lastShown !== today) {
      setOpen(true)
      localStorage.setItem("UrbanKeyPopupShownDate", today)
    }
  }, [popup])

  // ✅ Close popup → redirect
  const handleRedirect = () => {
    setOpen(false) // close popup first

    setTimeout(() => {
      router.push(popup?.link)
    }, 100) // small delay so dialog can close smoothly
  }

  if (!popup) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[540px] w-[90vw] sm:w-[95vw] max-w-[90vw] sm:max-w-[500px] p-0 gap-0 bg-white border-0 shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden">
        {/* Close Icon Only */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 z-30 p-2 sm:p-2.5 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 backdrop-blur-sm transition-all duration-200 shadow-lg"
          aria-label="Close popup"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Main Image Section - Responsive Height */}
        <div className="relative w-full h-[280px] sm:h-[350px] md:h-[400px] overflow-hidden">
          <Image
            width={540}
            height={400}
            src={popup?.image}
            alt={popup?.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Content Overlaid on Image */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
            {/* Brand Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-2 sm:mb-3">
              <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
              <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-white">
                UrbanKeys
              </span>
            </div>

            {/* Title - Responsive Size */}
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white leading-snug mb-3 sm:mb-4 drop-shadow-lg line-clamp-2">
              {popup?.title}
            </h3>

            {/* Learn More Button - Responsive */}
            <Button
              onClick={handleRedirect}
              className="bg-white text-[#800020] hover:bg-gray-100 font-semibold rounded-lg px-4 sm:px-6 py-2 sm:py-2.5 shadow-lg transition-all duration-300 text-xs sm:text-sm w-full sm:w-auto"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-1.5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
