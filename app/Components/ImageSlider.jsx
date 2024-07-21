import Link from "next/link";
import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";

const slideStyles = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const rightArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "32px",
  fontSize: "45px",
  color: "#000000",
  zIndex: 1,
  cursor: "pointer",
  userSelect: "none",
};

const leftArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  left: "32px",
  fontSize: "45px",
  color: "#000000",
  zIndex: 1,
  cursor: "pointer",
  userSelect: "none",
};

const sliderStyles = {
  position: "relative",
  height: "100%",
};

const dotsContainerStyles = {
  display: "flex",
  justifyContent: "center",
};

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.src = slides[currentIndex];
    image.onload = () => {
      setIsLoading(false);
    };
  }, [currentIndex, slides]);
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setIsLoading(true);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setIsLoading(true);
  };
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
    setIsLoading(true);
  };
  const slideStylesWidthBackground = {
    ...slideStyles,
    backgroundImage: isLoading ? "none" : `url(${slides[currentIndex]})`,
  };

  return (
    <div style={sliderStyles}>
      <div>
        <div onClick={goToPrevious} style={leftArrowStyles}>
          ❰
        </div>
        <div onClick={goToNext} style={rightArrowStyles}>
          ❱
        </div>
      </div>
      <Link href={slides[currentIndex]} target="_blank">
        <div style={slideStylesWidthBackground}>
          {" "}
          {isLoading && (
            <Skeleton
              variant="rounded"
              animation="wave"
              width="100%"
              height="100%"
            />
          )}
        </div>
      </Link>
      <div style={dotsContainerStyles}>
        {slides.map((slide, slideIndex) => (
          <div
            className={
              slideIndex === currentIndex
                ? "my-0 mx-1 cursor-pointer font-semibold text-white select-none"
                : "my-0 mx-1 cursor-pointer font-semibold text-black select-none"
            }
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
