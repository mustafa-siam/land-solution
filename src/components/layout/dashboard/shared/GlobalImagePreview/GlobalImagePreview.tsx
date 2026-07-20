'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow'
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

interface GlobalImagePreviewProps {
  title: string
  images: string[]
}

export default function GlobalImagePreview({ title, images }: GlobalImagePreviewProps) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  if (!images || images.length === 0) return null

  return (
    <div className="relative min-w-32">
      {/* Default single preview image */}
      <div
        className="relative w-fit cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
        onClick={() => {
          setIndex(0)
          setOpen(true)
        }}
      >
        <Image
          src={images[0]}
          alt={title}
          width={100}
          height={100}
          className="rounded-xl object-cover w-32 h-20"
        />

        {images.length > 1 && (
          <div className="absolute bottom-2 right-2 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
            +{images.length - 1} more
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={images.map((src) => ({ src }))}
        plugins={[Zoom, Slideshow, Fullscreen, Thumbnails]}
        controller={{ closeOnBackdropClick: true }}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' },
        }}
      />
    </div>
  )
}
