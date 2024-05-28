import React, { useContext } from 'react';
import Wrapper from '../../Shared/Wrapper';
// TODO: Remove the below import and entire components after demo is done
import { BLOG_LINK, URL_VISUALIZER_PAGE } from '../../../Constants';
import { LinkButton } from '../../Shared/Buttons';
import Graphs from './Sections/Graphs';
import PbftIntro from './Sections/PbftIntro';
import Navbar from '../../Shared/Navbar';
import { NavbarToggleContext } from '../../../Context/navbarToggle';
import { BorderToggleRef } from '../../../App';
import Footer from '../../Shared/Footer';

const Home = () => {
  
  return (
    <Wrapper>
      <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
        <div className="blur-[200px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[200px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
      </div>
      <div className='flex flex-col items-center justify-center text-gray dark:text-white'>
        <div className="relative pt-20 ml-auto">
          <div className="lg:w-2/3 text-center mx-auto">

            <div className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">Visualizer for a new age blockchain fabric.</div>

            <p className="mt-8 px-[6em] text-gray-700 dark:text-gray-300 text-20p">A novel dashboard metric of a blockchain database system, offering new users and learners a clear visualization of a complex technology.
              </p>
            <div className="mt-16 flex items-center justify-center gap-y-4 gap-x-[4em]">
              <LinkButton title={'Visualizer'} link={URL_VISUALIZER_PAGE} external={true} />
                  <LinkButton title={'Learn More'} link={BLOG_LINK} external={true} />
                </div>
            <div className="py-8 mt-16 px-2 border-y-3p border-gray-900 dark:border-white sm:flex flex items-center justify-between">
                    <div className="text-center">
                        <h6 className="text-lg font-semibold text-gray-700 dark:text-white">Super Fast & Cheap</h6>
                        <p className="mt-2 text-gray-500">Intensively optimiazed computation</p>
                    </div>
                    <div className="text-center">
                        <h6 className="text-lg font-semibold text-gray-700 dark:text-white">Wide range integration</h6>
                        <p className="mt-2 text-gray-500">All the blocks no fuss!</p>
                    </div>
                    <div className="text-center">
                        <h6 className="text-lg font-semibold text-gray-700 dark:text-white">Seeing is believing</h6>
                        <p className="mt-2 text-gray-500">Check out all BC actions</p>
                    </div>
                </div>
            </div>
            <div className="mt-28">
            <PbftIntro />
            </div>
            <div className="mt-28">
              <Graphs />
            </div>
        </div>
    </div>
    </Wrapper>
  );
};

const Index = () => {
  const { borderToggle } = useContext(NavbarToggleContext);
  return (
    <>
      <Navbar borderToggle={borderToggle} />
      <BorderToggleRef />
      <Home />
      <Footer />
    </>
  );
}

export default Index