/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { deleteParams, getParams } from "../service/api";
import Param from "./Param";
import { Spinner } from "@chakra-ui/react";

function Params(props) {
  const [params, setParams] = useState([]);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fetchParams = () => {
    setTimeout(() => {
      getParams()
        .then((Response) => {
          setParams(Response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    },500);
  };
  useEffect(() => fetchParams(), [shouldRefetch, props.value]);

  const deleteP = async (id) => {
    try {
      await deleteParams(id);
      setShouldRefetch(!shouldRefetch);
    } catch (error) {
      console.log("error deleting", error);
    }
  };
  return (
    <div className="paramsList">
      {isLoading ? (
        <Spinner className="spinner" color="lightgreen" speed="1s" emptyColor="lightgrey" thickness="2px"/>
      ) : params.length !== 0 ? (
        params.map((e) => <Param key={e._id} param={e} delete={deleteP} />)
      ) : (
        <p>No Parameters Found</p>
      )}
    </div>
  );
}

export default Params;
