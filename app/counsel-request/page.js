import React from 'react'
import CounselingRequestPage from '@/components/CounselRequest'
import SubHeader from '@/components/SubHeader'

export default function counselReuest() {
  return (
    <div>
          <SubHeader
        title="Counselling request Form"
        backgroundImage="/images/counsel.jpg"
        />
        <CounselingRequestPage />
    </div>
  )
}
