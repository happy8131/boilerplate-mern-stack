import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon, Col, Card, Row, Carousel } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../Utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import { continents, price } from "./Sections/Datas";
import RadioBox from "./Sections/RadioBox";
import Searchfeature from "./Sections/Searchfeature";
function LandingPage() {
  const [products, setProducts] = useState([]);
  const [skips, setSkip] = useState(0);
  const [limits, setLimit] = useState(8);
  const [postSize, setPostSize] = useState(0);

  const [filters, setFilters] = useState({
    continents: [],
    price: [],
  });
  const [SearchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let body = {
      skip: skips,
      limit: limits,
    };

    getProducts(body);
  }, []);

  const getProducts = (body) => {
    axios.post("api/product/products", body).then((res) => {
      if (res.data.success) {
        if (body.loadMore) {
          setProducts([...products, ...res.data.productInfo]);
        } else {
          setProducts(res.data.productInfo);
        }
        setPostSize(res.data.postSize);
      } else {
        alert("상품들을 가져오는데 실패 했습니다");
      }
    });
  };

  const loadMoreHandler = () => {
    let skip = skips + limits;

    let body = {
      skip: skip,
      limit: limits,
      loadMore: true,
      filters: filters,
    };

    getProducts(body);
    setSkip(skip);
  };

  const renderCards = products.map((product, idx) => {
    return (
      <Col key={idx} lg={6} md={8} xs={24}>
        <Card
          cover={
            <a href={`/product/${product._id}`}>
              <ImageSlider images={product.images} />
            </a>
          }
        >
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  const showFilteredResults = (filters) => {
    let body = {
      skip: 0,
      limit: limits,
      filters: filters,
    };

    getProducts(body);
    setSkip(0);
  };

  const handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value._id, 10)) {
        array = data[key].array;
      }
    }

    return array;
  };

  const handleFilters = (filter, category) => {
    const newFilters = { ...filters };

    newFilters[category] = filter;

    if (category === "price") {
      let priceValues = handlePrice(filter);
      newFilters[category] = priceValues;
    }
    console.log(filter);

    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  const updateSearchTerm = (newSearchTerm) => {
    let body = {
      skip: 0,
      limit: limits,
      filters: filters,
      searchTerm: newSearchTerm,
    };
    setSkip(0);
    setSearchTerm(newSearchTerm);
    getProducts(body);
  };

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Let's Travel Anywhere <Icon type="rocket" />
        </h2>
      </div>

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <CheckBox
            list={continents}
            handleFilters={(filters) => handleFilters(filters, "continents")}
          />
        </Col>

        <Col lg={12} xs={24}>
          <RadioBox
            list={price}
            handleFilters={(filters) => handleFilters(filters, "price")}
          />
        </Col>
      </Row>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto",
        }}
      >
        <Searchfeature refreshFunction={updateSearchTerm} />
      </div>

      <Row gutter={[16, 16]}>{renderCards}</Row>

      <br />

      {postSize >= limits && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={loadMoreHandler}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
