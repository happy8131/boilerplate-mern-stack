import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon, Col, Card, Row, Carousel } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../Utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import { continents } from "./Sections/Datas";
function LandingPage() {
  const [products, setProducts] = useState([]);
  const [skips, setSkip] = useState(0);
  const [limits, setLimit] = useState(8);
  const [postSize, setPostSize] = useState(0);
  const [filters, setFilters] = useState({
    continents: [],
    price: [],
  });

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
    };

    getProducts(body);
    setSkip(skip);
  };

  const renderCards = products.map((product, idx) => {
    return (
      <Col key={idx} lg={6} md={8} xs={24}>
        <Card cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={`$${product.description}`} />
        </Card>
      </Col>
    );
  });

  const showFilteredResults = (filter) => {
    let body = {
      skip: 0,
      limit: limits,
      filter,
    };

    getProducts(body);
    setSkip(0);
  };

  const handleFilters = (filter, category) => {
    const newFilters = { ...filters };

    newFilters[category] = filter;

    showFilteredResults(newFilters);
  };

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Let's Travel Anywhere <Icon type="rocket" />
        </h2>
      </div>

      <CheckBox
        list={continents}
        handleFilters={(filters) => handleFilters(filters, "continents")}
      />

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
