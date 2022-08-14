import React, { useState } from "react";

function Searchfeature(props) {
  const [SearchTerm, setSearchTerm] = useState("");

  const searchHandler = (e) => {
    setSearchTerm(e.currentTarget.value);
    props.refreshFunction(e.currentTarget.value); //부모에게 전달
  };
  return (
    <div>
      <input
        type="text"
        placeholder="search"
        onChange={searchHandler}
        value={SearchTerm}
      />
    </div>
  );
}

export default Searchfeature;
