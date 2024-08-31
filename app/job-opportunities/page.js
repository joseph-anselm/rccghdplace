import React from 'react'
import JobsPage from '@/components/JobListingPage'
import SubHeader from '@/components/SubHeader'

export default function jobListing() {
  return (
    <div>

        <SubHeader
        title="Jobs, Opportunities and more"
        backgroundImage="/images/jobs.jpg"
        />
        <JobsPage />

    </div>
  )
}
