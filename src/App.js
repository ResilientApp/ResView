import { Suspense, useContext, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from './Components/Pages/Home';
import Team from './Components/Pages/Team';
import Visualizer from './Components/Pages/Visualizer';
import Loader from './Components/Shared/Loader';
import NotFound from './Components/Shared/NotFound';
import OnlyDesktop from './Components/Shared/OnlyDesktop';
import ParticleWrapper from './Components/Shared/ParticleWrapper';
import { URL_HOME_PAGE, URL_REROUTE_PAGE, URL_TEAM_PAGE, URL_VISUALIZER_PAGE } from './Constants';
import { AllProviders } from './Context';
import { NavbarToggleContext } from './Context/navbarToggle';
import { ThemeContext } from './Context/theme';
import './Styles/App.css';
import { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export const BorderToggleRef = () => {
  const { bToggleElement } = useContext(NavbarToggleContext);

  return (
    <div className='relative mt-30p' ref={bToggleElement} /> 
  );
}

const PreSynthApp = () => {
  const [isParticleLoading, setIsParticleLoading] = useState(false);
  const [init, setInit] = useState(false);
  const { toggleLightTheme, toggleDarkTheme } = useContext(ThemeContext);

  if (localStorage.getItem("theme") === "light") {
    toggleLightTheme();
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    toggleDarkTheme();
    document.documentElement.setAttribute("data-theme", "dark");
  }

  useEffect(() => {
    const initEngine = async () => {
      try {
        setIsParticleLoading(true);
        await initParticlesEngine(async (engine) => {
          await loadSlim(engine);
        });
        setInit(true);
      } catch (error) {
        console.error("Initialization failed:", error);
      } finally {
        setIsParticleLoading(false);
      }
    };
    initEngine();
  }, []);

  const particlesLoaded = (container) => {};



  return (
    <>
      {isMobile ? (
        <OnlyDesktop />
      ) : (
        <Router>
          <Routes>
              <Route index element={<Navigate to={`${URL_REROUTE_PAGE}`} />} />
              <Route path={`${URL_TEAM_PAGE}`} element={<Team />} />
              <Route path={`${URL_HOME_PAGE}`} element={<Home loading={isParticleLoading} />} />
              <Route path={`${URL_VISUALIZER_PAGE}`} element={<Visualizer />} />
              
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      )}
      {/* <ParticleWrapper init={init} particlesLoaded={particlesLoaded} /> */}
    </>
  );
}

function App(){
  return (
      <AllProviders>
        <Suspense fallback={<Loader />}>
          <PreSynthApp />
        </Suspense>
      </AllProviders>
  );
};

export default App;
