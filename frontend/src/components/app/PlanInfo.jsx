
import React from 'react';
import { Button } from 'antd';
import './styles.css';

const PlanInfo = () => {
  return (
    <div className="custom-footer">
      <div className="custom-footer-text">Your plan is free</div>
      <Button className="custom-footer-button" type="primary">View plans</Button>
    </div>
  );
};

export default PlanInfo;
