import React, { useState, useEffect } from 'react';
import { UserOutlined, LogoutOutlined, SettingOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Menu, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import httpClient from '../../additional/httpClient';
import "./styles.css";
import PlanInfo from './PlanInfo';

const MenuComponent = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark');
  const [current, setCurrent] = useState(localStorage.getItem('currentMenu') || 'home');
  const [openKeys, setOpenKeys] = useState([]);
  const [user, setUser] = useState(null);
  const [collapsed, setCollapsed] = useState(false); // State to track menu collapse

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("http://localhost:5000/");
        setUser(resp.data);
      } catch (error) {
        console.log("Not authenticated");
      }
    })();
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onClick = (e) => {
    if (e.key === 'toggle') {
      toggleCollapsed(); // Toggle the menu collapse state without navigating
    } else if (e.key === 'logout') {
      logoutUser();
    } else {
      setCurrent(e.key);
      localStorage.setItem('currentMenu', e.key);
      navigate(`/app/${e.key}`);
    }
  };

  const logoutUser = async () => {
    try {
      await httpClient.post("http://localhost:5000/logout");
      message.success('Logged out successfully');
      window.location.href = "/";
    } catch (error) {
      message.error('Logout failed');
    }
  };

  const menuItems = [
    {
        key: 'toggle',
        label: (
          <span onClick={toggleCollapsed} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            {collapsed ? <MenuUnfoldOutlined style={{ fontSize: '20px' }} /> : <MenuFoldOutlined style={{ fontSize: '20px' }} />}
            <span style={{ marginLeft: 8 }}>{collapsed ? 'Unfold menu' : 'Fold menu'}</span>
          </span>
        ),
        className: 'non-selectable',  // Add custom class here
    },
    {
      key: 'profile',
      label: user ? <span style={{ color: 'var(--text-color)' }}>{user.username}</span> : <span style={{ color: 'var(--text-color)' }}>Profile</span>,
      icon: <UserOutlined style={{ fontSize: '20px', color: 'var(--text-color)' }} />,
      children: [
        {
          key: 'logout',
          label: 'Logout',
          icon: <LogoutOutlined style={{ fontSize: '20px', color: 'var(--text-color)', opacity: 1 }} />,
        },
      ],
    },
    {
      key: 'home',
      label: 'Home',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 495.398 495.398"
          width="20"
          height="20"
          style={{ fill: 'currentColor' }}
        >
          <g>
            <g>
              <g>
                <path d="M487.083,225.514l-75.08-75.08V63.704c0-15.682-12.708-28.391-28.413-28.391c-15.669,0-28.377,12.709-28.377,28.391
                    v29.941L299.31,37.74c-27.639-27.624-75.694-27.575-103.27,0.05L8.312,225.514c-11.082,11.104-11.082,29.071,0,40.158
                    c11.087,11.101,29.089,11.101,40.172,0l187.71-187.729c6.115-6.083,16.893-6.083,22.976-0.018l187.742,187.747
                    c5.567,5.551,12.825,8.312,20.081,8.312c7.271,0,14.541-2.764,20.091-8.312C498.17,254.586,498.17,236.619,487.083,225.514z"/>
                <path d="M257.561,131.836c-5.454-5.451-14.285-5.451-19.723,0L72.712,296.913c-2.607,2.606-4.085,6.164-4.085,9.877v120.401
                    c0,28.253,22.908,51.16,51.16,51.16h81.754v-126.61h92.299v126.61h81.755c28.251,0,51.159-22.907,51.159-51.159V306.79
                    c0-3.713-1.465-7.271-4.085-9.877L257.561,131.836z"/>
              </g>
            </g>
          </g>
        </svg>
      ),
    },
    
    
    {
      key: 'database',
      label: 'Database',
      icon: (
        <svg
          className="svg-icon"
          style={{ width: '20', height: '25', verticalAlign: 'middle', fill: 'currentColor', overflow: 'hidden' }}
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M512 42.666667C272.746667 42.666667 85.333333 126.997333 85.333333 234.666667v554.666666c0 107.669333 187.413333 192 426.666667 192s426.666667-84.330667 426.666667-192V234.666667c0-107.669333-187.413333-192-426.666667-192z m384 554.666666c0 88-202.368 149.333333-384 149.333334S128 685.333333 128 597.333333v-107.434666C196.394667 553.984 340.693333 597.333333 512 597.333333s315.605333-43.349333 384-107.434666V597.333333z m0-192c0 88-202.368 149.333333-384 149.333334S128 493.333333 128 405.333333v-86.101333C196.394667 383.317333 340.693333 426.666667 512 426.666667s315.605333-43.349333 384-107.434667V405.333333zM512 85.333333c181.632 0 384 61.333333 384 149.333334s-202.368 149.333333-384 149.333333-384-61.333333-384-149.333333 202.389333-149.333333 384-149.333334z m0 853.333334c-181.632 0-384-61.333333-384-149.333334v-107.434666C196.394667 745.984 340.693333 789.333333 512 789.333333s315.605333-43.349333 384-107.434666V789.333333c0 88-202.368 149.333333-384 149.333334z" fill="currentColor" />
        </svg>
      ),
    },
    
    {
      key: 'diary',
      label: 'Diary',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 122.88 101.37"
          width="20"
          height="20"
          style={{ fill: 'currentColor' }}
        >
          <path d="M12.64,77.27l0.31-54.92h-6.2v69.88c8.52-2.2,17.07-3.6,25.68-3.66c7.95-0.05,15.9,1.06,23.87,3.76 c-4.95-4.01-10.47-6.96-16.36-8.88c-7.42-2.42-15.44-3.22-23.66-2.52c-1.86,0.15-3.48-1.23-3.64-3.08 C12.62,77.65,12.62,77.46,12.64,77.27L12.64,77.27z M103.62,19.48c-0.02-0.16-0.04-0.33-0.04-0.51c0-0.17,0.01-0.34,0.04-0.51V7.34 c-7.8-0.74-15.84,0.12-22.86,2.78c-6.56,2.49-12.22,6.58-15.9,12.44V85.9c5.72-3.82,11.57-6.96,17.58-9.1 c6.85-2.44,13.89-3.6,21.18-3.02V19.48L103.62,19.48z M110.37,15.6h9.14c1.86,0,3.37,1.51,3.37,3.37v77.66 c0,1.86-1.51,3.37-3.37,3.37c-0.38,0-0.75-0.06-1.09-0.18c-9.4-2.69-18.74-4.48-27.99-4.54c-9.02-0.06-18.03,1.53-27.08,5.52 c-0.56,0.37-1.23,0.57-1.92,0.56c-0.68,0.01-1.35-0.19-1.92-0.56c-9.04-4-18.06-5.58-27.08-5.52c-9.25,0.06-18.58,1.85-27.99,4.54 c-0.34,0.12-0.71,0.18-1.09,0.18C1.51,100.01,0,98.5,0,96.64V18.97c0-1.86,1.51-3.37,3.37-3.37h9.61l0.06-11.26 c0.01-1.62,1.15-2.96,2.68-3.28l0,0c8.87-1.85,19.65-1.39,29.1,2.23c6.53,2.5,12.46,6.49,16.79,12.25 c4.37-5.37,10.21-9.23,16.78-11.72c8.98-3.41,19.34-4.23,29.09-2.8c1.68,0.24,2.88,1.69,2.88,3.33h0V15.6L110.37,15.6z M68.13,91.82c7.45-2.34,14.89-3.3,22.33-3.26c8.61,0.05,17.16,1.46,25.68,3.66V22.35h-5.77v55.22c0,1.86-1.51,3.37-3.37,3.37 c-0.27,0-0.53-0.03-0.78-0.09c-7.38-1.16-14.53-0.2-21.51,2.29C79.09,85.15,73.57,88.15,68.13,91.82L68.13,91.82z M58.12,85.25 V22.46c-3.53-6.23-9.24-10.4-15.69-12.87c-7.31-2.8-15.52-3.43-22.68-2.41l-0.38,66.81c7.81-0.28,15.45,0.71,22.64,3.06 C47.73,78.91,53.15,81.64,58.12,85.25L58.12,85.25z"/>
        </svg>
      ),
    },
    

    
    {
      key: 'products',
      label: 'Products',
      icon: (
        <svg
          className="svg-icon"
          style={{ width: '22', height: '25', verticalAlign: 'middle', fill: 'currentColor', overflow: 'hidden' }}
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M504.1 452.5c-18.3 0-36.5-4.1-50.7-10.1l-280.1-138c-18.3-10.1-30.4-24.4-30.4-40.6 0-16.2 10.2-32.5 30.4-42.6L455.4 77.1c16.2-8.1 34.5-12.2 54.8-12.2 18.3 0 36.5 4.1 50.7 10.1L841 213c18.3 10.1 30.4 24.4 30.4 40.6 0 16.2-10.1 32.5-30.4 42.6L558.9 440.3c-16.3 8.1-34.5 12.2-54.8 12.2zM193.6 261.7l280.1 138c8.1 4.1 18.3 6.1 30.4 6.1 12.2 0 24.4-2 32.5-6.1l284.1-144.1-280.1-138c-8.1-4.1-18.3-6.1-30.4-6.1-12.2 0-24.4 2-32.5 6.1L193.6 261.7z m253.6 696.1c-10.1 0-20.3-2-30.4-8.1L165.1 817.8c-30.4-14.2-52.8-46.7-52.8-73.1V391.6c0-24.4 18.3-42.6 44.6-42.6 10.1 0 20.3 2 30.4 8.1L437.1 489c30.4 14.2 52.8 46.7 52.8 73.1v353.1c0 24.4-18.3 42.6-42.7 42.6z m-10.1-48.7c2 2 4.1 2 6.1 2v-349c0-8.1-10.1-24.4-26.4-32.5L165.1 397.7c-2-2-4.1-2-6.1-2v349.1c0 8.1 10.2 24.4 26.4 32.5l251.7 131.8z m144.1 48.7c-24.4 0-42.6-18.3-42.6-42.6V562.1c0-26.4 22.3-58.9 52.8-73.1L841 357.1c10.1-4.1 20.3-8.1 30.4-8.1 24.4 0 42.6 18.3 42.6 42.6v353.1c0 26.4-22.3 58.9-52.8 73.1L611.6 949.7c-12.2 6.1-20.3 8.1-30.4 8.1z m280-560.1L611.6 529.6c-16.2 8.1-26.4 24.4-26.4 32.5v349.1c2 0 4.1-2 6.1-2l249.6-131.9c16.2-8.1 26.4-24.4 26.4-32.5V395.7c-2 0-4 2-6.1 2z m0 0" fill="currentColor" />
        </svg>
      ),
    },    
    {
      key: 'community',
      label: 'Community',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 1080"
          width="20"
          height="25"
          style={{ fill: 'var(--text-color)' }}
          >
          <g>
            <path style={{ opacity: 0.982 }} fill="var(--text-color)" d="M 492.5,227.5 C 552.269,228.037 598.269,253.037 630.5,302.5C 658.605,354.583 658.439,406.917 630,459.5C 599.568,506.639 556.068,531.306 499.5,533.5C 448.611,532.354 407.444,512.021 376,472.5C 344.562,426.815 337.896,377.482 356,324.5C 382.783,265.891 428.283,233.557 492.5,227.5 Z"/>
            <path style={{ opacity: 0.977 }} fill="var(--text-color)" d="M 202.5,282.5 C 261.598,281.944 302.098,308.944 324,363.5C 336.95,410.367 326.784,451.034 293.5,485.5C 257.193,517.402 215.859,525.902 169.5,511C 128.011,493.17 103.178,462.004 95,417.5C 90.0908,358.467 114.257,316.3 167.5,291C 179.195,287.325 190.862,284.491 202.5,282.5 Z"/>
            <path style={{ opacity: 0.977 }} fill="var(--text-color)" d="M 778.5,282.5 C 832.654,282.648 871.487,306.981 895,355.5C 909.572,396.227 904.905,434.561 881,470.5C 844.743,514.006 799.243,527.673 744.5,511.5C 688.921,486.267 663.587,443.267 668.5,382.5C 677.303,338.949 701.969,308.282 742.5,290.5C 748.26,288.813 753.927,286.98 759.5,285C 765.988,284.216 772.322,283.383 778.5,282.5 Z"/>
            <path style={{ opacity: 0.974 }} fill="var(--text-color)" d="M 100.5,498.5 C 101.552,498.351 102.552,498.517 103.5,499C 139.768,536.759 184.101,552.093 236.5,545C 244.77,542.674 253.104,540.341 261.5,538C 267.516,535.55 273.35,532.716 279,529.5C 280.28,529.613 281.113,530.28 281.5,531.5C 218.295,607.283 190.962,695.949 199.5,797.5C 157.508,799.061 115.841,796.227 74.5,789C 60.2123,784.787 46.8789,778.454 34.5,770C 23.7801,760.428 15.7801,749.428 10.5,737C 4.66837,715.53 2.83504,693.363 5,670.5C 11.6362,608.906 36.4696,557.072 79.5,515C 86.4238,509.224 93.4238,503.724 100.5,498.5 Z"/>
            <path style={{ opacity: 0.976 }} fill="var(--text-color)" d="M 893.5,498.5 C 894.873,498.343 896.207,498.51 897.5,499C 953.678,542.678 985.344,600.345 992.5,672C 992.616,686.337 992.449,700.837 992,715.5C 988.747,752.468 969.247,776.968 933.5,789C 921.874,791.592 910.207,793.925 898.5,796C 864.85,797.365 831.183,797.865 797.5,797.5C 806.744,696.623 779.411,607.957 715.5,531.5C 715.887,530.28 716.72,529.613 718,529.5C 746.556,544.939 777.056,550.106 809.5,545C 834.207,540.143 856.541,530.143 876.5,515C 882.626,509.944 888.293,504.444 893.5,498.5 Z"/>
            <path style={{ opacity: 0.988 }} fill="var(--text-color)" d="M 354.5,507.5 C 356.484,507.383 358.15,508.05 359.5,509.5C 385.423,538.308 417.423,557.141 455.5,566C 517.209,578.739 572.543,565.405 621.5,526C 627.683,519.483 634.183,513.316 641,507.5C 674.203,530.869 701.369,559.869 722.5,594.5C 754.09,650.704 769.256,711.038 768,775.5C 765.948,788.978 763.781,802.145 761.5,815C 756.471,829.893 748.971,843.393 739,855.5C 720.748,873.278 698.914,884.444 673.5,889C 659.092,891.203 644.758,893.203 630.5,895C 553.5,895.667 476.5,895.667 399.5,895C 380.925,893.179 362.258,891.179 343.5,889C 334.276,886.489 324.943,884.489 315.5,883C 303.8,879.103 292.467,874.437 281.5,869C 255.107,852.595 238.94,829.095 233,798.5C 223.014,710.987 244.347,632.32 297,562.5C 314.191,541.802 333.358,523.469 354.5,507.5 Z"/>
          </g>
        </svg>
        ),
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: <SettingOutlined style={{ fontSize: '20px' }} />,
    },
  ];


  return (
    <div
      className={`relative-position`}
      style={{ width: collapsed ? 80 : 256, height: '100%', display: 'flex', flexDirection: 'column', transition: 'width 0.3s', zIndex: 10 }}
    >
      <Menu
        theme={theme}
        onClick={onClick}
        style={{ flex: '1 1 auto', zIndex: 1 }}
        defaultOpenKeys={openKeys}
        selectedKeys={[current]}
        mode="inline"
        inlineCollapsed={collapsed}
        items={menuItems}
      />
      {!collapsed && (
        <div style={{ position: 'absolute', width: 256, bottom: 0, left: 0, zIndex: 2 }}>
          <PlanInfo />
        </div>
      )}
    </div>
  );
};

export default MenuComponent;