import React from 'react';

class Purchasereturn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      supplier: '',
      contactNo: '',
      address: '',
      againstInvoice: '',
      returnTotal: '',
      gstTotal: '',
      modeOfPayment: '',
      cash: '',
      fromBalance: '',
      returnDate: '2025-06-26',
      itemCode: '',
      item: '',
      mrp: '',
      discPercent: '',
      gstPercent: '',
      gstRs: '',
      netRate: '',
      qty: '1',
      total: '',
    };
  }

  componentDidMount() {
    // Fetch supplier data if needed
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.supplier !== this.state.supplier) {
      const selectedSupplier = this.state.suppliers
        ? this.state.suppliers.find((s) => s.id === this.state.supplier)
        : null;
      this.setState({
        dueAmount: '0.00',
        selectedSupplierDetails: selectedSupplier || null,
      });
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      supplier,
      contactNo,
      address,
      againstInvoice,
      returnTotal,
      gstTotal,
      modeOfPayment,
      cash,
      fromBalance,
      returnDate,
      itemCode,
      item,
      mrp,
      discPercent,
      gstPercent,
      gstRs,
      netRate,
      qty,
      total,
    } = this.state;

    const formInputStyle = {
      padding: '0.1rem 0.2rem',
      fontSize: '0.8rem',
      width: '100%',
      boxSizing: 'border-box',
    };

    const cardHeaderStyle = {
      backgroundColor: '#f8f9fa',
      padding: '10px',
      fontWeight: 'bold',
    };

    const cardBodyStyle = {
      padding: '15px',
    };

    const tableHeaderStyle = {
      padding: '8px',
      border: '1px solid #ddd',
      textAlign: 'left',
      backgroundColor: '#f8f9fa',
    };

    const tableCellStyle = {
      padding: '8px',
      border: '1px solid #ddd',
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div style={{ border: '1px solid #ddd', borderRadius: '4px' }}>
          <div style={cardHeaderStyle}>PURCHASE RETURN</div>
          <div style={cardBodyStyle}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                {/* Supplier details */}
                <div
                  style={{
                    width: '60%',
                    marginBottom: '20px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: '#f8f9fa',
                      padding: '10px',
                      fontWeight: 'bold',
                      borderBottom: '1px solid #ddd',
                    }}
                  >
                    Supplier Details
                  </div>
                  <div style={{ padding: '15px', overflowX: 'auto' }}>
                    <div
                      style={{ display: 'flex', gap: '10px', width: '100%' }}
                    >
                      <div style={{ flex: 1 }}>
                        <label>Supplier</label>
                        <input
                          type="text"
                          name="supplier"
                          value={supplier}
                          onChange={this.handleInputChange}
                          style={formInputStyle}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label>Contact No.</label>
                        <input
                          type="text"
                          name="contactNo"
                          value={contactNo}
                          onChange={this.handleInputChange}
                          style={formInputStyle}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label>Address</label>
                        <input
                          type="text"
                          name="address"
                          value={address}
                          onChange={this.handleInputChange}
                          style={formInputStyle}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* table  item details*/}
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '0.8rem',
                  }}
                >
                  <thead>
                    <tr>
                      <th style={tableHeaderStyle}>ItemCode</th>
                      <th style={tableHeaderStyle}>Item</th>
                      <th style={tableHeaderStyle}>MRP</th>
                      <th style={tableHeaderStyle}>Disc %</th>
                      <th style={tableHeaderStyle}>Disc(Rs.)</th>
                      <th style={tableHeaderStyle}>GST(%)</th>
                      <th style={tableHeaderStyle}>GST(Rs)</th>
                      <th style={tableHeaderStyle}>NetRate</th>
                      <th style={tableHeaderStyle}>Qty</th>
                      <th style={tableHeaderStyle}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={tableCellStyle}>
                        <input
                          type="text"
                          name="itemCode"
                          value={itemCode}
                          onChange={this.handleInputChange}
                          style={{
                            ...formInputStyle,
                            width: '100%',
                            padding: '0.2rem 0.3rem',
                          }}
                        />
                      </td>
                      <td style={tableCellStyle}>
                        <input
                          type="text"
                          name="item"
                          value={item}
                          onChange={this.handleInputChange}
                          style={{
                            ...formInputStyle,
                            width: '120%',
                            padding: '0.2rem 0.3rem',
                          }}
                        />
                      </td>
                      <td style={tableCellStyle}>
                        <input
                          type="text"
                          name="mrp"
                          value={mrp}
                          onChange={this.handleInputChange}
                          style={{
                            ...formInputStyle,
                            width: '120%',
                            padding: '0.2rem 0.3rem',
                          }}
                        />
                      </td>
                      <td style={tableCellStyle}>
                        <input
                          type="text"
                          name="discPercent"
                          value={discPercent}
                          onChange={this.handleInputChange}
                          style={{
                            ...formInputStyle,
                            width: '70%',
                            padding: '0.1rem 0.2rem',
                          }}
                        />
                      </td>
                      <td style={tableCellStyle}>
                        <input
                          type="text"
                          name="gstRs"
                          value={gstRs}
                          onChange={this.handleInputChange}
                          style={{
                            ...formInputStyle,
                            width: '70%',
                            padding: '0.1rem 0.2rem',
                          }}
                        />
                      </td>
                      <td style={tableCellStyle}>
                        <input
                          type="text"
                          name="gstPercent"
                          value={gstPercent}
                          onChange={this.handleInputChange}
                          style={{
                            ...formInputStyle,
                            width: '90%',
                            padding: '0.1rem 0.2rem',
                          }}
                        />
                      </td>
                      <td style={tableCellStyle}>
                        <input
                          type="text"
                          name="gstRs"
                          value={gstRs}
                          onChange={this.handleInputChange}
                          style={{
                            ...formInputStyle,
                            width: '90%',
                            padding: '0.1rem 0.2rem',
                          }}
                        />
                      </td>
                      <td style={tableCellStyle}>
                        <input
                          type="text"
                          name="netRate"
                          value={netRate}
                          onChange={this.handleInputChange}
                          style={{
                            ...formInputStyle,
                            width: '90%',
                            padding: '0.1rem 0.2rem',
                          }}
                        />
                      </td>
                      <td style={tableCellStyle}>
                        <input
                          type="text"
                          name="qty"
                          value={qty}
                          onChange={this.handleInputChange}
                          style={{
                            ...formInputStyle,
                            width: '120%',
                            padding: '0.2rem 0.3rem',
                          }}
                        />
                      </td>
                      <td style={tableCellStyle}>
                        <input
                          type="text"
                          name="total"
                          value={total}
                          onChange={this.handleInputChange}
                          style={{
                            ...formInputStyle,
                            width: '120%',
                            padding: '0.2rem 0.3rem',
                          }}
                        />
                      </td>
                      <button style={{ marginRight: '10px' }}>ADD</button>
                      <select style={formInputStyle}>
                        <option>Ex-Tax</option>
                      </select>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Amount Summary */}
              <div
                style={{
                  width: '60%',
                  marginBottom: '20px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#ffffff',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#f8f9fa',
                    padding: '12px',
                    fontWeight: '600',
                    borderBottom: '1px solid #e0e0e0',
                    borderRadius: '8px 8px 0 0',
                    color: '#333',
                  }}
                >
                  AMOUNT SUMMARY
                </div>
                <div style={{ padding: '20px', overflowX: 'auto' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '15px',
                      width: '100%',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                      }}
                    >
                      <label
                        style={{
                          minWidth: '120px',
                          fontWeight: '500',
                          color: '#444',
                        }}
                      >
                        Return Total
                      </label>
                      <input
                        type="text"
                        name="returnTotal"
                        value={returnTotal}
                        onChange={this.handleInputChange}
                        style={{
                          padding: '8px',
                          fontSize: '14px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          width: '150px',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                      }}
                    >
                      <label
                        style={{
                          minWidth: '120px',
                          fontWeight: '500',
                          color: '#444',
                        }}
                      >
                        GST Total (Rs.)
                      </label>
                      <input
                        type="text"
                        name="gstTotal"
                        value={gstTotal}
                        onChange={this.handleInputChange}
                        style={{
                          padding: '8px',
                          fontSize: '14px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          width: '150px',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                      }}
                    >
                      <label
                        style={{
                          minWidth: '120px',
                          fontWeight: '500',
                          color: '#444',
                        }}
                      >
                        Total
                      </label>
                      <input
                        type="text"
                        name="total"
                        value={total}
                        onChange={this.handleInputChange}
                        style={{
                          padding: '8px',
                          fontSize: '14px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          width: '150px',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                      }}
                    >
                      <label
                        style={{
                          minWidth: '120px',
                          fontWeight: '500',
                          color: '#444',
                        }}
                      >
                        Mode of Payment:
                      </label>
                      <input
                        type="text"
                        name="modeOfPayment"
                        value={modeOfPayment}
                        onChange={this.handleInputChange}
                        style={{
                          padding: '8px',
                          fontSize: '14px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          width: '150px',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                      }}
                    >
                      <label
                        style={{
                          minWidth: '120px',
                          fontWeight: '500',
                          color: '#444',
                        }}
                      >
                        Cash (Rs.)
                      </label>
                      <input
                        type="text"
                        name="cash"
                        value={cash}
                        onChange={this.handleInputChange}
                        style={{
                          padding: '8px',
                          fontSize: '14px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          width: '150px',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                      }}
                    >
                      <label
                        style={{
                          minWidth: '120px',
                          fontWeight: '500',
                          color: '#444',
                        }}
                      >
                        From Balance (Rs.)
                      </label>
                      <input
                        type="text"
                        name="fromBalance"
                        value={fromBalance}
                        onChange={this.handleInputChange}
                        style={{
                          padding: '8px',
                          fontSize: '14px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          width: '150px',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                      }}
                    >
                      <label
                        style={{
                          minWidth: '120px',
                          fontWeight: '500',
                          color: '#444',
                        }}
                      >
                        Return Date:
                      </label>
                      <input
                        type="text"
                        name="returnDate"
                        value={returnDate || '2025-06-26'} // Updated to match image format
                        onChange={this.handleInputChange}
                        style={{
                          padding: '8px',
                          fontSize: '14px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          width: '150px',
                          boxSizing: 'border-box',
                          backgroundColor: '#f9f9f9',
                        }}
                        readOnly
                      />
                  
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: '20px',
                      display: 'flex',
                      gap: '10px',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <button
                      style={{
                        padding: '8px 15px',
                        fontSize: '14px',
                        border: 'none',
                        borderRadius: '4px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = '#0056b3')
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = '#007bff')
                      }
                    >
                      GST@IGST
                    </button>
                    <button
                      style={{
                        padding: '8px 15px',
                        fontSize: '14px',
                        border: 'none',
                        borderRadius: '4px',
                        backgroundColor: '#28a745',
                        color: '#fff',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = '#218838')
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = '#28a745')
                      }
                    >
                      Submit
                    </button>
                    <button
                      style={{
                        padding: '8px 15px',
                        fontSize: '14px',
                        border: 'none',
                        borderRadius: '4px',
                        backgroundColor: '#dc3545',
                        color: '#fff',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = '#c82333')
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = '#dc3545')
                      }
                    >
                      Print
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Purchasereturn;
