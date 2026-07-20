import { Suspense } from 'react'
import Product from './Product'

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Product />
    </Suspense>
  )
}