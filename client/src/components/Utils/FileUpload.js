import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Icon } from "antd";
import axios from "axios";

function FileUpload(props) {
  const [images, setImages] = useState([]);

  const dropHandler = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/fomr-data" },
    };
    formData.append("file", files[0]);

    axios.post("/api/product/image", formData, config).then((response) => {
      if (response.data.success) {
        setImages([...images, response.data.filePath]);
        props.refreshFunction([...images, response.data.filePath]);
      } else {
        alert("파일을 저장하는데 실패했습니다.");
      }
    });
  };

  const deleteHanler = (image) => {
    const currentIndex = images.indexOf(image); //선택한 이미지 인덱스
    let newImages = [...images]; //기존 이미지들을 복사한다.

    newImages.splice(currentIndex, 1); //currentIndex <-인덱스 하나를 지워준다

    setImages(newImages);
    props.refreshFunction(newImages);
    console.log(currentIndex);
  };

  console.log(images);
  return (
    <div style={{ display: "flex", justifyConent: "space-between" }}>
      {" "}
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: 300,
              height: 240,
              border: "1px solid lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Icon type="plus" style={{ fontSize: "3rem", cursor: "pointer" }} />
          </div>
        )}
      </Dropzone>
      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll",
        }}
      >
        {images.map((image, index) => (
          <div onClick={() => deleteHanler(image)} key={index}>
            <img
              style={{ minWidth: "300px", width: "300px", height: "240px" }}
              src={`http://localhost:5000/${image}`}
            ></img>{" "}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
