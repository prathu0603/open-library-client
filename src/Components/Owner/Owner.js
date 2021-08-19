import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

const Owner = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    category: "",
    desc: "",
    price: "",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const [imageInputState, setImageInputState] = useState("");
  const [pdfInputState, setPdfInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [PDFSource, setPDFSource] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [selectedPDF, setSelectedPDF] = useState();

  const handleImageInputChange = (e) => {
    const file = e.target.files[0];
    previewImage(file);
    setSelectedImage(file);
    setImageInputState(e.target.value);
  };
  const handlePDFInputChange = (e) => {
    const file = e.target.files[0];
    previewPDF(file);
    setSelectedPDF(file);
    setPdfInputState(e.target.value);
  };
  const previewImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const previewPDF = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPDFSource(reader.result);
    };
  };
  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource || !PDFSource) {
      window.alert("Choose A Upload File");
    }
    uploadFiles(previewSource, PDFSource);
  };

  const uploadFiles = async (base64EncodedImage, selectedPDF) => {
    try {
      const { name, desc, category, price } = user;
      if (!name || !desc || !category || !price) {
        toast("🦄 Fill all book data", {
          position: "top-right",
        });
      } else {
        setLoading(true);
        const res = await fetch(
          "https://open-library-v2.herokuapp.com/create-book",
          {
            method: "POST",
            body: JSON.stringify({
              name,
              category,
              desc,
              price,
              image: base64EncodedImage,
              pdf: selectedPDF,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        if (res.status === 200) {
          toast.success("Book Created", {
            position: "top-right",
          });
          setLoading(false);
        } else {
          toast.error("Server Error", {
            position: "top-right",
          });
          setLoading(false);
        }
      }
    } catch (err) {
      console.error(err);
      window.alert("File Upload Failed !");
      setLoading(false);
    }
  };

  return (
    <div className="owner">
      <div className="container">
        <form onSubmit={handleSubmitFile} encType="multipart/form-data">
          <label>Book Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputs}
            className="form-control shadow-none mb-3"
          />
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={user.category}
            onChange={handleInputs}
            className="form-control shadow-none mb-3"
          />
          <label>Description</label>
          <input
            type="text"
            name="desc"
            value={user.desc}
            onChange={handleInputs}
            className="form-control shadow-none mb-3"
          />
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={user.price}
            onChange={handleInputs}
            className="form-control shadow-none mb-3"
          />
          <label>Cover Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageInputChange}
            value={imageInputState}
            className="form-control shadow-none mb-3"
          />
          <label>EBook (PDF Format)</label>
          <input
            type="file"
            name="pdf"
            onChange={handlePDFInputChange}
            value={pdfInputState}
            className="form-control shadow-none mb-3"
          />
          <button className="btn btn-success" type="submit">
            {!loading && <span>Create Book</span>}
            {loading && (
              <>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Creating...
              </>
            )}
          </button>
        </form>
        {previewSource && (
          <div className="preview">
            <h1>Book Image Preview</h1>
            <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
          </div>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Owner;
