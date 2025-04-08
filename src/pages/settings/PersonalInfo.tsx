import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useStore } from '../../hooks/useStore';
import '../../styles/pages/settings/PersonalInfo.css';

const PersonalInfo = () => {
  const navigate = useNavigate();
  const { user } = useStore();

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <div className="personal-info">
      <div className="page-header">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/settings')}
          type="text"
        />
        <h1>Shaxsiy ma'lumotlar</h1>
      </div>

      <div className="form-container">
        <Form
          layout="vertical"
          initialValues={user?.data || {}}
          onFinish={onFinish}
        >
          <Form.Item
            label="Ism"
            name="full_name"
            rules={[{ required: true, message: 'Iltimos, ismingizni kiriting' }]}
          >
            <Input placeholder="Ismingizni kiriting" />
          </Form.Item>

          <Form.Item
            label="Telefon raqam"
            name="phone"
            rules={[{ required: true, message: 'Iltimos, telefon raqamingizni kiriting' }]}
          >
            <Input placeholder="+998 __ ___ __ __" />
          </Form.Item>

          <Form.Item
            label="Login"
            name="login"
            rules={[{ required: true, message: 'Iltimos, loginingizni kiriting' }]}
          >
            <Input placeholder="Loginingizni kiriting" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="submit-button">
              Saqlash
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default PersonalInfo; 