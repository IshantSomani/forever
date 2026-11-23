import React, { lazy, Suspense } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import Hero from '../components/Hero';
import NewsLetterBox from '../components/NewsLetterBox';

const LatestCollection = lazy(() => import('../components/LatestCollection'));
const BestSeller = lazy(() => import('../components/BestSeller'));
const OurPolicy = lazy(() => import('../components/OurPolicy'));

const Home = () => {
  return (
    <main>
      <Hero />
      <Suspense fallback={<LoadingSpinner />}>
        <LatestCollection />
        <BestSeller />
        <OurPolicy />
        <NewsLetterBox />
      </Suspense>
    </main>
  );
};

export default React.memo(Home);