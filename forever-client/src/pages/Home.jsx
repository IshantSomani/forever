import React, { lazy, Suspense } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const Hero = lazy(() => import('../components/Hero'));
const LatestCollection = lazy(() => import('../components/LatestCollection'));
const BestSeller = lazy(() => import('../components/BestSeller'));
const OurPolicy = lazy(() => import('../components/OurPolicy'));
const NewsLetterBox = lazy(() => import('../components/NewsLetterBox'));

const Home = () => {
  return (
    <main>
      <Suspense fallback={<LoadingSpinner />}>
        <Hero />
        <LatestCollection />
        <BestSeller />
        <OurPolicy />
        <NewsLetterBox />
      </Suspense>
    </main>
  );
};

export default React.memo(Home);