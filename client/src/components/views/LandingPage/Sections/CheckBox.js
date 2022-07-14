import { Checkbox, Collapse } from "antd";
import React, { useState } from "react";

const { Panel } = Collapse;

function CheckBox(props) {
  const [checked, setChecked] = useState([]);

  const handleToggle = (value) => {
    console.log(value);
    //누른 것의 Index를 구하고
    const currentIndex = checked.indexOf(value);

    //checked된 state에서 현재 누른 chedckbox가 이미 있다면
    const newChedcked = [...checked];

    // state 넣어준다.
    if (currentIndex === -1) {
      newChedcked.push(value);

      //빼주고
    } else {
      newChedcked.splice(currentIndex, 1);
    }

    setChecked(newChedcked);
    props.handleFilters(newChedcked);
  };

  const renderCheckboxLists = () =>
    props.list &&
    props.list.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox
          onChange={() => handleToggle(value._id)}
          checked={checked.indexOf(value._id) === -1 ? false : true}
        />
        <span>{value.name}</span>
      </React.Fragment>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="This is panel header 1" key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
