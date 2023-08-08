import { useEffect, useState } from "react";

type Size = {
  emSize: number;
  pxSize: number;
}

type ScreenSize = {
  heightSize: Size;
  widthSize: Size;
}
export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    widthSize: {
      emSize: 0,
      pxSize: 0,
    },
    heightSize: {
      emSize: 0,
      pxSize: 0,
    },
  });


  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        widthSize: {
          pxSize: window.innerWidth,
          emSize: window.innerWidth / 16,
        },
        heightSize: {
          pxSize: window.innerHeight,
          emSize: window.innerHeight / 16,
        },
      })
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
