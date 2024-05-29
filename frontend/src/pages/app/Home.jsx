import React, { useEffect, useState } from 'react';
import httpClient from '../../additional/httpClient';
import { Card } from 'antd';
import { YoutubeOutlined } from '@ant-design/icons';
import Feedback from '../../components/app/Feedback'
import './styles.css';

const Home = () => {
  const [user, setUser] = useState(null);

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

  const handleVideoClick = () => {
    window.open('https://www.youtube.com/watch?v=uiqiDE9r-Kw', '_blank');
  };

  return (
    <div className='fixed-wrapper'>
        <div className="page-container">
        <div className='top'>
          <h1 className="page-title">
            {user ? `Welcome, ${user.username}` : 'Welcome'}
          </h1>
          <div>
            <Feedback />
          </div>
        </div>

        <p className="page-welcome-text">Video of the month:</p>
        <div className="video-card-container">
          <Card
            hoverable
            cover={
              <div className="ant-card-cover">
                <img
                  src="https://img.youtube.com/vi/uiqiDE9r-Kw/maxresdefault.jpg" className="custom-image"           
                />
                  <div className="youtube-logo-container">
                      <YoutubeOutlined className="youtube-logo" />
                  </div>
              </div>
            }
            onClick={handleVideoClick}
          >
            <p className ="page-welcome-text">How I Regained My Ability to Concentrate</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
