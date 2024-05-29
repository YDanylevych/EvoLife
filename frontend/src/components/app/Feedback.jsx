import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Feedback = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/app/feedback');
    };

    return (
        <div className="top-right-button-container">
            <Button className="custom-button" type="primary" onClick={handleClick}>
                Give feedback
            </Button>
        </div>
    );
};

export default Feedback;