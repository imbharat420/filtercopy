import { useState,useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";

const DetectResize = ()=>{
    const [width,setWidth] = useState(window.innerWidth)
    const debounceValue = useDebounce(width, 300);

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return(
        <div>
            debounce width : {debounceValue}
            width by state : {width}      
        </div>
    )
}

export default DetectResize;


/*
import React, { useLayoutEffect, useState } from 'react';

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

function ShowWindowDimensions(props) {
  const [width, height] = useWindowSize();
  return <span>Window size: {width} x {height}</span>;
}
  */