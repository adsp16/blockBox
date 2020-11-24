import React, { useState } from "react";
import BlockLogo from "../blocks.svg";
import {
  Button,
  Row,
  Col,
  Card,
  Form,
  FormControl,
  InputGroup,
  Alert,
  Spinner,
  Table,
} from "react-bootstrap";
import {convertBytes} from "../utilities/convertBytes";
import moment from "moment";
import "./Main.css";

const Main = ({
  getFile,
  uploadFile,
  fileLink,
  files,
  copy,
  success,
  show,
  close,
  loading,
}) => {
  return (
    <div className="my-5">
      <Row>
        <Col className="d-flex justify-content-center">
          <Card className="main-upload-card">
            <Card.Body>
              <Card.Title className='text-lg-right text-sm-center'><img className='upload-logo-img' src={BlockLogo} />Box</Card.Title>
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
                    {["Get Link", "IPFS & BlockChain"].map((name, index) => (
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
                    ))}
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
                  {loading ? <Spinner animation="border" /> : "Upload"}
                </Button>
              </Form>
              {fileLink && show ? (
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Download Link...."
                    aria-label="Download Link"
                    aria-describedby="link"
                    value={fileLink}
                    readOnly
                  />
                  <InputGroup.Append>
                    <Button onClick={copy} variant="outline-primary">
                      Copy
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              ) : null}
              {show ? (
                <Alert
                  show={show}
                  onClose={close}
                  variant="success"
                  dismissible
                >
                  {success}
                </Alert>
              ) : null}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <Table hover bordered striped>
            <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>upload date</th>
              <th>file size</th>
              <th>file link</th>
            </tr>
            </thead>
            <tbody>
            {files.map((file, key) => {
              console.log(file);
             return <tr key={key}>
             <td>{file.fileId}</td>
             <td>{file.fileName}</td>
            <td>{moment.unix(parseInt(file.uploadTime)).format('MMMM Do YYYY, h:mm:ss a')}</td>
             <td>{convertBytes(file.fileSize)}</td>
             <td>
             <a
               href={`https://ipfs.infura.io/ipfs/${file.fileHash}`}
              target="_blank">
                {file.fileHash.substring(0,10)}...
              </a>
             </td>
            </tr>
            })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default Main;
