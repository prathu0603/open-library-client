import React, { useState, useEffect } from "react";
import Cards from "./Cards/Cards";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "./style.css";

const Mainpage = () => {
  // const data = [
  //   {
  //     title: "Bhagavad Gita",
  //     category: "holy",
  //     desc: "The Shrimad Bhagavad Gita, often referred to as the Gita, is a 700-verse Hindu scripture that is part of the epic Mahabharata",
  //     image:
  //       "https://1.bp.blogspot.com/-sceyhS7EwMY/XvH3C0PqroI/AAAAAAAAA5E/FRlgR4VfC0QqRUJW7yhMtnt0J4UWtX_SgCLcBGAsYHQ/s640/shrimad%2Bbhagwat%2Bgeeta.png",
  //     price: "501",
  //   },
  //   {
  //     title: "Bhagavad Gita",
  //     category: "adventure",
  //     desc: "The Shrimad Bhagavad Gita, often referred to as the Gita, is a 700-verse Hindu scripture that is part of the epic Mahabharata",
  //     image:
  //       "https://new-img.patrika.com/upload/2019/06/21/1_16_4737955_835x547-m.jpg",
  //     price: "501",
  //   },
  //   {
  //     title: "Bhagavad Gita",
  //     category: "action",
  //     desc: "The Shrimad Bhagavad Gita, often referred to as the Gita, is a 700-verse Hindu scripture that is part of the epic Mahabharata",
  //     image:
  //       "https://new-img.patrika.com/upload/2019/06/21/1_16_4737955_835x547-m.jpg",
  //     price: "501",
  //   },
  //   {
  //     title: "Bhagavad Gita",
  //     category: "classic",
  //     desc: "The Shrimad Bhagavad Gita, often referred to as the Gita, is a 700-verse Hindu scripture that is part of the epic Mahabharata",
  //     image:
  //       "https://new-img.patrika.com/upload/2019/06/21/1_16_4737955_835x547-m.jpg",
  //     price: "501",
  //   },
  //   {
  //     title: "Bhagavad Gita",
  //     category: "holy",
  //     desc: "The Shrimad Bhagavad Gita, often referred to as the Gita, is a 700-verse Hindu scripture that is part of the epic Mahabharata",
  //     image:
  //       "https://new-img.patrika.com/upload/2019/06/21/1_16_4737955_835x547-m.jpg",
  //     price: "501",
  //   },
  //   {
  //     title: "Bhagavad Gita",
  //     category: "holy",
  //     desc: "The Shrimad Bhagavad Gita, often referred to as the Gita, is a 700-verse Hindu scripture that is part of the epic Mahabharata",
  //     image:
  //       "https://new-img.patrika.com/upload/2019/06/21/1_16_4737955_835x547-m.jpg",
  //     price: "501",
  //   },
  //   {
  //     title: "Bhagavad Gita",
  //     category: "holy",
  //     desc: "The Shrimad Bhagavad Gita is a 700-verse Hindu scripture that is part of the epic Mahabharata",
  //     image:
  //       "https://new-img.patrika.com/upload/2019/06/21/1_16_4737955_835x547-m.jpg",
  //     price: "501",
  //   },
  // ];
  const [bookData, setBookData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [item, setItem] = useState([]);

  useEffect(async () => {
    try {
      const res = await fetch("https://open-library-v2.herokuapp.com/books");
      const data = await res.json();
      await setBookData(data);
      await setFilterData(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Select Animation Package
  const animatedComponents = makeAnimated();
  const options = [
    { value: "FANTASY", label: "FANTASY" },
    { value: "THRILLER", label: "THRILLER" },
    { value: "Holy", label: "Holy" },
    { value: "SCIENCE FICTION", label: "SCIENCE FICTION" },
    { value: "NON-FICTION", label: "NON-FICTION" },
    { value: "MYSTERY", label: "MYSTERY" },
  ];

  // Selected Options Form Drop down
  const filter = (e) => {
    const a = e.map((x) => x.value);
    // console.log(a);
    setItem(a);
  };

  // Filtering Cards

  useEffect(() => {
    if (item.length > 0) {
      let abc = [];
      item.map((category) => {
        abc = abc.concat(
          bookData.filter(
            (matchCategory) => category === matchCategory.category
          )
        );
        console.log(abc);
      });
      setFilterData(abc);
      // setTimeout(() => setFilterData(abc), 1000);
    } else setFilterData(bookData);
  }, [item]);

  // console.log(item);
  // console.log(filterData);
  // console.log(bookData);

  return (
    <div className="books-wraper">
      {!bookData ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="select ">
            <Select
              closeMenuOnSelect={true}
              components={animatedComponents}
              isMulti
              options={options}
              placeholder="Select catergory"
              onChange={filter}
            />
          </div>
          <div className="cards-wraper">
            {filterData.map((book, index) => (
              <Cards
                key={index}
                title={book.name}
                category={book.category}
                desc={book.desc}
                img={book.image}
                price={book.price}
                pdf={book.pdf}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Mainpage;
