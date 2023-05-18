import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';

const StudentList = () => {
  const [students, setStudents] = useState(JSON.parse(localStorage.getItem('students')) || []);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedStudent, setEditedStudent] = useState(null);

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Age', dataIndex: 'age' },
    { 
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, student) => (
        <>
          <Button type="primary" onClick={() => editStudent(student)}>Edit</Button>
          <Button type="danger" onClick={() => deleteStudent(student.id)}>Delete</Button>
        </>
      ),
    },
  ];

  const deleteStudent = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    setStudents(updatedStudents);
  };

  const editStudent = (student) => {
    setEditedStudent(student);
    setIsModalVisible(true);
  };

  const handleFormSubmit = (values) => {
    const updatedStudents = students.map((student) => {
      if (student.id === editedStudent.id) {
        return { ...student, ...values };
      }
      return student;
    });

    localStorage.setItem('students', JSON.stringify(updatedStudents));
    setStudents(updatedStudents);
    setIsModalVisible(false);
    setEditedStudent(null);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditedStudent(null);
  };

  return (
    <div>
      <h2>Student List</h2>
      <Table dataSource={students} columns={columns} />

      <Modal
        title="Edit Student"
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form onFinish={handleFormSubmit} initialValues={editedStudent}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="age" label="Age" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentList;