import jsQR from "jsqr";
import { useCallback, useEffect, useRef, useState } from "react";

const QrcodeReader = () => {
  const useAnimationFrame = (callback) => {
    const requestRef = useRef();
    const animate = useCallback(
      (time) => {
        callback(time);
        requestRef.current = requestAnimationFrame(animate);
      },
      [callback]
    );
    useEffect(() => {
      requestRef.current = requestAnimationFrame(animate);
      return () => {
        if (requestRef.current) {
          return cancelAnimationFrame(requestRef.current);
        }
      };
    }, [animate]);
  };

  const videoParentRef = useRef(null);
  const photoRef = useRef(null);

  const [qrcodeData, setQrcodeData] = useState("No data!!!");

  function drawLine(canvas, begin, end, color) {
    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 4;
    canvas.strokeStyle = color;
    canvas.stroke();
  }

  useAnimationFrame((time) => {
    const width = 414;
    const height = width / (16 / 9);

    const video = videoParentRef.current.children[0];
    const photo = photoRef.current;

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      photo.width = width;
      photo.height = height;

      const canvas = photo.getContext("2d");
      canvas.drawImage(video, 0, 0, width, height);

      const imageData = canvas.getImageData(0, 0, photo.width, photo.height);
      const qrcode = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });

      if (qrcode) {
        drawLine(
          canvas,
          qrcode.location.topLeftCorner,
          qrcode.location.topRightCorner,
          "#FF3B58"
        );
        drawLine(
          canvas,
          qrcode.location.topRightCorner,
          qrcode.location.bottomRightCorner,
          "#FF3B58"
        );
        drawLine(
          canvas,
          qrcode.location.bottomRightCorner,
          qrcode.location.bottomLeftCorner,
          "#FF3B58"
        );
        drawLine(
          canvas,
          qrcode.location.bottomLeftCorner,
          qrcode.location.topLeftCorner,
          "#FF3B58"
        );
        setQrcodeData(qrcode.data);
      } else {
        setQrcodeData("QRCode is No Data!!!2");
      }
    }
  });

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 800, height: 600 } })
      .then((stream) => {
        let video = videoParentRef.current.children[0];
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getVideo();
  }, [videoParentRef]);

  return (
    <>
      <canvas ref={photoRef} />
      <span>{qrcodeData}</span>
      <div
        ref={videoParentRef}
        dangerouslySetInnerHTML={{
          __html: `
          <video
            muted
            autoplay
            playsinline
          />`,
        }}
      />
    </>
  );
};

export default QrcodeReader;
