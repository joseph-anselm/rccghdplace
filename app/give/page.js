import Give from '@/components/Give'
import SubHeader from '@/components/SubHeader'
import React from 'react'

export default function page() {
  return (
    <div>
        <SubHeader
        title="Givers Never Lack"
        backgroundImage="/images/give.jpg"
        />
        <Give />
    </div>
  )
}
