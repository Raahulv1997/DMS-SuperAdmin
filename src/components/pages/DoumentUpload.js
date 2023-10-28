import React, { useEffect, useState } from "react";
import Logo from "../../../src/dms.png";
import Upload from "../../../src/upload.png";
// import Pdf from "../../../src/PDF.png";
import { useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddDocumentAnotherUser, GetDocumentAnotherUser } from "../../api/api";
function DoumentUpload() {
  let encoded;

  const [searchparams] = useSearchParams();
  const [clientToken, setClientToken] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [customvalidated, setcustomValidated] = useState("");
  const [DocumentUpload, setDocumentUpload] = useState("");
  const [apicall, setapicall] = useState(false);
  const [getDocumentData, setGetDocmentData] = useState([]);

  const initialFormState = {
    document_title: documentName,
    document_type: documentType,
    document_url: DocumentUpload,
    uploaded_by: "another_user",
  };

  useEffect(() => {
    if (
      searchparams.get("client_token") === null ||
      searchparams.get("client_token") === "" ||
      searchparams.get("client_token") === undefined
    ) {
      setClientToken("");
    } else {
      setClientToken(searchparams.get("client_token"));
    }
  }, [clientToken]);

  const OndocumentName = (e) => {
    setDocumentName(e.target.value);
    setcustomValidated("");
  };

  // funtion for base 64 file reader
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      const { name } = file;
      fileReader.addEventListener("load", () => {
        resolve({ name: name, base64: fileReader.result });
      });
      fileReader.readAsDataURL(file);
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // onChange function for document upload and formate validation
  const imguploadchange = async (e) => {
    encoded = await convertToBase64(e.target.files[0]);
    const [first, ...rest] = encoded.base64.split(",");
    let imgvalidation = first.split("/").pop();

    if (
      imgvalidation === "jpeg;base64" ||
      imgvalidation === "jpg;base64" ||
      imgvalidation === "png;base64" ||
      imgvalidation === "pdf;base64" ||
      imgvalidation === "csv;base64" ||
      imgvalidation === "msword;base64" ||
      imgvalidation ===
        "vnd.openxmlformats-officedocument.wordprocessingml.document;base64" ||
      imgvalidation === "vnd.ms-excel;base64" ||
      imgvalidation ===
        "vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64"
    ) {
      const productimg = rest.join("-");
      setDocumentUpload(productimg);

      setcustomValidated("");
    } else {
      setcustomValidated("imgformat");
    }

    imgvalidation = imgvalidation.replace(";base64", "");

    setDocumentType(imgvalidation);
    // e.target.value = null;
  };

  // funtion for add document
  const addDocument = async (e) => {
    e.preventDefault();

    if (documentName === "") {
      setcustomValidated("name is empty");
    } else if (DocumentUpload === "") {
      setcustomValidated("document is empty");
    } else {
      const response = await toast.promise(
        AddDocumentAnotherUser(clientToken, initialFormState),
        {
          pending: "Document upload  pending",
          // success: "Upload compelete👌",
        }
      );

      if (response.message === "Document upload successfully") {
        toast.success("Document Upload Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setDocumentName("");
        setDocumentUpload("");
        getDocumentByid(clientToken);

        setapicall(true);
      }
    }
  };

  // useEffect get document based on id----
  useEffect(() => {
    getDocumentByid(clientToken);
  }, [clientToken, apicall]);

  //function for get document based on client id
  const getDocumentByid = async (clientToken) => {
    const response = await GetDocumentAnotherUser(clientToken);

    console.log("respone--" + JSON.stringify(response));
    if (response.response === "Client token not in header") {
      setGetDocmentData([]);
    } else {
      setGetDocmentData(response);
    }

    setapicall(false);
  };

  return (
    <div>
      <div className="col-sm-6 main_continer">
        <div className="dms_logo">
          <img src={Logo} alt={"img"} />
        </div>
        <div className="main_form">
          <form
            onSubmit={(e) => {
              addDocument(e);
            }}
          >
            <div className="file_upload">
              <input
                type="file"
                id="img_64"
                name={"img_64"}
                // value={state.name}
                onChange={(e) => imguploadchange(e)}
              ></input>
              <div className="logo_upload">
                <img src={Upload} alt={"img"} />
                <p className="text-center">Click To Upload</p>
              </div>
              {customvalidated === "document is empty" ? (
                <small className="text-danger"> please Select file first</small>
              ) : null}

              {customvalidated === "imgformat" ? (
                <span
                  className="mt-2   text-center fs-6 text-danger"
                  type="invalid"
                >
                  Document Format should be in jpg, jpeg or png, doc, docx, xls,
                  xlsx and pdf
                </span>
              ) : null}
            </div>
            <div className="file_name_add">
              <div className="file_name_input">
                <label>Doument Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter file name"
                  value={documentName}
                  onChange={(e) => {
                    OndocumentName(e);
                  }}
                ></input>

                {customvalidated === "name is empty" ? (
                  <small className="text-danger"> Document name is empty</small>
                ) : null}
              </div>
              <div className="sumbit_btn">
                <button class="btn bg-light-blue" type="submit">
                  ADD
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="uploaded_document">
          <h3>Uploaded Document</h3>
          {getDocumentData.length === 0 ? (
            <h1 className="text-center">No record Found</h1>
          ) : (
            getDocumentData.map((item) => {
              return (
                <>
                  <div className="uploaded_file">
                    <div className="file_name">
                      {/* <img src={item.document_url} alt={"img"} /> */}
                      <span>{item.document_type}</span>
                      <p>
                        {item.document_title}.{item.document_type}
                      </p>
                    </div>
                  </div>
                </>
              );
            })
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default DoumentUpload;
