import { Checkbox, Collapse } from "antd";
import React, { useState } from "react";

const { Panel } = Collapse;

function CheckBox(props) {
  const [checked, setChecked] = useState([]);

  const handleToggle = (value) => {
    console.log(value);
    //누른 것의 Index를 구하고
    const currentIndex = checked.indexOf(value); //-1이리먄 누른 값이 없는 거다
    console.log(currentIndex);
    //checked된 state에서 현재 누른 chedckbox가 이미 있다면
    const newChedcked = [...checked];
    console.log(newChedcked);
    // state 넣어준다. 없기때문에 넣어준다
    if (currentIndex === -1) {
      newChedcked.push(value);

      //빼주고 이미있다면
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
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Continents" key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
