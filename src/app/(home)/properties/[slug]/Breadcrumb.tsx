import Link from 'next/link'
import React from 'react'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumb() {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Properties', href: '/properties' },
    { label: 'Details', href: null, active: true },
  ]

  return (
    <div className="px-[5%] py-6 bg-gradient-to-r from-gray-50 to-white">
      <div className='max-w-screen-xl mx-auto'>
        <nav className="flex items-center gap-2 text-sm">
          {crumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className='text-gray-600 hover:text-[#800020] transition-colors font-medium flex items-center gap-2'
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className={`font-semibold ${crumb.active ? 'text-[#800020]' : 'text-gray-900'}`}>
                  {crumb.label}
                </span>
              )}
              {index < crumbs.length - 1 && (
                <ChevronRight className="w-4 h-4 text-gray-300" />
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  )
}
