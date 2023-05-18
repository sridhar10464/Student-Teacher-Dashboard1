import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

const AddTeacherForm = () => {
  const [form] = Form.useForm();

  const handleFormSubmit = (values) => {
    // Retrieve existing teacher data from local storage
    const teachers = JSON.parse(localStorage.getItem('teachers')) || [];

    // Generate a unique ID for the new teacher
    const id = teachers.length > 0 ? teachers[teachers.length - 1].id + 1 : 1;

    // Create the new teacher object
    const newTeacher = { id, ...values };

    // Update the teacher data in local storage
    localStorage.setItem('teachers', JSON.stringify([...teachers, newTeacher]));

    // Reset the form fields
    form.resetFields();
  };

  return (
    <div>
      <h2>Add Teacher</h2>
      <Form form={form} onFinish={handleFormSubmit}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="subject" label="Subject" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        {/* Add more form fields as needed */}
        <Button type="primary" htmlType="submit">
          Add Teacher
        </Button>
      </Form>
    </div>
  );
};

export default AddTeacherForm;