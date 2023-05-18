import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

const AddStudentForm = () => {
  const [form] = Form.useForm();

  const handleFormSubmit = (values) => {
    // Retrieve existing student data from local storage
    const students = JSON.parse(localStorage.getItem('students')) || [];

    // Generate a unique ID for the new student
    const id = students.length > 0 ? students[students.length - 1].id + 1 : 1;

    // Create the new student object
    const newStudent = { id, ...values };

    // Update the student data in local storage
    localStorage.setItem('students', JSON.stringify([...students, newStudent]));

    // Reset the form fields
    form.resetFields();
  };

  return (
    <div>
      <h2>Add Student</h2>
      <Form form={form} onFinish={handleFormSubmit}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="age" label="Age" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        {/* Add more form fields as needed */}
        <Button type="primary" htmlType="submit">
          Add Student
        </Button>
      </Form>
    </div>
  );
};

export default AddStudentForm;