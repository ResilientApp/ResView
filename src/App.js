import { Suspense, useContext, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from './Components/Pages/Home';
import Team from './Components/Pages/Team';
// TODO: Change the below from index2 to index for Visualizer
import Visualizer from './Components/Pages/Visualizer/index2';
import Footer from './Components/Shared/Footer';
import Loader from './Components/Shared/Loader';
import Navbar from './Components/Shared/Navbar';
import NotFound from './Components/Shared/NotFound';
import OnlyDesktop from './Components/Shared/OnlyDesktop';
import ParticleWrapper from './Components/Shared/ParticleWrapper';
import { URL_HOME_PAGE, URL_REROUTE_PAGE, URL_TEAM_PAGE, URL_VISUALIZER_PAGE } from './Constants';
import { AllProviders } from './Context';
import { NavbarToggleContext } from './Context/navbarToggle';
import { ThemeContext } from './Context/theme';
import './Styles/App.css';

export const BorderToggleRef = () => {
  const { bToggleElement } = useContext(NavbarToggleContext);

  return (
    <div className='relative mt-30p' ref={bToggleElement} /> 
  );
}

const PreSynthApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { toggleLightTheme, toggleDarkTheme } = useContext(ThemeContext);

  if (localStorage.getItem("theme") === "light") {
    toggleLightTheme();
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    toggleDarkTheme();
    document.documentElement.setAttribute("data-theme", "dark");
  }


  return (
    <>
      <ParticleWrapper setIsLoading={setIsLoading} />
      {isLoading ? (
        <Loader />
      ) : (
          <>
            {isMobile ? (
              <OnlyDesktop />
            ) : (
              <Router>
                <Routes>
                    <Route path={`${URL_TEAM_PAGE}`} element={<Team />} />
                    <Route path={`${URL_HOME_PAGE}`} element={<Home />} />
                    <Route path={`${URL_VISUALIZER_PAGE}`} element={<Visualizer />} />
                  <Route path='*' element={<NotFound />} />
                    <Route index element={<Navigate to={`${URL_REROUTE_PAGE}`} />} />
                </Routes>
              </Router>
            )}
          </>
      )}
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
