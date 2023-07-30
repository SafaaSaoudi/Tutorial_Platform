import { useState } from "react";
import Params from "./Params";
import ParamsForm from "./ParamsForm";
import "./styleParams.css";

function ParamsContainer() {
  const [value, setValue] = useState(false);
  const updateValue = (value) => setValue(value);
  
  return (
    <div className="ParamsContainer">
      <ParamsForm value={value} updateValue={updateValue} />
      <Params value={value} />
    </div>
  );
}

export default ParamsContainer;
