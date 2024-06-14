import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import "./App.css";
import fatherImg from "./assets/FathersDay.jpg";
import stripImg from "./assets/strip.jpg";

import { Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ImagePortal = () => {
  const [name, setName] = useState("");
  const [stamp, setStamp] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const imageRef = useRef();
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleStampChange = (e) => {
    setStamp(e.target.files[0]);
  };

  // Creating Image
  const handleCreateImage = () => {
    if (!name) {
      alert("Please Enter Name");
      return;
    }
    if (!stamp) {
      alert("Please Upload Image");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imgData = event.target.result;

      // Create a canvas to draw the base image, name, and stamp
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const baseImage = new Image();
      baseImage.src = fatherImg;

      baseImage.onload = () => {
        canvas.width = baseImage.width;
        canvas.height = baseImage.height;
        ctx.drawImage(baseImage, 0, 0);

        ctx.font = "48px 'Comic Sans MS', cursive, sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "#007BFF"; // Suitable color for the text
        ctx.fillText(name, canvas.width / 2, 1010);

        const stampImage = new Image();
        stampImage.src = imgData;

        stampImage.onload = () => {
          ctx.drawImage(stampImage, 357, 341, 400, 400);

          const stripImage = new Image();
          stripImage.src = stripImg;

          stripImage.onload = () => {
            // Rotate the image by 45 degrees
            ctx.save(); // Save the current state of the context
            ctx.translate(
              200 + stripImage.width / 2,
              100 + stripImage.height / 2
            ); // Translate to the center of the image
            ctx.rotate((39 * Math.PI) / 180); // Rotate 45 degrees (in radians)
            ctx.drawImage(stripImage, 77, 64, 47, -210); // Draw the image offset by half its width and height
            ctx.restore(); // Restore the saved state (removes the rotation)

            // Convert canvas to image URL
            const imageUrl = canvas.toDataURL("image/png");
            setImagePreviewUrl(imageUrl);
          };
        };
      };
    };

    reader.readAsDataURL(stamp);
  };

  return (
    <div className="main-page">
      <Button onClick={() => navigate("/")} variant="primary" className="mb-3">
        Go To Certificate Portal
      </Button>
      <h2>Image Portal</h2>

      <Row className="align-items-end mb-5">
        <Col xs={12} md={12} lg={4} className="mb-3">
          <h4>Please Enter Name</h4>
          <Form.Control
            placeholder="Enter Name"
            value={name}
            onChange={handleNameChange}
          />
        </Col>

        <Col xs={12} md={12} lg={4} className="mb-3">
          <h4>Please Select Image</h4>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleStampChange}
          />
        </Col>
        <Col xs={12} md={12} lg={4} className="mb-3">
          <Button onClick={handleCreateImage}>Create Blessings</Button>
        </Col>
      </Row>

      <Row className="d-flex flex-column justify-content-start">
        <Col>
          {" "}
          <h3>Image Preview</h3>
        </Col>
        {imagePreviewUrl && (
          <Col>
            {" "}
            <a href={imagePreviewUrl} download="blessings.png">
              <Button>Download Image</Button>
            </a>
          </Col>
        )}
      </Row>
      {imagePreviewUrl && (
        <Row className="mt-5">
          <Col>
            <img
              src={imagePreviewUrl}
              alt="Blessings Preview"
              style={{ width: "100%", height: "auto", minHeight: "100px" }}
              ref={imageRef}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ImagePortal;
