import { Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";

function DetailProductPage(props) {
  const productId = props.match.params.productId;
  const [Product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then((res) => {
        setProduct(res.data[0]);
      })
      .catch((err) => alert(err));
  }, []);
  console.log(Product);
  return (
    <div style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Product.title}</h1>
      </div>

      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          {/*ProductImage*/}
          <ProductImage detail={Product} />
        </Col>
        <Col lg={12} sm={24}>
          {/* ProductInfo*/}
          <ProductInfo detail={Product} />
        </Col>
      </Row>

      <br />
    </div>
  );
}

export default DetailProductPage;
