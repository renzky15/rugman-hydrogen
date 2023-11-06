import React, { useRef, useState } from "react";

// react-pintura
import { PinturaEditor } from "@pqina/react-pintura";

import { getEditorDefaults } from "@pqina/pintura";

// get default properties
const editorDefaults = getEditorDefaults({
  stickers: [
    {
      src: 'stickers/sticker1.png',
      width: 400,
      height: 400,
      alt: 'sticker-one',
    },
    {
      src: 'stickers/sticker2.png',
      width: 400,
      height: 400,
      alt: 'sticker-two',
    },
    {
      src: 'stickers/sticker3.png',
      width: 400,
      height: 400,
      alt: 'sticker-three',
    },
    {
      src: 'stickers/sticker4.png',
      width: 400,
      height: 400,
      alt: 'sticker-four',
    },
    {
      src: 'stickers/sticker5.png',
      width: 400,
      height: 400,
      alt: 'sticker-five',
    },
    {
      src: 'stickers/sticker6.png',
      width: 400,
      height: 400,
      alt: 'sticker-six',
    },
    {
      src: 'stickers/sticker7.png',
      width: 400,
      height: 400,
      alt: 'sticker-seven',
    },
    {
      src: 'stickers/sticker8.png',
      width: 400,
      height: 400,
      alt: 'sticker-eight',
    },
    {
      src: 'stickers/sticker9.png',
      width: 400,
      height: 400,
      alt: 'sticker-nine',
    },
    {
      src: 'stickers/sticker10.png',
      width: 400,
      height: 400,
      alt: 'sticker-ten',
    },
    {
      src: 'stickers/1.png',
      width: 400,
      height: 400,
      alt: 'sticker-12',
    },
    {
      src: 'stickers/2.png',
      width: 400,
      height: 400,
      alt: 'sticker-13',
    },
    {
      src: 'stickers/3.png',
      width: 400,
      height: 400,
      alt: 'sticker-14',
    },
    {
      src: 'stickers/4.png',
      width: 400,
      height: 400,
      alt: 'sticker-15',
    },
    {
      src: 'stickers/5.png',
      width: 400,
      height: 400,
      alt: 'sticker-16',
    },
    {
      src: 'stickers/6.png',
      width: 400,
      height: 400,
      alt: 'sticker-17',
    },
    {
      src: 'stickers/7.png',
      width: 400,
      height: 400,
      alt: 'sticker-18',
    },
    {
      src: 'stickers/8.png',
      width: 400,
      height: 400,
      alt: 'sticker-19',
    }
  ],
  imageWriter: {
    targetSize: {
      width: 1024,
      height: 768,
      fit: 'contain'
    },
    postprocessImageData: (imageData) =>
      new Promise((resolve, reject) => {
        // Create a canvas element to handle the imageData

        const canvas = document.createElement('canvas');
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        const ctx = canvas.getContext('2d');
        ctx.putImageData(imageData, 0, 0);

        // Draw our watermark on top
        const watermark = new Image();
        watermark.onload = () => {
          // how to draw the image to the canvas
          // ctx.globalCompositeOperation = 'screen';

          // draw the watermark in the top right corner
          ctx.drawImage(
            watermark,

            // the watermark x and y position
            350,
            140,

            // the watermark width and height
            400,
            400
          );

          // Get and return the modified imageData
          resolve(
            ctx.getImageData(
              0,
              0,
              imageData.width,
              imageData.height
            )
          );
        };
        watermark.onerror = reject;
        watermark.crossOrigin = 'Anonymous';
        watermark.src = '/img/watermark.svg';
      }),
  },
});

const downloadFile = (file) => {
  // Create a hidden link and set the URL using createObjectURL
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = URL.createObjectURL(file);
  link.download = file.name;

  // We need to add the link to the DOM for "click()" to work
  document.body.appendChild(link);
  link.click();

  // To make this work on Firefox we need to wait a short moment before clean up
  setTimeout(() => {
    URL.revokeObjectURL(link.href);
    link.parentNode.removeChild(link);
  }, 0);
}

export default function PinturaEditorComponent() {
  // inline result
  const editorRef = useRef(null);

  const handleProcess = (imageState) => {
    downloadFile(imageState.dest);
  }
  return (
    <div>
      <div style={{ height: '100vh', width: '100%' }}>
        <PinturaEditor
          {...editorDefaults}
          ref={editorRef}
          src={"./image.jpg"}
          imageCropAspectRatio={1}
          onLoad={(res) => console.log("load image", res)}
          onProcess={handleProcess}
          imageAnnotation={[{
            x: 0,
            y: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'img.png',
            alwaysOnTop:true,
            backgroundSize:'contain'
          }
          ]}
        />
      </div>
      {!!result.length && (
        <p>
          <img src={result} alt="" />
        </p>
      )}
    </div>
  )
}
