import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Carousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const navigate = useNavigate();
  const nextSlide = () => {
    setActiveIndex((prevIndex) => {
      return (prevIndex + 1) % items.length;
    });
  };
  const navigateToBookTicket = (item) => {
    console.log(item);
    navigate("/showDetails", { state: item });
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    let slideInterval;
    if (isPlaying) {
      slideInterval = setInterval(() => {
        nextSlide();
      }, 3000);
    }
    return () => {
      clearInterval(slideInterval);
    };
  }, [isPlaying]);

  return (
    <div id="carousel-example" className="min-h-[36rem] w-screen">
      {/* Carousel Wrapper */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={prevSlide}
          type="button"
          className="flex items-center justify-center h-10 w-10 rounded-full bg-white/30 hover:bg-white/50 focus:outline-none focus:ring-4 focus:ring-white dark:bg-gray-800/30 dark:hover:bg-gray-800/60 dark:focus:ring-gray-800/70"
        >
          <svg
            className="h-4 w-4 text-white dark:text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </button>
        {/* {items.map((item, index) => console.log(item))} */}
        <div className="flex items-center justify-center  overflow-hidden rounded-lg">
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigateToBookTicket(item);
              }}
              className={`${
                index === activeIndex ? "flex" : "hidden"
              } duration-700 ease-in-out p-2 flex-col  items-center justify-center`}
            >
              <img
                src={item.poster}
                className=" w-[36rem] h-[34rem]  "
                alt={`Slide ${index + 1}`}
              />
              <div className="flex flex-row">
                <h1 className="text-xl font-bold mb-4">
                  {item.title} [Duration:{" "}
                  {(Number(item.duration) / 60).toFixed(2)} hrs]
                </h1>
                <p className=" text-xl mb-4"></p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={nextSlide}
          type="button"
          className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-400 hover:bg-white/50 focus:outline-none focus:ring-4 focus:ring-white dark:bg-gray-800/30 dark:hover:bg-gray-800/60 dark:focus:ring-gray-800/70"
        >
          <svg
            className="h-4 w-4 text-white dark:text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </button>
      </div>

      {/* Slider Indicators */}
      <div className="flex justify-center mt-4 space-x-3">
        {items.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full ${
              index === activeIndex
                ? "bg-white dark:bg-gray-800"
                : "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800"
            }`}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Slider Controls */}
    </div>
  );

  // return (
  //   <div id="carousel-example" className="relative min-h-[40rem] w-full">
  //     {/* Carousel Wrapper */}
  //     <div className="flex justify-center items-center  xl:min-w-[40rem] min-h-[40rem]  rounded-lg">
  //       {items.map((item, index) => (
  //         <div
  //           key={index}
  //           className={`${
  //             index === activeIndex ? "block" : "hidden"
  //           } duration-700 ease-in-out`}
  //         >
  //           {/* className="absolute sm:h-96 l:h-[32rem] xl:h-[32rem]  2xl:h-[46rem]  2xl:w-[64rem] sm:w-fit xl:w-[44rem]  " */}

  //   <img
  //     src={item.poster}
  //     className=" w-[40rem] h-[40rem]  "
  //     alt={`Slide ${index + 1}`}
  //   />
  // </div>
  //       ))}
  //     </div>

  //     {/* Slider Indicators */}
  //     <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse">
  //       {items.map((item, index) => (
  //         <button
  //           key={index}
  //           type="button"
  //           onClick={() => goToSlide(index)}
  //           className={`h-3 w-3 rounded-full ${
  //             index === activeIndex
  //               ? "bg-white dark:bg-gray-800"
  //               : "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800"
  //           }`}
  //           aria-label={`Slide ${index + 1}`}
  //         ></button>
  //       ))}
  //     </div>

  //     {/* Slider Controls */}
  //     <button
  //       onClick={prevSlide}
  //       type="button"
  //       className="group absolute left-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
  //     >
  //       <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
  //         <svg
  //           className="h-4 w-4 text-white dark:text-gray-800"
  //           aria-hidden="true"
  //           xmlns="http://www.w3.org/2000/svg"
  //           fill="none"
  //           viewBox="0 0 6 10"
  //         >
  //           <path
  //             stroke="currentColor"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth="2"
  //             d="M5 1 1 5l4 4"
  //           />
  //         </svg>
  //         <span className="hidden">Previous</span>
  //       </span>
  //     </button>

  //     <button
  //       onClick={nextSlide}
  //       type="button"
  //       className="group absolute right-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
  //     >
  //       <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
  //         <svg
  //           className="h-4 w-4 text-white dark:text-gray-800"
  //           aria-hidden="true"
  //           xmlns="http://www.w3.org/2000/svg"
  //           fill="none"
  //           viewBox="0 0 6 10"
  //         >
  //           <path
  //             stroke="currentColor"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth="2"
  //             d="m1 9 4-4-4-4"
  //           />
  //         </svg>
  //         <span className="hidden">Next</span>
  //       </span>
  //     </button>
  //   </div>
  // );

  // return (
  //   <div
  //     id="carousel-example"
  //     className="relative w-full sm:h-96 xl:h-96 2xl:h-96"
  //   >
  //     {/* Carousel Wrapper */}
  //     <div className="relative h-56 overflow-hidden rounded-lg sm:h-96 xl:h-96 2xl:h-96">
  //       {items.map((item, index) => (
  //         <div
  //           key={index}
  //           className={`${
  //             index === activeIndex ? "block" : "hidden"
  //           } duration-700 ease-in-out`}
  //         >
  //           <img
  //             src={item.poster}
  //             className="object-cover h-full w-full rounded-md"
  //             alt={`Slide ${index + 1}`}
  //           />
  //         </div>
  //       ))}
  //     </div>

  //     {/* Slider Indicators */}
  //     <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse">
  //       {items.map((item, index) => (
  //         <button
  //           key={index}
  //           type="button"
  //           onClick={() => goToSlide(index)}
  //           className={`h-3 w-3 rounded-full ${
  //             index === activeIndex
  //               ? "bg-white dark:bg-gray-800"
  //               : "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800"
  //           }`}
  //           aria-label={`Slide ${index + 1}`}
  //         ></button>
  //       ))}
  //     </div>

  //     {/* Slider Controls */}
  //     <button
  //       onClick={prevSlide}
  //       type="button"
  //       className="group absolute left-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
  //     >
  //       <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
  //         <svg
  //           className="h-4 w-4 text-white dark:text-gray-800"
  //           aria-hidden="true"
  //           xmlns="http://www.w3.org/2000/svg"
  //           fill="none"
  //           viewBox="0 0 6 10"
  //         >
  //           <path
  //             stroke="currentColor"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth="2"
  //             d="M5 1 1 5l4 4"
  //           />
  //         </svg>
  //         <span className="hidden">Previous</span>
  //       </span>
  //     </button>

  //     <button
  //       onClick={nextSlide}
  //       type="button"
  //       className="group absolute right-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
  //     >
  //       <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
  //         <svg
  //           className="h-4 w-4 text-white dark:text-gray-800"
  //           aria-hidden="true"
  //           xmlns="http://www.w3.org/2000/svg"
  //           fill="none"
  //           viewBox="0 0 6 10"
  //         >
  //           <path
  //             stroke="currentColor"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth="2"
  //             d="m1 9 4-4-4-4"
  //           />
  //         </svg>
  //         <span className="hidden">Next</span>
  //       </span>
  //     </button>
  //   </div>
  // );
};

export default Carousel;
