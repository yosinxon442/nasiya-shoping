// import React from 'react';
import '../styles/pages/Reports.css';
// import { FaSearch } from 'react-icons/fa';

const mockReports = [
  {
    date: '09.10.2024',
    items: [
      { name: 'Dilmurod Qodirov', phone: '+998 91 123 4567', amount: -1200000 },
      { name: 'Shoxruxbek Murodov', phone: '+998 91 123 4567', amount: -800000 },
    ]
  },
  {
    date: '07.10.2024',
    items: [
      { name: 'Azizbek Tursunov', phone: '+998 91 123 4567', amount: -750000 },
    ]
  },
  {
    date: '06.10.2024',
    items: [
      { name: 'Jasurbek Rahmonov', phone: '+998 91 123 4567', amount: -1000000 },
      { name: 'Farrukhbek Ismoilov', phone: '+998 91 123 4567', amount: -1200000 },
      { name: 'Sardorbek Xudoyberdiyev', phone: '+998 91 123 4567', amount: -1200000 },
    ]
  }
];

const ReportsPage = () => {
  return (
    <div className="reports-container">
      <div className="reports-header">
        <h1>Hisobot</h1>
        <div className="report-tabs">
          <button className="tab active">To‘lovlar tarixi</button>
          <button className="tab">Xabarlar tarixi</button>
        </div>
      </div>

      <div className="report-content">
        {mockReports.length === 0 ? (
          <div className="no-data">Ma'lumot yo‘q</div>
        ) : (
          mockReports.map((report) => (
            <div key={report.date} className="report-group">
              <div className="report-date">{report.date}</div>
              {report.items.map((item, index) => (
                <div className="report-item" key={index}>
                  <div className="report-info">
                    <div className="report-name">{item.name}</div>
                    <div className="report-phone">{item.phone}</div>
                  </div>
                  <div className="report-amount">{item.amount.toLocaleString()} so‘m</div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
