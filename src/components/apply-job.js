import React, { useState } from "react";
import { Modal, Form, Input, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const ApplyJob = (props) => {
  const [state, setState] = useState({
    skills: [],
    inputVisible: false,
    inputValue: "",
  });

  const handleTagClose = (removedTag) => {
    const tags = state.skills.filter((tag) => tag !== removedTag);
    setState({ ...state, skills: tags });
  };

  const showInput = () => {
    setState({ ...state, inputVisible: true });
    setTimeout(() => {
      document.querySelector("#inputReference").focus();
    }, 200);
  };

  const handleInputChange = (e) => {
    setState({ ...state, inputValue: e.target.value });
  };

  const handleInputConfirm = () => {
    const { inputValue } = state;
    let { skills } = state;
    if (inputValue && skills.indexOf(inputValue) === -1) {
      skills = [...skills, inputValue];
    }
    setState({
      skills,
      inputVisible: false,
      inputValue: "",
    });
  };

  const forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleTagClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: "inline-block" }}>
        {tagElem}
      </span>
    );
  };

  const skillChild = state.skills.map(forMap);

  const skillEl = (
    <>
      <div style={{ marginBottom: 16 }}>{skillChild}</div>
      {state.inputVisible && (
        <Input
          id="inputReference"
          type="text"
          size="small"
          style={{ width: 78 }}
          value={state.inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!state.inputVisible && (
        <Tag
          onClick={showInput}
          style={{ background: "#fff", borderStyle: "dashed" }}
        >
          <PlusOutlined /> New Skill
        </Tag>
      )}
    </>
  );

  const [form] = Form.useForm();

  return (
    <Modal
      title={`${props.data?.project_name} | ${props.data?.client_name}`}
      visible={props.open}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            setState({ ...state, skills: [] });
            console.log("form validated!");
            props.close();
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      onCancel={props.close}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please enter your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="experience"
          label="Years of Experience"
          rules={[
            {
              required: true,
              message: "Please enter your experience!",
            },
            {
              validator: (_, value) =>
                value >= props.data.experience || !value
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("You don't have enough experience!")
                    ),
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="location"
          label="Current location"
          rules={[
            {
              required: true,
              message: "Please enter your location!",
            },
            {
              validator: (_, value) =>
                (value && props.data.location.includes(value.toLowerCase())) ||
                !value
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("Job location doen't match your preferance!")
                    ),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="skills" label="Skills">
          {skillEl}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ApplyJob;
