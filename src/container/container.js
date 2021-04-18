import React, { useEffect, useState } from "react";
import axios from "axios";

import SearchBox from "../components/search-box";
import Result from "../components/result";
import { API_URL } from "../constants";

const Container = () => {
  const [jobsData, setJobsData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!jobsData) {
      setLoading(true);
      axios
        .get(API_URL)
        .then((data) => {
          setJobsData(data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [jobsData]);

  const fetchJobs = (query) => {
    setLoading(true);
    axios
      .post(API_URL, query)
      .then((data) => {
        setJobsData(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <SearchBox search={(query) => fetchJobs(query)} />
      <Result data={jobsData} loading={loading} />
    </>
  );
};

export default Container;
