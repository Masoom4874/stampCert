import { useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import baseImg from "./assets/baseImage.jpg";
import jsPDF from "jspdf";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CertificationPortal = () => {
  const [name, setName] = useState("");
  const [stamp, setStamp] = useState(null);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState("");
  const iframeRef = useRef();
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleStampChange = (e) => {
    setStamp(e.target.files[0]);
  };

  // Creating Certificate
  const handleCreateCertificate = () => {
    if (!name) {
      alert("Please Enter Name");
      return;
    }
    if (!stamp) {
      alert("Please Upload Stamp");
      return;
    }

    const doc = new jsPDF("landscape");
    doc.addImage(baseImg, "JPEG", 0, 0, 297, 210);

    doc.setFontSize(24);
    doc.text(name, 148.5, 120, { align: "center" });

    if (stamp) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgData = event.target.result;
        doc.addImage(imgData, "PNG", 168, 130, 50, 50, { align: "center" });
        const pdfUrl = doc.output("bloburl");
        setPdfPreviewUrl(pdfUrl);
      };
      reader.readAsDataURL(stamp);
    } else {
      const pdfUrl = doc.output("bloburl");
      setPdfPreviewUrl(pdfUrl);
    }
  };

  return (
    <div className="main-page">
      <Button
        onClick={() => navigate("/image")}
        variant="primary"
        className="mb-3"
      >
        Go To Image Portal
      </Button>
      <h2>Certification Portal</h2>

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
          <h4>Please Select Stamp</h4>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleStampChange}
          />
        </Col>
        <Col xs={12} md={12} lg={4} className="mb-3">
          <Button onClick={handleCreateCertificate}>Create Certificate</Button>
        </Col>
      </Row>

      <h3>Certification Preview</h3>
      {pdfPreviewUrl && (
        <Row className="mt-5">
          <Col>
            <iframe
              ref={iframeRef}
              src={pdfPreviewUrl}
              width="100%"
              height="100%"
              style={{ minHeight: "500px" }}
              title="PDF Preview"
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default CertificationPortal;
