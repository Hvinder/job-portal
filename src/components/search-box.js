import React, { useState } from "react";

import { Input, DatePicker } from "antd";

const { Search } = Input;
const { RangePicker } = DatePicker;

const SearchBox = (props) => {
  const [state, setState] = useState({
    query: "",
    dateRange: "",
  });

  return (
    <div>
      <Search
        placeholder="Search by Projecy name / Client name / Skills / Location"
        enterButton="Search"
        size="large"
        value={state.query}
        onChange={(e) => setState({ ...state, query: e.target.value })}
        onSearch={() => props.search(state)}
      />
      <RangePicker
        style={{ marginTop: "10px", marginBottom: "10px" }}
        onChange={(date, dateString) =>
          setState({ ...state, dateRange: dateString })
        }
        value={state.fromDate}
      />
    </div>
  );
};

export default SearchBox;
