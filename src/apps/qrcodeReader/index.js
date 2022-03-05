import { useEffect, useRef, useState } from "react";

const QrcodeReader = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 1920, height: 1080 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);

    setHasPhoto(true);
  };

  const closePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");

    ctx.clearRect(0, 0, photo.width, photo.height);

    setHasPhoto(false);
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const videoStyle = {
    width: "100%",
    maxWidth: "100%",
    height: "auto",
  };

  return (
    <>
      <div className="camera">
        <video ref={videoRef} style={videoStyle} />
        <button onClick={takePhoto}>SNAP!</button>
      </div>
      <div className="result">
        <canvas ref={photoRef} />
        <button onClick={closePhoto}>CLOSE!</button>
      </div>
    </>
  );
};

export default QrcodeReader;
