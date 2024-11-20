import H1 from '@/components/ui/h1'
import React from 'react'

export default function Page() {
  return (
    <main className='max-w-5xl m-auto my-10 space-y-5 px-3 text-center '>
        <H1>Job Submitted</H1>
        <p className='text-muted-foreground'>Your job has been submitted. Please wait for it to be approved.</p>
    </main>
  )
}
