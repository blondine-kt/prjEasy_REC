import React, { useEffect, useState } from "react";

const useFetchData = (url) => {
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      await fetch(url)
        .then((res) => {
          if (res.ok) {
            res.json().then((data) => {
                console.log(data)
              Array.isArray ? setdata(data) : setdata([data]);
              setIsLoading(false);
            });
          }
        })
        .catch((e) => console.log(e));
    };
    getData();
  }, []);
  return [data, isLoading, setdata];
};

export default useFetchData;