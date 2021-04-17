import React, { useState } from "react";
import { Tag, Space, Button, Typography, Table, Spin } from "antd";

import ApplyJob from "../components/apply-job";

const { Text } = Typography;

const Result = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);

  const columns = [
    {
      title: "Project Name",
      dataIndex: "project_name",
      key: "project_name",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Client Name",
      dataIndex: "client_name",
      key: "client_name",
      render: (text) => <Text mark>{text}</Text>,
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: "Number of Employees",
      dataIndex: "no_of_employees",
      key: "no_of_employees",
    },
    {
      title: "Experience Required",
      dataIndex: "experience",
      key: "experience",
      render: (exp) => (
        <span>
          {exp} {exp > 1 ? "years" : "year"}
        </span>
      ),
    },
    {
      title: "Skills Required",
      key: "skills",
      dataIndex: "skills",
      render: (skills) => (
        <>
          {skills.map((skill) => {
            let color = skill.length > 5 ? "geekblue" : "green";
            if (skill.toLowerCase() === "javascript") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={skill}>
                {skill.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Location",
      key: "location",
      dataIndex: "location",
      render: (locations) => (
        <>
          {locations.map((location) => {
            let color;
            switch (location.toLowerCase()) {
              case "delhi":
                color = "#f50";
                break;
              case "mumbai":
                color = "#87d068";
                break;
              case "chennai":
                color = "#108ee9";
                break;
              default:
                color = "black";
            }
            return (
              <Tag color={color} key={location}>
                {location.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => applyJob(record)}>Apply</Button>
        </Space>
      ),
    },
  ];

  const applyJob = (details) => {
    setIsModalVisible(true);
    setModalData(details);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Spin spinning={!props.data} size="large" style={{ marginTop: "10px" }}>
        <Table
          columns={columns}
          dataSource={props.data}
          size="middle"
          scroll={{ x: true }}
        />
      </Spin>
      <ApplyJob open={isModalVisible} close={hideModal} data={modalData} />
    </>
  );
};

export default Result;
