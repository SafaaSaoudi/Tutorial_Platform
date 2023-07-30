/* eslint-disable react/prop-types */
import { ChakraProvider, Input, Button } from "@chakra-ui/react";
import "./styleParams.css";
import { useState } from "react";
import { addParams } from "../service/api";

function ParamsForm(props) {
  const [name, setName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { name: name };
      await addParams(formData);
      setName("");
      props.updateValue(!props.value);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <ChakraProvider>
      <form onSubmit={handleSubmit} className="formparams">
        <Input
          required
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Parameter Name"
        />
        <Button colorScheme="green" type="submit">
          Submit
        </Button>
      </form>
    </ChakraProvider>
  );
}

export default ParamsForm;
