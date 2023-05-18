import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';

const TeacherList = () => {
  const [teachers, setTeachers] = useState(JSON.parse(localStorage.getItem('teachers')) || []);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedTeacher, setEditedTeacher] = useState(null);

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Subject', dataIndex: 'subject' },
    { 
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, teacher) => (
        <>
          <Button type="primary" onClick={() => editTeacher(teacher)}>Edit</Button>
          <Button type="danger" onClick={() => deleteTeacher(teacher.id)}>Delete</Button>
        </>
      ),
    },
  ];

  const deleteTeacher = (id) => {
    const updatedTeachers = teachers.filter((teacher) => teacher.id !== id);
    localStorage.setItem('teachers', JSON.stringify(updatedTeachers));
    setTeachers(updatedTeachers);
  };

  const editTeacher = (teacher) => {
    setEditedTeacher(teacher);
    setIsModalVisible(true);
  };

  const handleFormSubmit = (values) => {
    const updatedTeachers = teachers.map((teacher) => {
      if (teacher.id === editedTeacher.id) {
        return { ...teacher, ...values };
      }
      return teacher;
    });

    localStorage.setItem('teachers', JSON.stringify(updatedTeachers));
    setTeachers(updatedTeachers);
    setIsModalVisible(false);
    setEditedTeacher(null);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditedTeacher(null);
  };

  return (
    <div>
      <h2>Teacher List</h2>
      <Table dataSource={teachers} columns={columns} />

      <Modal
        title="Edit Teacher"
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form onFinish={handleFormSubmit} initialValues={editedTeacher}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="subject" label="Subject" rules={[{ required: true }]}>
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

export default TeacherList;