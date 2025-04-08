import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Checkbox, Select, Button, Upload, message } from 'antd';
import { ArrowLeftOutlined, CalendarOutlined, PictureOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from "dayjs";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import '../../styles/components/ProductCreationModal.css';

const { Option } = Select;

interface ProductCreationModalProps {
  open: boolean;
  onClose: () => void;
  debtorId: string;
  createDebt: (debtData: any) => Promise<void>;
}

const ProductCreationModal: React.FC<ProductCreationModalProps> = ({ open, onClose, debtorId, createDebt }) => {
  const [form] = Form.useForm();
  const [isTodayChecked, setIsTodayChecked] = useState(false);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [debtPeriod, setDebtPeriod] = useState<number>(0);
  const [totalDebtSum, setTotalDebtSum] = useState<number>(0);
  const [debtSum, setDebtSum] = useState<number>(0);

  useEffect(() => {
    if (open) {
      setImages([]);
    }
  }, [open]);

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    const checked = e.target?.checked || false;
    setIsTodayChecked(checked);
    setSelectedDate(checked ? dayjs() : null);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleIzohButtonClick = () => {
    setIsDescriptionVisible(true);
  };

  const handleUploadChange = (info: any) => {
    let fileList = [...info.fileList].slice(0, 2);
    setImages(fileList);
  };

  const handleDebtPeriodChange = (value: number) => {
    setDebtPeriod(value);
    if (value && totalDebtSum) {
      setDebtSum(totalDebtSum / value);
    }
  };

  const handleTotalDebtSumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setTotalDebtSum(value);
    if (debtPeriod) {
      setDebtSum(value / debtPeriod);
    }
  };

  const handleSubmit = async () => {
    try {
      if (images.length < 2) {
        message.error('Iltimos, ikkita rasm tanlang');
        return;
      }

      setLoading(true);

      const debtData = {
        next_payment_date: selectedDate?.format('YYYY-MM-DD') || null,
        debt_period: debtPeriod,
        debt_sum: debtSum.toFixed(2),
        total_debt_sum: totalDebtSum.toFixed(2),
        description: description,
        images: images.map((file) => ({
          image: file.url || file.name,
        })),
        debtor: debtorId,
        debt_status: 'active',
      };

      await createDebt(debtData);
      message.success('Qarz muvaffaqiyatli yaratildi!');
      handleModalClose();
    } catch (error) {
      message.error('Qarz yaratishda xatolik yuz berdi');
      console.error("❌ Xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    form.resetFields();
    setIsDescriptionVisible(false);
    setDescription('');
    setImages([]);
    setIsTodayChecked(false);
    setDebtPeriod(0);
    setTotalDebtSum(0);
    setDebtSum(0);
    setSelectedDate(null);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleModalClose}
      footer={null}
      closable={false}
      width={480}
      centered
      className="product-creation-modal"
    >
      <div className="pcm-header">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={handleModalClose}
          className="pcm-back-button"
        />
        <h2 className="pcm-title">Nasiya yaratish</h2>
      </div>

      <div className="pcm-form">
        <Form form={form} layout="vertical">
          <Form.Item
            name="productName"
            label="Mahsulot nomi"
            rules={[{ required: true, message: 'Iltimos mahsulot nomini kiriting' }]}
          >
            <Input className="pcm-input" placeholder="Ismini kiriting" />
          </Form.Item>

          <Form.Item name="date" label="Sana">
            <div className="pcm-date-picker-wrapper">
              <DatePicker
                className="pcm-date-picker"
                placeholder="Sanani tanlang"
                suffixIcon={<CalendarOutlined />}
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
              />
              <Checkbox checked={isTodayChecked} onChange={handleCheckboxChange}>
                Bugun
              </Checkbox>
            </div>
          </Form.Item>

          <Form.Item name="duration" label="Muddat (oy)">
            <Select className="pcm-select" placeholder="Muddatni tanlang" onChange={handleDebtPeriodChange}>
              <Option value={1}>1 oy</Option>
              <Option value={2}>2 oy</Option>
              <Option value={3}>3 oy</Option>
              <Option value={6}>6 oy</Option>
              <Option value={12}>12 oy</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="totalDebtSum"
            label="Umumiy qarz summasi"
            rules={[{ required: true, message: 'Iltimos, qarz summasini kiriting' }]}
          >
            <Input
              className="pcm-input"
              placeholder="Masalan: 1000000"
              type="number"
              onChange={handleTotalDebtSumChange}
              value={totalDebtSum}
            />
          </Form.Item>

          <Form.Item label="Oylik tolov">
            <Input className="pcm-disabled-input" value={debtSum.toFixed(2)} disabled />
          </Form.Item>

          {!isDescriptionVisible && (
            <Form.Item>
              <Button className="pcm-add-desc-btn" onClick={handleIzohButtonClick} block>
                Izoh qo'shish
              </Button>
            </Form.Item>
          )}

          {isDescriptionVisible && (
            <Form.Item
              name="description"
              label="Izoh"
              rules={[{ required: true, message: 'Iltimos, izoh kiriting!' }]}
            >
              <Input.TextArea
                className="pcm-textarea"
                placeholder="Izohni shu yerga yozing..."
                autoSize={{ minRows: 4, maxRows: 6 }}
                value={description}
                onChange={handleDescriptionChange}
              />
            </Form.Item>
          )}

          <Form.Item
            name="images"
            label="Rasm biriktirish"
            rules={[{ required: true, message: 'Iltimos, 2 ta rasm yuklang!' }]}
          >
            <Upload
              listType="picture-card"
              fileList={images}
              beforeUpload={() => false}
              onChange={handleUploadChange}
              maxCount={2}
            >
              {images.length >= 2 ? null : (
                <div className="pcm-upload-box">
                  <PictureOutlined className="pcm-upload-icon" />
                  <div className="pcm-upload-text">Rasm qo'shish</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="pcm-save-btn"
              size="large"
              loading={loading}
              onClick={handleSubmit}
            >
              Saqlash
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default ProductCreationModal;
