import { useState, useEffect } from "react";
import axios from "axios";

function useFetchData(jsonFile) {
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://tic-tac-toe-974b0.firebaseio.com/${jsonFile}.json`
        );
        if (mounted) {
          setData(res.data);
          setError("");
        }
      } catch (e) {
        if (mounted) {
          setError(
            `Error while fetching the ${jsonFile}.json file from the Google Cloud`
          );
          setData("");
        }
      }
    };
    fetchData();

    return () => {
      mounted = false;
    };
  }, [jsonFile]);

  return { data, error };
}

export default useFetchData;
