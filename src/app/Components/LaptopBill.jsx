"use client";

export default function LaptopBill() {
  const handlePrint = () => window.print();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Serif+Display&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #f1f0eb; }

        .inv-page {
          font-family: 'DM Sans', sans-serif;
          background: #f1f0eb;
          min-height: 100vh;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 3rem 1rem;
        }

        .inv-card {
          background: #ffffff;
          border-radius: 16px;
          width: 100%;
          max-width: 660px;
          overflow: hidden;
          box-shadow: 0 2px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04);
        }

        /* TOP BAND */
        .inv-top {
          background: #0f172a;
          padding: 2rem 2.25rem 1.75rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
        }
        .inv-co-name {
          font-family: 'DM Serif Display', serif;
          font-size: 22px;
          color: #fff;
          line-height: 1.2;
        }
        .inv-co-sub {
          font-size: 12px;
          color: #94a3b8;
          margin-top: 4px;
          letter-spacing: 0.3px;
        }
        .inv-co-addr {
          font-size: 11.5px;
          color: #64748b;
          margin-top: 10px;
          line-height: 1.7;
        }
        .inv-right { text-align: right; flex-shrink: 0; }
        .inv-tax-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #94a3b8;
          border: 1px solid #334155;
          padding: 3px 10px;
          border-radius: 99px;
          margin-bottom: 8px;
        }
        .inv-number {
          font-family: 'DM Serif Display', serif;
          font-size: 26px;
          color: #fff;
          line-height: 1.1;
        }
        .inv-date { font-size: 12px; color: #64748b; margin-top: 5px; }
        .inv-paid-badge {
          display: inline-block;
          margin-top: 10px;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 99px;
          background: #166534;
          color: #bbf7d0;
          letter-spacing: 0.3px;
        }

        /* META ROW */
        .inv-meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .inv-meta-block {
          padding: 1.25rem 2.25rem;
        }
        .inv-meta-block:first-child {
          border-right: 1px solid #f1f5f9;
        }
        .inv-meta-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 6px;
        }
        .inv-meta-name {
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
        }
        .inv-meta-detail {
          font-size: 12px;
          color: #64748b;
          margin-top: 3px;
          line-height: 1.6;
        }

        /* TABLE */
        .inv-table-wrap { padding: 1.5rem 2.25rem 0.5rem; }
        .inv-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
        .inv-table thead th {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #94a3b8;
          padding: 0 0 12px;
          border-bottom: 1px solid #e2e8f0;
          text-align: left;
        }
        .inv-table thead th.r { text-align: right; }
        .inv-table tbody td {
          padding: 16px 0 12px;
          font-size: 13.5px;
          color: #0f172a;
          border-bottom: 1px solid #f8fafc;
          vertical-align: top;
        }
        .inv-table tbody td.r { text-align: right; }
        .inv-table tbody td.muted { color: #94a3b8; text-align: right; }
        .inv-item-name { font-weight: 600; font-size: 14px; color: #0f172a; }
        .inv-item-sub { font-size: 12px; color: #94a3b8; margin-top: 3px; }

        /* TOTALS */
        .inv-totals { padding: 1rem 2.25rem 1.5rem; }
        .inv-totals-inner { margin-left: auto; max-width: 280px; }
        .trow {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #64748b;
          padding: 5px 0;
        }
        .trow span:last-child { font-weight: 500; color: #334155; }
        .trow-divider { border-top: 1px solid #e2e8f0; margin: 8px 0; }
        .trow-total {
          display: flex;
          justify-content: space-between;
          padding: 10px 0 0;
        }
        .trow-total span:first-child { font-size: 14px; font-weight: 600; color: #0f172a; }
        .trow-total span:last-child { font-size: 20px; font-weight: 700; color: #0f172a; }

        /* FOOTER */
        .inv-footer {
          background: #f8fafc;
          border-top: 1px solid #f1f5f9;
          padding: 1.1rem 2.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .inv-footer-note { font-size: 12px; color: #94a3b8; }
        .inv-print-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          padding: 7px 18px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          background: #fff;
          color: #334155;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: background 0.15s;
        }
        .inv-print-btn:hover { background: #f1f5f9; }

        /* ---- PRINT OVERRIDES ---- */
        @media print {
          @page {
            margin: 1.2cm 1.5cm;
            size: A4;
          }
          html, body {
            background: #fff !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .inv-page {
            background: #fff !important;
            padding: 0 !important;
            min-height: unset !important;
          }
          .inv-card {
            box-shadow: none !important;
            border-radius: 0 !important;
            max-width: 100% !important;
          }
          .inv-print-btn { display: none !important; }
        }
      `}</style>

      <div className="inv-page">
        <div className="inv-card">

          {/* Dark top band */}
          <div className="inv-top">
            <div>
              <div className="inv-co-name">TechStore India Pvt. Ltd.</div>
              <div className="inv-co-sub">Laptop &amp; Computer Accessories</div>
              <div className="inv-co-addr">
                12, Nehru Place, New Delhi – 110019<br />
                GSTIN: 07AADCT1234A1Z5 &nbsp;·&nbsp; PAN: AADCT1234A
              </div>
            </div>
            <div className="inv-right">
              <div className="inv-tax-badge">Tax Invoice</div>
              <div className="inv-number">INV-2026-0047</div>
              <div className="inv-date">20 May 2026</div>
              <div><span className="inv-paid-badge">✓ Paid</span></div>
            </div>
          </div>

          {/* Bill To / Payment */}
          <div className="inv-meta">
            <div className="inv-meta-block">
              <div className="inv-meta-label">Bill to</div>
              <div className="inv-meta-name">Rahul Sharma</div>
              <div className="inv-meta-detail">
                rahul.sharma@email.com<br />
                45, Sector 18, Noida, UP – 201301
              </div>
            </div>
            <div className="inv-meta-block">
              <div className="inv-meta-label">Payment</div>
              <div className="inv-meta-name">UPI / Online Transfer</div>
              <div className="inv-meta-detail">
                Ref: TXN8842019376<br />
                Due: 20 May 2026
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="inv-table-wrap">
            <table className="inv-table">
              <colgroup>
                <col style={{ width: "42%" }} />
                <col style={{ width: "16%" }} />
                <col style={{ width: "8%" }} />
                <col style={{ width: "17%" }} />
                <col style={{ width: "17%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th>Description</th>
                  <th className="r">HSN</th>
                  <th className="r">Qty</th>
                  <th className="r">Rate</th>
                  <th className="r">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="inv-item-name">Laptop Power Adapter</div>
                    <div className="inv-item-sub">65W USB-C GaN, Universal Compatible</div>
                  </td>
                  <td className="muted">8504 40</td>
                  <td className="r">1</td>
                  <td className="r">₹6,356</td>
                  <td className="r" style={{ fontWeight: 600 }}>₹6,356</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="inv-totals">
            <div className="inv-totals-inner">
              <div className="trow"><span>Subtotal (excl. GST)</span><span>₹6,356</span></div>
              <div className="trow"><span>CGST @ 9%</span><span>₹572</span></div>
              <div className="trow"><span>SGST @ 9%</span><span>₹572</span></div>
              <div className="trow-divider" />
              <div className="trow-total">
                <span>Total</span>
                <span>₹7,500</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="inv-footer">
            <span className="inv-footer-note">Thank you for your purchase &nbsp;·&nbsp; All prices in INR &nbsp;·&nbsp; E&amp;OE</span>
            <button className="inv-print-btn" onClick={handlePrint}>
              🖨&nbsp; Print / Save PDF
            </button>
          </div>

        </div>
      </div>
    </>
  );
}