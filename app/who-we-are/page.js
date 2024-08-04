
// import AboutUsHeader from '@/components/AboutHeader';
// import ImageGallery from '@/components/GalleryGroup';
// import SubHeader from '@/components/SubHeader';
// export default function Home() {
//   return (
//     <div>
      
      
//       <AboutUsHeader />
//       <SubHeader />
//     </div>
//   );
// }

import React from 'react';
import SubHeader from '@/components/SubHeader';
import HDPVision from '@/components/hdpVision';
import AboutUsSection from '@/components/who-we-are/About-section';
import DepartmentsTabs from '@/components/DepartmentsTab';

const Services = () => {
  return (
    <div>
      <SubHeader
        title="Who we are"
        backgroundImage="/images/whoweare.jpg" // Replace with your image URL
      />
      
      <AboutUsSection />
      <HDPVision className="my-6 flex justify-center"/>
      <DepartmentsTabs />
    </div>
  );
};

export default Services;

