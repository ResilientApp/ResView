import React, { useContext } from 'react';
import { BorderToggleRef } from '../../../App';
import { BLOG_LINK, URL_VISUALIZER_PAGE } from '../../../Constants';
import { NavbarToggleContext } from '../../../Context/navbarToggle';
import { LinkButton } from '../../Shared/Buttons';
import Footer, { DetailedFooter } from '../../Shared/Footer';
import Navbar from '../../Shared/Navbar';
import Wrapper from '../../Shared/Wrapper';
import Graphs from './Sections/Graphs';
import PbftIntro from './Sections/PbftIntro';
import { LinearProgress } from '@mui/material';

const Home = () => {

  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
        <div className="blur-[200px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[200px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
      </div>
      <div className='flex flex-col items-center justify-center text-gray dark:text-white'>
        <div className="relative pt-20 ml-auto">
          <div className=" w-2/3 text-center mx-auto">

            <div className="w-full mt-20 flex items-center justify-center flex-col">
              <div className="text-gray-900 dark:text-white font-bold text-8xl md:text-6xl xl:text-7xl ">Visualizer for New Age Blockchain Fabrics</div>

              <div className="mt-10 px-[8rem] text-gray-700 dark:text-gray-300 text-20p">A novel graphical visualizer for the ResDB blockchain fabric, offering new users and learners a clear visualization of a complex technology.
              </div>
            </div>
            <div className="mt-14 flex items-center justify-center gap-y-4 gap-x-[4em]">
              <LinkButton title={'Visualizer'} link={URL_VISUALIZER_PAGE} external={true} />
              <LinkButton title={'Learn More'} link={BLOG_LINK} external={true} />
            </div>
            <Wrapper>
              <div className="py-8 mt-2 px-2 border-y-3p border-gray-900 dark:border-white sm:flex flex items-center justify-between w-full">
                <div className="text-center">
                  <h6 className="text-lg font-semibold text-gray-700 dark:text-white">Super Fast</h6>
                  <p className="mt-2 text-gray-500">Intensively optimized</p>
                </div>
                <div className="text-center">
                  <h6 className="text-lg font-semibold text-gray-700 dark:text-white">Wide range integration</h6>
                  <p className="mt-2 text-gray-500">Includes all the blocks</p>
                </div>
                <div className="text-center">
                  <h6 className="text-lg font-semibold text-gray-700 dark:text-white">Seeing is believing</h6>
                  <p className="mt-2 text-gray-500">Check out actions</p>
                </div>
              </div>
            </Wrapper>
          </div>
          <div className="mt-20">
            <PbftIntro />
          </div>
          <div className="mt-6 mb-16">
            <Graphs />
          </div>
        </div>
      </div>
    </>
  );
};

const Index = ({ loading }) => {
  const { borderToggle } = useContext(NavbarToggleContext);
  return (
    <>
      {/* {loading && <LinearProgress />} */}
      <Navbar borderToggle={borderToggle} />
      <BorderToggleRef />
      <div className="flex items-center justify-center w-full">
        <Home />
      </div>
      <DetailedFooter />
    </>
  );
}

export default Index