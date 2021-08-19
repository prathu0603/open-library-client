import React from "react";
import { FiDownloadCloud } from "react-icons/fi";
import "./style.css";

const Cards = ({ title, desc, category, img, price, pdf }) => {
  return (
    <div className="project-card">
      <div class="product-img">
        <img src={img} />
      </div>
      <div class="product-info">
        <div class="product-text">
          <h1 className="title">{title}</h1>
          <h3 className="catergory">{category}</h3>
          <div className="desc-box">
            <p className="desc">{desc}</p>
          </div>
        </div>
        <div class="product-price-btn">
          <div>
            ₹<span> {price}</span>
          </div>
          <button
            onClick={() => (window.location.href = pdf)}
            className="card-btn"
          >
            <FiDownloadCloud />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
