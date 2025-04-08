import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, DatePicker, Modal } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/uz-latn';
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "../styles/pages/Calendar.css";

dayjs.locale("uz-latn");

const Calendar = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="calendar-page">
      <div className="page-header">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/')}
          type="text"
        />
        <h1>Kalendar</h1>
      </div>

      <div className="calendar-content">
        <div className="calendar-container">
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uz-latn">
            <DemoItem>
              <DateCalendar
                value={selectedDate}
                onChange={handleDateChange}
                views={["year", "month", "day"]}
                minDate={dayjs().subtract(1, 'year')}
                maxDate={dayjs().add(1, 'year')}
              />
            </DemoItem>
          </LocalizationProvider>
        </div>

        <div className="calendar-info">
          <h2>{selectedDate.format("D MMMM YYYY")}</h2>
          <div className="payment-info">
            <h3>To'lov kutilmoqda</h3>
            <div className="payment-list">
              <div className="payment-item">
                <span className="customer-name">John Doe</span>
                <span className="payment-amount">500,000 so'm</span>
              </div>
              <div className="payment-item">
                <span className="customer-name">Jane Smith</span>
                <span className="payment-amount">300,000 so'm</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title={`${selectedDate.format("D MMMM YYYY")} kuni to'lovlar`}
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
      >
        <div className="modal-content">
          <div className="payment-list">
            <div className="payment-item">
              <span className="customer-name">John Doe</span>
              <span className="payment-amount">500,000 so'm</span>
            </div>
            <div className="payment-item">
              <span className="customer-name">Jane Smith</span>
              <span className="payment-amount">300,000 so'm</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Calendar; 