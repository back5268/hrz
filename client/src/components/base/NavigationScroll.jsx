import { tools } from '@lib/tools';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const NavigationScroll = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    let item = null;
    if (pathname === '/') item = { label: 'Trang chủ', icon: 'Squares2X2Icon', route: '/' };
    else
      tools.forEach((tool) => {
        if (tool.route !== '/') {
          if (tool.items?.length > 0) {
            tool.items.forEach((child) => {
              if (pathname?.includes(child.route)) item = child;
            });
          } else {
            if (pathname?.includes(tool.route)) item = tool;
          }
        }
      });

    if (item) document.title = item?.label;
  }, [pathname]);

  return children || null;
};

NavigationScroll.propTypes = {
  children: PropTypes.node
};
