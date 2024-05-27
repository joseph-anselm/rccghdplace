import React from 'react';
import SubHeader from '@/components/SubHeader';
import HDPVision from '@/components/hdpVision';
import AboutUsSection from '@/components/who-we-are/About-section';

const Services = () => {
  return (
    <div>
      <SubHeader
        title="Program and Events"
        backgroundImage="https://source.unsplash.com/1600x900/?christian-events" // Replace with your image URL
      />
      
      <AboutUsSection />
      <HDPVision className="my-6 flex justify-center"/>
    </div>
  );
};

export default Services;