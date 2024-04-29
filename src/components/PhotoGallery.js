import React, { useContext, useState } from 'react';
import FormContext from './formContext/FormContext';
import './css/fusion.css';

const PhotoGallery = () => {
  const { formData } = useContext(FormContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    formData.imageURL[0],
    formData.imageURL[1],
    formData.imageURL[2],
  ];

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="outerContainer1">
      <h2>{formData.pnombre}</h2>
      <div className="galleryContainer1">
        <button onClick={goToPrevious} className="navButton1g">←</button>
        <div className="galleryImageContainer1">
          <img src={images[currentIndex]} alt="Imagen de galería" className="galleryImage1" />
        </div>
        <button onClick={goToNext} className="navButton1g">→</button>
      </div>
    </div>
  );



};

export default PhotoGallery;
