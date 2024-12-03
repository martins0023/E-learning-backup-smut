import React, { Suspense } from 'react'
import Role from '../../components/Role'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      < Role />
    </Suspense>
  )
}

export default page