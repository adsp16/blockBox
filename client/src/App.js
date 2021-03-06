import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getBlockBox } from "./utilities/getContract";
import { ipfs } from "./utilities/ipfs";
import { Container } from "react-bootstrap";
import Main from "./components/Main";
import Navigation from "./components/Navbar";
import getWeb3 from "./utilities/getWeb3";

import "./App.css";

const App = () => {
  const [account, setAccount] = useState({ account: "" });
  const [loading, setLoading] = useState(false);
  const [blockBoxJS, setblockBoxJS] = useState(null);
  const [fileCount, setfileCount] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileLink, setFileLink] = useState("");
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    loadWeb3();
  }, []);

  useEffect(() => {
    console.log(uploadedFile);
  }, [uploadedFile]);

  const loadWeb3 = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();

      setAccount({
        account: accounts[0],
      });

      const blockBox = await getBlockBox(web3);
      setblockBoxJS(blockBox);
      const fileCount = await blockBox.methods.fileCount().call();
      setfileCount(fileCount);

      for (let i = 1; i <= fileCount; i++) {
        const file = await blockBox.methods.files(i).call();
        setFiles((prevState) => [...prevState,file]);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const getFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    console.log(file);

    const reader = new window.FileReader();
    console.log(file);

    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setUploadedFile((prevState) => ({
        ...prevState,
        buffer: Buffer(reader.result),
        type: file.type,
        name: file.name,
        size: file.size,
      }));
    };
  };

  const uploadFile = (e) => {
    e.preventDefault();
    console.log("Uploading to the inter planetary file system...");
    const option = e.target.one.value;
    const ipfsUrl = "https://ipfs.infura.io/ipfs/";
    setMessage(e.target.message.value);
    setFileLink(null);
    setLoading(true);

    ipfs
      .add(uploadedFile.buffer)
      .then((result) => {
        console.log("IPFS Result", result);

        if (option === "Get Link") {
          console.log(`${ipfsUrl}${result.path}`);
          setFileLink(`${ipfsUrl}${result.path}`);
        }

        if (option === "IPFS & BlockChain") {
          setShow(true);
          setSuccess("Done!");
        }

        if (uploadedFile.type === "") {
          setUploadedFile((prevState) => ({
            ...prevState,
            type: "none",
          }));
        }
        console.log(parseInt(result.size));

        blockBoxJS.methods
          .uploadFile(
            result.path,
            uploadedFile.type,
            result.size,
            uploadedFile.name
          )
          .send({ from: account.account })
          .then((result) => {
            setLoading(false);
            setShow(true);
            setSuccess("File Uploaded");
          })
          .catch((err) => {
            window.alert("Transaction rejected");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        return;
      });

    console.log(uploadedFile);
    console.log(files);
  };

  const copyToClip = () => {
    navigator.clipboard.writeText(fileLink);
    setShow(true);
    setSuccess("Copied To Clipboard!");
  };

  const closeShow = () => {
    setShow(false);
  };

  return (
    <React.Fragment>
      <Navigation account={account} />
      <Container>
        <Main
          getFile={getFile}
          uploadFile={uploadFile}
          fileLink={fileLink}
          success={success}
          copy={copyToClip}
          show={show}
          close={closeShow}
          loading={loading}
          files={files}
        />
      </Container>
    </React.Fragment>
  );
};

export default App;
