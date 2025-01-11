import React from 'react';
import style from './style.module.css';
import Image from 'next/image';

// Component: SideSection
// This component renders a side section with a welcome banner and an image
export default function SideSection() {
  return (
    // Main container for the side section
    <div className={style.sideFrame}>
      {/* Inner container for the banner */}
      <div className={style.sideBanner}>
        {/* Welcome text section */}
        <div className="">
          {/* Main title */}
          <h1 className={`${style['main-part']}`}>
            Welcome to{' '}
            <span className={style['small-part']}>Elevate</span> {/* Highlighted text */}
          </h1>

          {/* Subtitle or leading paragraph */}
          <p className={style.leading}>
            Quidem autem voluptatibus qui quaerat aspernatur architecto natus
          </p>
        </div>

        {/* Image section */}
        <div className="">
          <Image
            src={'/assets/images/bro.png'} // Path to the image asset
            alt="bro image" // Alternative text for the image
            width={408} // Width of the image in pixels
            height={434.59} // Height of the image in pixels
          />
        </div>
      </div>
    </div>
  );
}
