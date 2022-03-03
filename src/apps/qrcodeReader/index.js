import { useCallback, useEffect, useRef, useState } from "react";

const QrcodeReader = () => {
  const [count, setCount] = useState(0);
  const previousTimeRef = useRef();

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

  useAnimationFrame((time) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      setCount((prevCount) => (prevCount + deltaTime * 0.01) % 100);
    }
    previousTimeRef.current = time;
  });

  return <div>{Math.round(count)}</div>;

  // const videoRef = useRef(null);
  // const photoRef = useRef(null);

  // const [hasPhoto, setHasPhoto] = useState(false);

  // const getVideo = () => {
  //   navigator.mediaDevices
  //     .getUserMedia({ video: { width: 1920, height: 1080 } })
  //     .then((stream) => {
  //       let video = videoRef.current;
  //       video.srcObject = stream;
  //       video.play();
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  // const takePhoto = () => {
  //   const width = 414;
  //   const height = width / (16 / 9);

  //   // let video = videoRef.current;
  //   let photo = photoRef.current;

  //   photo.width = width;
  //   photo.height = height;

  //   setHasPhoto(true);

  //   // let ctx = photo.getContext("2d");
  //   // ctx.drawImage(video, 0, 0, width, height);

  //   streaming();
  // };

  // const streaming = () => {
  //   if (!hasPhoto) {
  //     return;
  //   }
  //   let photo = photoRef.current;
  //   photo
  //     .getContext("2d")
  //     .drawImage(videoRef.current, 0, 0, photo.width, photo.height);
  //   requestAnimationFrame(streaming);
  // };

  // const closePhoto = () => {
  //   let photo = photoRef.current;
  //   let ctx = photo.getContext("2d");

  //   ctx.clearRect(0, 0, photo.width, photo.height);

  //   setHasPhoto(false);
  // };

  // useEffect(() => {
  //   getVideo();
  // }, [videoRef]);

  // const videoStyle = {
  //   width: "100%",
  //   maxWidth: "100%",
  //   height: "auto",
  // };

  // return (
  //   <>
  //     <div className="camera">
  //       <video ref={videoRef} style={videoStyle} />
  //       <button onClick={takePhoto}>SNAP!</button>
  //     </div>
  //     <div className="result">
  //       <canvas ref={photoRef} />
  //       <button onClick={closePhoto}>CLOSE!</button>
  //     </div>
  //   </>
  // );
};

export default QrcodeReader;
