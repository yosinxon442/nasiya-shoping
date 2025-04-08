import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Form, Input, Rate, message } from 'antd';
import '../../styles/pages/settings/Feedback.css';

const { TextArea } = Input;

const Feedback = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log('Feedback:', values);
    message.success("Fikr-mulohazangiz uchun rahmat!");
    navigate('/settings');
  };

  return (
    <div className="feedback-page">
      <div className="page-header">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/settings')}
          type="text"
        />
        <h1>Taklif va fikrlar</h1>
      </div>

      <div className="feedback-content">
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ rating: 5 }}
        >
          <Form.Item
            name="rating"
            label="Dasturni baholang"
          >
            <Rate />
          </Form.Item>

          <Form.Item
            name="title"
            label="Mavzu"
            rules={[{ required: true, message: 'Iltimos, mavzuni kiriting' }]}
          >
            <Input placeholder="Mavzuni kiriting" />
          </Form.Item>

          <Form.Item
            name="feedback"
            label="Fikr-mulohaza"
            rules={[{ required: true, message: 'Iltimos, fikringizni kiriting' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="O'z fikringizni yozing..."
            />
          </Form.Item>

          <Form.Item
            name="contact"
            label="Aloqa uchun (ixtiyoriy)"
          >
            <Input placeholder="Email yoki telefon raqamingiz" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="submit-button">
              Yuborish
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Feedback; 