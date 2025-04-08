import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Collapse } from 'antd';
import '../../styles/pages/settings/Help.css';

const { Panel } = Collapse;

const helpItems = [
  {
    question: "Dasturdan qanday foydalanish mumkin?",
    answer: "Dasturdan foydalanish uchun ro'yxatdan o'tishingiz va tizimga kirishingiz kerak. Keyin mijozlar va to'lovlarni boshqarishingiz mumkin."
  },
  {
    question: "Yangi mijoz qo'shish",
    answer: "Yangi mijoz qo'shish uchun 'Mijozlar' bo'limiga o'ting va '+' tugmasini bosing. Kerakli ma'lumotlarni kiriting va saqlang."
  },
  {
    question: "To'lovlarni kuzatish",
    answer: "Barcha to'lovlarni 'Hisobot' bo'limida ko'rishingiz mumkin. Bu yerda to'lovlar tarixi va statistikasi mavjud."
  },
  {
    question: "Xavfsizlik masalalari",
    answer: "Parolingizni muntazam yangilab turing va uni hech kim bilan bo'lishmang. Tizimdan chiqishni unutmang."
  },
  {
    question: "Texnik qo'llab-quvvatlash",
    answer: "Texnik yordam uchun +998 90 123 45 67 raqamiga qo'ng'iroq qiling yoki support@example.com ga xat yozing."
  }
];

const Help = () => {
  const navigate = useNavigate();

  return (
    <div className="help-page">
      <div className="page-header">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/settings')}
          type="text"
        />
        <h1>Yordam</h1>
      </div>

      <div className="help-content">
        <Collapse defaultActiveKey={['0']}>
          {helpItems.map((item, index) => (
            <Panel header={item.question} key={index}>
              <p>{item.answer}</p>
            </Panel>
          ))}
        </Collapse>

        <div className="contact-support">
          <h2>Qo'shimcha yordam kerakmi?</h2>
          <p>Bizning qo'llab-quvvatlash xizmatimiz bilan bog'laning:</p>
          <div className="contact-info">
            <p>Telefon: +998 90 123 45 67</p>
            <p>Email: support@example.com</p>
            <p>Ish vaqti: 9:00 - 18:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help; 