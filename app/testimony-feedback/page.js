import React from 'react'
import TestimoniesPage from '@/components/testimony'
import SubHeader from '@/components/SubHeader'

export default function testimony() {
  return (
    
    <div>        
        <SubHeader
        title="Testimonies and FeedBack"
        backgroundImage="/images/feedback.jpg" 
      /><TestimoniesPage />
      </div>
  )
}
