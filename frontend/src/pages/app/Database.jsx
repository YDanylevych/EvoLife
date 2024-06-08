import React, { useState } from 'react';
import './styles.css';
import { Modal, Button, List } from 'antd';

// Import images
import image1 from '../../assets/Item 1.png';
import image2 from '../../assets/Item 2.png';
import image3 from '../../assets/Item 3.png';
import image4 from '../../assets/Item 4.png';
import image5 from '../../assets/Item 5.png';
import image6 from '../../assets/Item 6.png';
import image7 from '../../assets/Item 7.png';
import image8 from '../../assets/Item 8.png';
import image9 from '../../assets/Item 9.png';
import image10 from '../../assets/Item 10.png';
import image11 from '../../assets/Item 11.png';
import image12 from '../../assets/Item 12.png';
import image13 from '../../assets/Item 13.png';
import image14 from '../../assets/Item 14.png';
import image15 from '../../assets/Item 15.png';

const MyDatabase = () => {
  const items = [
    { id: 1, image: image1, text: 'Philosophy', options: [
      { key: 1, text: 'Man and his Symbols - Carl G.Jung', link: 'https://static1.squarespace.com/static/5e265eb50aee2d7e8a81ae69/t/634606fa5c87e33191e60e11/1665533705287/man-and-his-symbols%2BB.pdf' },
      { key: 2, text: 'Metaphysics - Aristotle', link: 'https://philpapers.org/archive/SONAM-3.pdf' },
      { key: 3, text: 'Option 1-3', link: 'https://example.com/1-3' },
      { key: 4, text: 'Option 1-4', link: 'https://example.com/1-4' },
      { key: 5, text: 'Option 1-5', link: 'https://example.com/1-5' },
      { key: 6, text: 'Option 1-6', link: 'https://example.com/1-6' },
      { key: 7, text: 'Option 1-7', link: 'https://example.com/1-7' },
      { key: 8, text: 'Option 1-8', link: 'https://example.com/1-8' },
      { key: 9, text: 'Option 1-9', link: 'https://example.com/1-9' },
      { key: 10, text: 'Option 1-10', link: 'https://example.com/1-10' }
    ] },
    { id: 2, image: image2, text: 'Workout', options: [
      { key: 1, text: 'Thenx', link: 'https://thenx.com/training' },
      { key: 2, text: 'Next', link: 'https://nextworkoutapp.com/next-app' },
      { key: 3, text: 'Andrealarosa', link: 'https://www.andrealarosa.fit/en/' },
      { key: 4, text: 'Option 2-4', link: 'https://example.com/2-4' },
      { key: 5, text: 'Option 2-5', link: 'https://example.com/2-5' },
      { key: 6, text: 'Option 2-6', link: 'https://example.com/2-6' },
      { key: 7, text: 'Option 2-7', link: 'https://example.com/2-7' },
      { key: 8, text: 'Option 2-8', link: 'https://example.com/2-8' },
      { key: 9, text: 'Option 2-9', link: 'https://example.com/2-9' },
      { key: 10, text: 'Option 2-10', link: 'https://example.com/2-10' }
    ] },
    { id: 3, image: image3, text: 'Nutrition', options: [
      { key: 1, text: 'Option 3-1', link: 'https://example.com/3-1' },
      { key: 2, text: 'Option 3-2', link: 'https://example.com/3-2' },
      { key: 3, text: 'Option 3-3', link: 'https://example.com/3-3' },
      { key: 4, text: 'Option 3-4', link: 'https://example.com/3-4' },
      { key: 5, text: 'Option 3-5', link: 'https://example.com/3-5' },
      { key: 6, text: 'Option 3-6', link: 'https://example.com/3-6' },
      { key: 7, text: 'Option 3-7', link: 'https://example.com/3-7' },
      { key: 8, text: 'Option 3-8', link: 'https://example.com/3-8' },
      { key: 9, text: 'Option 3-9', link: 'https://example.com/3-9' },
      { key: 10, text: 'Option 3-10', link: 'https://example.com/3-10' }
    ] },
    { id: 4, image: image4, text: 'Mental Health', options: [
      { key: 1, text: 'Option 4-1', link: 'https://example.com/4-1' },
      { key: 2, text: 'Option 4-2', link: 'https://example.com/4-2' },
      { key: 3, text: 'Option 4-3', link: 'https://example.com/4-3' },
      { key: 4, text: 'Option 4-4', link: 'https://example.com/4-4' },
      { key: 5, text: 'Option 4-5', link: 'https://example.com/4-5' },
      { key: 6, text: 'Option 4-6', link: 'https://example.com/4-6' },
      { key: 7, text: 'Option 4-7', link: 'https://example.com/4-7' },
      { key: 8, text: 'Option 4-8', link: 'https://example.com/4-8' },
      { key: 9, text: 'Option 4-9', link: 'https://example.com/4-9' },
      { key: 10, text: 'Option 4-10', link: 'https://example.com/4-10' }
    ] },
    { id: 5, image: image5, text: 'Technology', options: [
      { key: 1, text: 'Option 5-1', link: 'https://example.com/5-1' },
      { key: 2, text: 'Option 5-2', link: 'https://example.com/5-2' },
      { key: 3, text: 'Option 5-3', link: 'https://example.com/5-3' },
      { key: 4, text: 'Option 5-4', link: 'https://example.com/5-4' },
      { key: 5, text: 'Option 5-5', link: 'https://example.com/5-5' },
      { key: 6, text: 'Option 5-6', link: 'https://example.com/5-6' },
      { key: 7, text: 'Option 5-7', link: 'https://example.com/5-7' },
      { key: 8, text: 'Option 5-8', link: 'https://example.com/5-8' },
      { key: 9, text: 'Option 5-9', link: 'https://example.com/5-9' },
      { key: 10, text: 'Option 5-10', link: 'https://example.com/5-10' }
    ] },
    { id: 6, image: image6, text: 'Science', options: [
      { key: 1, text: 'Option 6-1', link: 'https://example.com/6-1' },
      { key: 2, text: 'Option 6-2', link: 'https://example.com/6-2' },
      { key: 3, text: 'Option 6-3', link: 'https://example.com/6-3' },
      { key: 4, text: 'Option 6-4', link: 'https://example.com/6-4' },
      { key: 5, text: 'Option 6-5', link: 'https://example.com/6-5' },
      { key: 6, text: 'Option 6-6', link: 'https://example.com/6-6' },
      { key: 7, text: 'Option 6-7', link: 'https://example.com/6-7' },
      { key: 8, text: 'Option 6-8', link: 'https://example.com/6-8' },
      { key: 9, text: 'Option 6-9', link: 'https://example.com/6-9' },
      { key: 10, text: 'Option 6-10', link: 'https://example.com/6-10' }
    ] },
    { id: 7, image: image7, text: 'Financial Literacy', options: [
      { key: 1, text: 'Rich Dad Poor Dad - Robert Kiyosaki', link: 'https://www.everand.com/book/206713254/Rich-Dad-Poor-Dad' },
      { key: 2, text: 'The Intelligent Investor - Benjamin Graham', link: 'https://www.amazon.com/Intelligent-Investor-Definitive-Investing-Essentials/dp/0060555661' },
      { key: 3, text: 'Option 7-3', link: 'https://example.com/7-3' },
      { key: 4, text: 'Option 7-4', link: 'https://example.com/7-4' },
      { key: 5, text: 'Option 7-5', link: 'https://example.com/7-5' },
      { key: 6, text: 'Option 7-6', link: 'https://example.com/7-6' },
      { key: 7, text: 'Option 7-7', link: 'https://example.com/7-7' },
      { key: 8, text: 'Option 7-8', link: 'https://example.com/7-8' },
      { key: 9, text: 'Option 7-9', link: 'https://example.com/7-9' },
      { key: 10, text: 'Option 7-10', link: 'https://example.com/7-10' }
    ] },
    { id: 8, image: image8, text: 'Self-Discipline', options: [
      { key: 1, text: 'Option 8-1', link: 'https://example.com/8-1' },
      { key: 2, text: 'Option 8-2', link: 'https://example.com/8-2' },
      { key: 3, text: 'Option 8-3', link: 'https://example.com/8-3' },
      { key: 4, text: 'Option 8-4', link: 'https://example.com/8-4' },
      { key: 5, text: 'Option 8-5', link: 'https://example.com/8-5' },
      { key: 6, text: 'Option 8-6', link: 'https://example.com/8-6' },
      { key: 7, text: 'Option 8-7', link: 'https://example.com/8-7' },
      { key: 8, text: 'Option 8-8', link: 'https://example.com/8-8' },
      { key: 9, text: 'Option 8-9', link: 'https://example.com/8-9' },
      { key: 10, text: 'Option 8-10', link: 'https://example.com/8-10' }
    ] },
    { id: 9, image: image9, text: 'Time Management', options: [
      { key: 1, text: 'Option 9-1', link: 'https://example.com/9-1' },
      { key: 2, text: 'Option 9-2', link: 'https://example.com/9-2' },
      { key: 3, text: 'Option 9-3', link: 'https://example.com/9-3' },
      { key: 4, text: 'Option 9-4', link: 'https://example.com/9-4' },
      { key: 5, text: 'Option 9-5', link: 'https://example.com/9-5' },
      { key: 6, text: 'Option 9-6', link: 'https://example.com/9-6' },
      { key: 7, text: 'Option 9-7', link: 'https://example.com/9-7' },
      { key: 8, text: 'Option 9-8', link: 'https://example.com/9-8' },
      { key: 9, text: 'Option 9-9', link: 'https://example.com/9-9' },
      { key: 10, text: 'Option 9-10', link: 'https://example.com/9-10' }
    ] },
    { id: 10, image: image10, text: 'Spiritual Growth', options: [
      { key: 1, text: 'Option 10-1', link: 'https://example.com/10-1' },
      { key: 2, text: 'Option 10-2', link: 'https://example.com/10-2' },
      { key: 3, text: 'Option 10-3', link: 'https://example.com/10-3' },
      { key: 4, text: 'Option 10-4', link: 'https://example.com/10-4' },
      { key: 5, text: 'Option 10-5', link: 'https://example.com/10-5' },
      { key: 6, text: 'Option 10-6', link: 'https://example.com/10-6' },
      { key: 7, text: 'Option 10-7', link: 'https://example.com/10-7' },
      { key: 8, text: 'Option 10-8', link: 'https://example.com/10-8' },
      { key: 9, text: 'Option 10-9', link: 'https://example.com/10-9' },
      { key: 10, text: 'Option 10-10', link: 'https://example.com/10-10' },
      { key: 11, text: 'Option 10-11', link: 'https://example.com/11-11' },
    ] },
    
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentOptions, setCurrentOptions] = useState([]);

  const showModal = (options) => {
    setCurrentOptions(options);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="page-container">
      <div>
        <h1 className="page-title">Topics</h1>
      </div>
      <div className="grid-container">
        {items.map(item => (
          <div key={item.id} className="grid-item" onClick={() => showModal(item.options)}>
            <img src={item.image} alt={`Item ${item.id}`} />
            <p>{item.text}</p>
          </div>
        ))}
      </div>
      <Modal
            title="Choose an Option"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            bodyStyle={{ backgroundColor: 'grey' }}
            className="custom-modal"
            >
            <List
                dataSource={currentOptions}
                renderItem={option => (
                <List.Item className="custom-list-item">
                    <a href={option.link} target="_blank" rel="noopener noreferrer">{option.text}</a>
                </List.Item>
                )}
            />
        </Modal>
    </div>
  );
};

export default MyDatabase;
