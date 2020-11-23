import React, { useState } from "react";
import {
  Button,
  Row,
  Col,
  Card,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import "./Main.css";

const Main = ({ getFile, uploadFile, fileLink }) => {
  const { copySuccess, setCopySuccess } = useState();

  const copyToClip = () => {};

  return (
    <div className="my-5">
      <Row>
        <Col className="d-flex justify-content-center">
          <Card className="main-upload-card">
            <Card.Body>
              <Card.Title>BlockBox</Card.Title>
              <Form onSubmit={uploadFile}>
                <Form.Group>
                  <Form.File
                    className="upload-file-name"
                    id="fileUpload"
                    onChange={getFile}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <div className="d-flex">
                    {["Get Link", "Just On The Blockchain"].map(
                      (name, index) => (
                        <Form.Check
                          className="mr-3"
                          key={name}
                          type="radio"
                          id={name}
                          label={name}
                          name="one"
                          value={name}
                          required
                        />
                      )
                    )}
                  </div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    required
                    name="message"
                  />
                </Form.Group>
                <Button
                  className="mb-5"
                  type="submit"
                  block
                  size="lg"
                  variant="primary"
                >
                  Upload
                </Button>
              </Form>
              {fileLink ? (
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Download Link...."
                    aria-label="Download Link"
                    aria-describedby="link"
                    value={fileLink}
                    readOnly
                  />
                  <InputGroup.Append>
                    <Button variant="outline-primary">Copy</Button>
                  </InputGroup.Append>
                </InputGroup>
              ) : null}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Main;
