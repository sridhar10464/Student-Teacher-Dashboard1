import React, { useState } from 'react';
import { Layout, Menu, Table, Modal, Form, Input, Button, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const { Header, Content } = Layout;

// Mock data
const initialStudents = [
  { id: 1, name: 'John Doe', age: 20, grade: 'A' },
  { id: 2, name: 'Jane Smith', age: 22, grade: 'B' },
];

const initialTeachers = [
  { id: 1, name: 'Mr. Johnson', subject: 'Math' },
  { id: 2, name: 'Ms. Davis', subject: 'Science' },
];

// Form validation schemas
const studentValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  age: Yup.number().required('Age is required').positive('Age must be a positive number'),
  grade: Yup.string().required('Grade is required'),
});

const teacherValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  subject: Yup.string().required('Subject is required'),
});

const AdminDashboard = () =>
{
    const [students, setStudents] = useState(initialStudents);
    const [teachers, setTeachers] = useState(initialTeachers);
    const [isStudentModalVisible, setIsStudentModalVisible] = useState(false);
    const [isTeacherModalVisible, setIsTeacherModalVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    // Formik form configuration for students
    const studentFormik = useFormik({
        initialValues: {
            name: '',
            age: '',
            grade: '',
        },
        validationSchema: studentValidationSchema,
        onSubmit: (values, { resetForm }) =>
        {
            if (selectedStudent) {
                // Update existing student
                const updatedStudents = students.map((student) =>
                    student.id === selectedStudent.id ? { ...student, ...values } : student
                );
                setStudents(updatedStudents);
                setSelectedStudent(null);
            } else {
                // Add new student
                const newStudent = {
                    id: Date.now(),
                    ...values,
                };
                setStudents([...students, newStudent]);
            }
            resetForm();
            setIsStudentModalVisible(false);
        },
    });

    // Formik form configuration for teachers
    const teacherFormik = useFormik({
        initialValues: {
            name: '',
            subject: '',
        },
        validationSchema: teacherValidationSchema,
        onSubmit: (values, { resetForm }) =>
        {
            if (selectedTeacher) {
                // Update existing teacher
                const updatedTeachers = teachers.map((teacher) =>
                    teacher.id === selectedTeacher.id ? { ...teacher, ...values } : teacher
                );
                setTeachers(updatedTeachers);
                setSelectedTeacher(null);
            } else {
                // Add new teacher
                const newTeacher = {
                    id: Date.now(),
                    ...values,
                };
                setTeachers([...teachers, newTeacher]);
            }
            resetForm();
            setIsTeacherModalVisible(false);
        },
    });

    const handleEditStudent = (student) =>
    {
        setSelectedStudent(student);
        studentFormik.setValues(student);
        setIsStudentModalVisible(true);
    };

    const handleDeleteStudent = (studentId) =>
    {
        const updatedStudents = students.filter((student) => student.id !== studentId);
        setStudents(updatedStudents);
    };
    
    const handleEditTeacher = (teacher) =>
    {
        setSelectedTeacher(teacher);
        teacherFormik.setValues(teacher);
        setIsTeacherModalVisible(true);
    };
    
    const handleDeleteTeacher = (teacherId) =>
    {
        const updatedTeachers = teachers.filter((teacher) => teacher.id !== teacherId);
        setTeachers(updatedTeachers);
    };
    
    const studentColumns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Age', dataIndex: 'age', key: 'age' },
        { title: 'Grade', dataIndex: 'grade', key: 'grade' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, student) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleEditStudent(student)}
                    />
                    <Button
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteStudent(student.id)}
                    />
                </Space>
            ),
        },
    ];
    
    const teacherColumns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Subject', dataIndex: 'subject', key: 'subject' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, teacher) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleEditTeacher(teacher)}
                    />
                    <Button
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteTeacher(teacher.id)}
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
                </Menu>
            </Header>
            <Content style={{ padding: '50px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsStudentModalVisible(true)}
                    >
                        Add Student
                    </Button>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsTeacherModalVisible(true)}
                        style={{ marginLeft: '10px' }}
                    >
                        Add Teacher
                    </Button>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <Table dataSource={students} columns={studentColumns} />
                </div>
                <div>
                    <Table dataSource={teachers} columns={teacherColumns} />
                </div>
            </Content>
            <Modal
                title={selectedStudent ? 'Edit Student' : 'Add Student'}
                visible={isStudentModalVisible}
                onCancel={() =>
                {
                    setSelectedStudent(null);
                    setIsStudentModalVisible(false);
                    studentFormik.resetForm();
                }}
                footer={[
                    <Button key="cancel" onClick={() => setIsStudentModalVisible(false)}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={studentFormik.handleSubmit}
                        loading={studentFormik.isSubmitting}
                    >
                        {selectedStudent ? 'Update' : 'Save'}
                    </Button>,
                ]}
            >
                <Form layout="vertical">
                    <Form.Item label="Name">
                        <Input
                            name="name"
                            value={studentFormik.values.name}
                            onChange={studentFormik.handleChange}
                            onBlur={studentFormik.handleBlur}
                        />
                        {studentFormik.touched.name && studentFormik.errors.name && (
                            <div style={{ color: 'red' }}>{studentFormik.errors.name}</div>
                        )}
                    </Form.Item>
                    <Form.Item label="Age">
                        <Input
                            name="age"
                            value={studentFormik.values.age}
                            onChange={studentFormik.handleChange}
                            onBlur={studentFormik.handleBlur}
                        />
                        {studentFormik.touched.age && studentFormik.errors.age && (
                            <div style={{ color: 'red' }}>{studentFormik.errors.age}</div>
                        )}
                    </Form.Item>
                    <Form.Item label="Grade">
                        <Input
                            name="grade"
                            value={studentFormik.values.grade}
                            onChange={studentFormik.handleChange}
                            onBlur={studentFormik.handleBlur}
                        />
                        {studentFormik.touched.grade && studentFormik.errors.grade && (
                            <div style={{ color: 'red' }}>{studentFormik.errors.grade}</div>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title={selectedTeacher ? 'Edit Teacher' : 'Add Teacher'}
                visible={isTeacherModalVisible}
                onCancel={() =>
                {
                    setSelectedTeacher(null);
                    setIsTeacherModalVisible(false);
                    teacherFormik.resetForm();
                }}
                footer={[
                    <Button key="cancel" onClick={() => setIsTeacherModalVisible(false)}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={teacherFormik.handleSubmit}
                        loading={teacherFormik.isSubmitting}
                    >
                        {selectedTeacher ? 'Update' : 'Save'}
                    </Button>,
                ]}
            >
                <Form layout="vertical">
                    <Form.Item label="Name">
                        <Input
                            name="name"
                            value={teacherFormik.values.name}
                            onChange={teacherFormik.handleChange}
                            onBlur={teacherFormik.handleBlur}
                        />
                        {teacherFormik.touched.name && teacherFormik.errors.name && (
                            <div style={{ color: 'red' }}>{teacherFormik.errors.name}</div>
                        )}
                    </Form.Item>
                    <Form.Item label="Subject">
                        <Input
                            name="subject"
                            value={teacherFormik.values.subject}
                            onChange={teacherFormik.handleChange}
                            onBlur={teacherFormik.handleBlur}
                        />
                        {teacherFormik.touched.subject && teacherFormik.errors.subject && (
                            <div style={{ color: 'red' }}>{teacherFormik.errors.subject}</div>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};
    
    export default AdminDashboard;