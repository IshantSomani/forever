import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const About = () => {
  return (
    <>
      <div className="text-2xl text-center pt-10 border-t-gray">
        <Title title1={"ABOUT"} title2={"US"} />
      </div>

      <div className="my-8 sm:my-10 flex flex-col lg:flex-row justify-center items-center gap-10">
        <img
          src={assets.about_img}
          alt="about us"
          className="w-full md:max-w-[450px]"
          loading="lazy"
        />
        <div className="flex flex-col justify-center gap-6 lg:w-1/2 text-gray-600">
          <p className="text-lg leading-7">
            Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey started with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
          </p>

          <p className="text-lg leading-7">
            Since our inception, we&apos;ve worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900">Our Mission</h2>

          <p className="text-lg leading-7">
            At Forever, our mission is to empower customers with choice, convenience, and confidence. We are dedicated to providing a seamless shopping experience that exceeds expectations—from browsing and ordering to delivery and beyond.
          </p>
        </div>
      </div>

      <section className="mb-16 lg:mb-24">
        <div className="text-4xl py-4">
          <Title title1={"WHY"} title2={"CHOOSE US"} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-300 rounded p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality Assurance</h3>
            <p className="text-gray-600 leading-6">
              We meticulously select and vet each product to ensure it meets our stringent quality standards, offering you only the best.
            </p>
          </div>

          <div className="border border-gray-300 rounded p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Convenience</h3>
            <p className="text-gray-600 leading-6">
              With our user-friendly interface and hassle-free ordering process, shopping has never been easier. Enjoy a smooth experience every step of the way.
            </p>
          </div>

          <div className="border border-gray-300 rounded p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Exceptional Service</h3>
            <p className="text-gray-600 leading-6">
              Our dedicated team ensures your satisfaction with 24/7 support and personalized assistance, making your experience unforgettable.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16 lg:mb-20">
        <NewsLetterBox />
      </section>
    </>
  );
};

export default About;
