import React, { useEffect, useState } from "react";
import axios from "axios";

import SearchBox from "../components/search-box";
import Result from "../components/result";
import { data } from "../constants";

const Container = () => {
  const [jobsData, setJobsData] = useState(null);

  useEffect(() => {
    if (!jobsData) {
      setTimeout(() => {
        setJobsData(data);
      }, 2000);
    }
  }, [jobsData]);

  const fetchJobs = (query) => {
    console.log(query);
    // axios.get("");
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <SearchBox search={(query) => fetchJobs(query)} />
      <Result data={jobsData} />
    </div>
  );
};

export default Container;
