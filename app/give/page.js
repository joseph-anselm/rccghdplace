import Give from '@/components/Give'
import SubHeader from '@/components/SubHeader'
import React from 'react'

export default function page() {
  return (
    <div>
        <SubHeader
        title="Givers Never Lack"
        backgroundImage="https://source.unsplash.com/1600x900/?donations"
        />
        <Give />
    </div>
  )
}
