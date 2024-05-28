import { Tooltip } from "@mui/material";
import cn from "classnames";
import _ from "lodash";
import React, { memo, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { NavbarToggleContext } from "../../Context/navbarToggle";
import { ThemeContext } from "../../Context/theme";
import {
  homeIcon,
  linearGraphIcon,
  moonIcon,
  sunIcon,
  teamIcon
} from "../../Resources/Icons";
import { ICON_DEFAULT_COLOR, SUN_COLOR } from "./Constants";
import { Icon } from "./Icon";
import { BLOG_LINK, LOGO_DARK, LOGO_LIGHT, URL_HOME_PAGE, URL_TEAM_PAGE, URL_VISUALIZER_PAGE } from "../../Constants";
import { PbftGraphClearContext } from "../../Context/graph";

const LightOrDark = memo(() => {
  const { theme, toggleLightTheme, toggleDarkTheme } = useContext(ThemeContext);
  const { changeClear } = useContext(PbftGraphClearContext);

  const handleClick = () => {
    changeClear(true);
    if(!theme){
      toggleDarkTheme()
    } else {
      toggleLightTheme()
    }
    setTimeout(() => changeClear(false), 500)
  }

  return (
    <Tooltip
      title={cn({ "Light Mode": !theme }, { "Dark Mode": theme })}
      enterDelay={500}
    >
      <div
        className={cn(
          "cursor-pointer",
          {
            "svg-hover-light": !theme,
          },
          {
            "svg-hover-dark": theme,
          }
        )}
        onClick={handleClick}
      >
        {!theme ? (
          <Icon fill={SUN_COLOR} height={"1.4em"} path={sunIcon} />
        ) : (
          <Icon fill={ICON_DEFAULT_COLOR} height={"1.4em"} path={moonIcon} />
        )}
      </div>
    </Tooltip>
  );
});

const NavComp = ({
  title,
  page,
  icon,
  iconHeight,
  iconViewBox,
}) => {
  return (
      <NavLink 
        to={`${page}`} 
        className={({ isActive }) => cn(
          "cursor-pointer font-bold text-gray-900 dark:text-white",
          {
            "dark:bg-green-80 bg-green-40 px-2 py-1 rounded-lg": isActive
          }
        )}>
        {/* <Icon
        fill={navbarPageActiveColor(currentPage, page)}
        height={iconHeight}
        path={icon}
        viewBox={iconViewBox}
      /> */}
        <Tooltip title={title} enterDelay={500}>
          {title}
        </Tooltip>
      </NavLink>
  );
};

const Navbar = memo(() => {
  const { theme } = useContext(ThemeContext);
  const { borderToggle } = useContext(NavbarToggleContext);

  const logo = theme ? LOGO_DARK : LOGO_LIGHT;

  return (
      <div className={cn(
        'w-full py-[1em] px-8 text-white lg:px-8 lg:py-4 flex items-center justify-between flex-initial fixed top-0 z-20',
        {'border-b-2 dark:bg-blue-400 bg-blue-20 border-gray-900 dark:border-white transition': borderToggle}
      )}>
      <Link to={URL_HOME_PAGE} className='flex items-center justify-center gap-x-2 w-full cursor-pointer'>
            <img
              src={logo}
              alt='ResDb View Logo'
              className='h-35p w-35p'
            />
          <div className='text-blue-190 text-20p font-sans font-bold'>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">ResView</span>
          </div>
        </Link>
        <div></div>
        <div className='flex items-center justify-center gap-x-12 w-full'>
          <NavComp
            title={"Home"}
          page={URL_HOME_PAGE}
            icon={homeIcon}
            iconHeight={"1.4em"}
            iconViewBox={"0 0 640 512"}
          />
          <NavComp
            title={"Team"}
          page={URL_TEAM_PAGE}
            icon={teamIcon}
            iconHeight={"1.4em"}
            iconViewBox={"0 0 640 512"}
          />
          <a href={BLOG_LINK} target="_blank" rel="noreferrer nofollow" className={cn(
            'cursor-pointer font-bold text-gray-900 dark:text-white'
          )}>
            Blog
          </a>
          <NavComp
            title={"Visualizer"}
          page={URL_VISUALIZER_PAGE}
            icon={linearGraphIcon}
            iconHeight={"1.5em"}
          />
          <LightOrDark />
        </div>
      </div>
  );
});

export default Navbar;
