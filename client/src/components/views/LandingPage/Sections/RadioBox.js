import React, { useState } from "react";
import { Checkbox, Collapse, Radio } from "antd";
const { Panel } = Collapse;

function RadioBox(props) {
  const [value, setValue] = useState(0);

  const renderRadioBox = () =>
    props.list &&
    props.list.map((value) => (
      <Radio key={value._id} value={value._id}>
        {value.name}{" "}
      </Radio>
    ));

  const handleChanger = (e) => {
    setValue(e.target.value);
    props.handleFilters(e.target.value);
  };

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Price" key="1">
          <Radio.Group onChange={handleChanger} value={value}>
            {renderRadioBox()}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
}

export default RadioBox;
