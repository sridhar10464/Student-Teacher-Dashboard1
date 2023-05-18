import React, { useState } from 'react';
import { Layout, Menu, Table, Modal, Form, Input, Button, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const { Header, Content } = Layout;

// Mock data
const initialStudents = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

const initialTeachers = [
  { id: 1, name: 'Michael Brown', email: 'michael@example.com' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com' },
];

// Form validation schemas
const studentValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const teacherValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const AdminDashboard = () =>
{
    const [students, setStudents] = useState(initialStudents);
    const [teachers, setTeachers] = useState(initialTeachers);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [selectedDataType, setSelectedDataType] = useState(null);

    // Formik form configuration
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
        },
        validationSchema: selectedDataType === 'student' ? studentValidationSchema : teacherValidationSchema,
        onSubmit: (values, { resetForm }) =>
        {
            if (selectedData) {
                // Update existing data
                if (selectedDataType === 'student') {
                    const updatedStudents = students.map((student) =>
                        student.id === selectedData.id ? { ...student, ...values } : student
                    );
                    setStudents(updatedStudents);
                } else {
                    const updatedTeachers = teachers.map((teacher) =>
                        teacher.id === selectedData.id ? { ...teacher, ...values } : teacher
                    );
                    setTeachers(updatedTeachers);
                }
                setSelectedData(null);
            } else {
                // Add new data
                const newData = {
                    id: Date.now(),
                    ...values,
                };
                if (selectedDataType === 'student') {
                    setStudents([...students, newData]);
                } else {
                    setTeachers([...teachers, newData]);
                }
            }
            resetForm();
            setIsModalVisible(false);
        },
    });

    const handleEdit = (data, dataType) =>
    {
        setSelectedData(data);
        setSelectedDataType(dataType);
        formik.setValues(data);
        setIsModalVisible(true);
    };

    const handleDelete = (dataId, dataType) =>
    {
        if (dataType === 'student') {
            const updatedStudents = students.filter((student) => student.id !== dataId);
            setStudents(updatedStudents);
        } else {
            const updatedTeachers = teachers.filter((teacher) => teacher.id !== dataId);
            setTeachers(updatedTeachers);
        }
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, data) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(data, selectedDataType)}
                    />
                    <Button
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(data.id, selectedDataType)}
                    />
                </Space>
            ),
        },
    ];
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">Home</Menu.Item>
                    <Menu.Item key="2" onClick={() => setSelectedDataType('student')}>
                        Students
                    </Menu.Item>
                    <Menu.Item key="3" onClick={() => setSelectedDataType('teacher')}>
                        Teachers
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '50px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsModalVisible(true)}
                    >
                        Add {selectedDataType === 'student' ? 'Student' : 'Teacher'}
                    </Button>
                </div>
                <Table
                    dataSource={selectedDataType === 'student' ? students : teachers}
                    columns={columns}
                />
            </Content>
            <Modal
                title={selectedData ? `Edit ${ selectedDataType }` : `Add ${ selectedDataType }`}
                visible={isModalVisible}
                onCancel={() =>
                {
                    setSelectedData(null);
                    setSelectedDataType(null);
                    setIsModalVisible(false);
                    formik.resetForm();
                }}
                footer={[
                    <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={formik.handleSubmit}
                        loading={formik.isSubmitting}
                    >
                        {selectedData ? 'Update' : 'Save'}
                    </Button>,
                ]}
            >
                <Form layout="vertical">
                    <Form.Item label="Name">
                        <Input
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <div style={{ color: 'red' }}>{formik.errors.name}</div>
                        )}
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div style={{ color: 'red' }}>{formik.errors.email}</div>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

export default AdminDashboard;