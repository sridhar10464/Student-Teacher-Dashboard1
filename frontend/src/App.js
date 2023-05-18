import React from 'react';
import { Layout, Menu } from 'antd';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import TeacherList from './components/TeacherList';
import AddStudentForm from './components/AddStudentForm';
import AddTeacherForm from './components/AddTeacherForm';

const { Content, Header } = Layout;

const App = () => {

  return (
    <BrowserRouter>
       
      <Layout style={{ minHeight: '100vh' }}>
        {/* Navbar */}
        <Header>
          {/* <h1 style={{ color: 'white' }}>Admin Dashboard</h1> */}
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/students">Students</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/students/add">Create Student</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/teachers">Teachers</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/teachers/add">Create Teacher</Link>
            </Menu.Item>
          </Menu>
        </Header>

       {/* Main Content */}
        <Layout.Content style={{ padding: '24px' }}>
          <Content>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<StudentList />} />
              <Route path="/teachers" element={<TeacherList />} />
              <Route path="/students/add" element={<AddStudentForm />} />
              <Route path="/teachers/add" element={<AddTeacherForm />} />
            </Routes>
          </Content>
        </Layout.Content>
      </Layout>
    </BrowserRouter>
  );
};

export default App;