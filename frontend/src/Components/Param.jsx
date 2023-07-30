/* eslint-disable react/prop-types */
import { CloseIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import "./styleParams.css";
function Param(props) {
  return (
    <div className="paramsItem">
      <p>{props.param.name}</p>
      <Button
        className="btnDelete"
        title="Delete"
        onClick={() => props.delete(props.param._id)}
      >
        <CloseIcon color="red" />
      </Button>
    </div>
  );
}

export default Param;
