import React from 'react';
import SubHeader from '@/components/SubHeader';
import HDPVision from '@/components/hdpVision';
import AboutUsSection from '@/components/who-we-are/About-section';
import Services from '@/components/services/Services';
import ChurchServices from '@/components/Services';

const Programs = () => {
  return (
    <div>
      <SubHeader
        title="Program and Events"
        backgroundImage="/images/programs.jpg" // Replace with your image URL
      />
      <ChurchServices />
      
      <Services />
    </div>
  );
};

export default Programs;