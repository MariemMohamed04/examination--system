/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

type HeaderProps = {
  text:string,
  span?: string,
  className?: string,
  spanClassName?: string;
}

const HeadingComponent: React.FC<HeaderProps> = ({
  text,
  span,
  className,
  spanClassName,
}) => {
  return (
    <>
<h1 className={`w-[410px] h-[30.94px] text-[24.78px] font-bold ${className || ''}`}>
      {text}
    </h1>
    </>
  );
};

export default HeadingComponent;

/*
.heading {
  width: 410px;
  height: 30.94px;
  font: 700 24.78px var(--main-font);
  line-height: 29.99px;
}

*/