import React, { Component } from 'react';

// Purchase Items Section component (Section 2)
class PurchaseItemsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formRow: {
        company: '',
        itemCode: '',
        item: '',
        hsn: '',
        qty: '',
        unit: '',
        mrp: '',
        dis1: '',
        dis1Rs: '',
        dis2: '',
        dis2Rs: '',
        gst: '',
        rate: '',
        total: '',
        taxType: 'GST',
      },
      tableData: [],
      forwardingCharges: '',
      forwardingGstPercent: '',
      forwardingGstRs: '',
      finalAmount: '',
      dis1Total: '',
      dis2Total: '',
      taxValue: '',
      gstRs: '',
      otherCharges: '',
      tcs: '',
      netTotal: '',
      cash: '',
      cardUPI: '',
      cheque: '',
      chequeNo: '',
      bank: '',
      balance: '',
      successMessage: '',
      errorMessage: '',
    };
  }

  componentDidMount() {
    this.calculateTotals();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.tableData !== this.state.tableData ||
      prevState.forwardingCharges !== this.state.forwardingCharges ||
      prevState.forwardingGstPercent !== this.state.forwardingGstPercent ||
      prevState.otherCharges !== this.state.otherCharges ||
      prevState.tcs !== this.state.tcs ||
      prevState.cash !== this.state.cash ||
      prevState.cardUPI !== this.state.cardUPI ||
      prevState.cheque !== this.state.cheque
    ) {
      this.calculateTotals();
    }
  }

  calculateFields = (row) => {
    const qty = parseFloat(row.qty) || 0;
    const mrp = parseFloat(row.mrp) || 0;
    const dis1 = parseFloat(row.dis1) || 0;
    const dis2 = parseFloat(row.dis2) || 0;
    const gst = parseFloat(row.gst) || 0;

    const dis1Rs = (mrp * dis1) / 100;
    let netRate = mrp - dis1Rs;

    const dis2Rs = (netRate * dis2) / 100;
    netRate = netRate - dis2Rs;
    netRate = Math.max(0, netRate);

    const gstAmountPerUnit = (netRate * gst) / 100;
    const total = (netRate + gstAmountPerUnit) * qty;
    const gstRs = (netRate * qty * gst) / 100;

    return {
      ...row,
      dis1Rs: dis1Rs.toFixed(2),
      dis2Rs: dis2Rs.toFixed(2),
      netRate: netRate.toFixed(2),
      total: total.toFixed(2),
      gstRs: gstRs.toFixed(2),
    };
  };

  calculateForwarding = () => {
    const charges = parseFloat(this.state.forwardingCharges) || 0;
    const gstPercent = parseFloat(this.state.forwardingGstPercent) || 0;
    const gstRs = (charges * gstPercent) / 100;
    const total = charges + gstRs;
    this.setState({
      forwardingGstRs: gstRs.toFixed(2),
      finalAmount: total.toFixed(2),
    });
    return { gstRs, total };
  };

  calculateTotals = () => {
    const tableTotal =
      this.state.tableData.reduce(
        (sum, row) => sum + (parseFloat(row.total) || 0),
        0
      ) || 0;
    const totalDis1 =
      this.state.tableData.reduce(
        (sum, row) => sum + (parseFloat(row.dis1Rs) || 0),
        0
      ) || 0;
    const totalDis2 =
      this.state.tableData.reduce(
        (sum, row) => sum + (parseFloat(row.dis2Rs) || 0),
        0
      ) || 0;
    const totalGstRs =
      this.state.tableData.reduce(
        (sum, row) => sum + (parseFloat(row.gstRs) || 0),
        0
      ) || 0;
    const taxableValue =
      this.state.tableData.reduce(
        (sum, row) =>
          sum + (parseFloat(row.netRate) || 0) * (parseFloat(row.qty) || 0),
        0
      ) || 0;
    const { total: forwardingTotal } = this.calculateForwarding();
    const other = parseFloat(this.state.otherCharges) || 0;
    const tcsAmount = parseFloat(this.state.tcs) || 0;
    const amount = tableTotal + forwardingTotal + other + tcsAmount;
    const cashAmount = parseFloat(this.state.cash) || 0;
    const cardUPIAmount = parseFloat(this.state.cardUPI) || 0;
    const chequeAmount = parseFloat(this.state.cheque) || 0;
    const totalPaid = cashAmount + cardUPIAmount + chequeAmount;
    const remainingBalance = amount - totalPaid;

    this.setState({
      dis1Total: totalDis1.toFixed(2),
      dis2Total: totalDis2.toFixed(2),
      gstRs: totalGstRs.toFixed(2),
      taxValue: taxableValue.toFixed(2),
      netTotal: amount.toFixed(2),
      balance: remainingBalance.toFixed(2),
    });

    if (this.props.setParentBalance) {
      const displayBalance =
        remainingBalance >= 0 ? -remainingBalance : Math.abs(remainingBalance);
      this.props.setParentBalance(displayBalance.toFixed(2));
    }
  };

  handleInputChange = (field, value) => {
    const updatedRow = { ...this.state.formRow, [field]: value };
    if (['mrp', 'qty', 'dis1', 'dis2', 'gst'].includes(field)) {
      const calculatedRow = this.calculateFields(updatedRow);
      this.setState({ formRow: calculatedRow });
    } else {
      this.setState({ formRow: updatedRow });
    }
  };

  handleTableInputChange = (index, field, value) => {
    const updatedTableData = [...this.state.tableData];
    updatedTableData[index][field] = value;
    if (['mrp', 'qty', 'dis1', 'dis2', 'gst'].includes(field)) {
      updatedTableData[index] = this.calculateFields(updatedTableData[index]);
    }
    this.setState({ tableData: updatedTableData });
  };

  handleSummaryInputChange = (field, value) => {
    if (field === 'forwardingCharges')
      this.setState({ forwardingCharges: value });
    else if (field === 'forwardingGstPercent')
      this.setState({ forwardingGstPercent: value });
    else if (field === 'otherCharges') this.setState({ otherCharges: value });
    else if (field === 'tcs') this.setState({ tcs: value });
  };

  handlePaymentInputChange = (field, value) => {
    if (field === 'cash') this.setState({ cash: value });
    else if (field === 'cardUPI') this.setState({ cardUPI: value });
    else if (field === 'cheque') this.setState({ cheque: value });
    else if (field === 'chequeNo') this.setState({ chequeNo: value });
    else if (field === 'bank') this.setState({ bank: value });
  };

  handleAddRow = () => {
    const calculatedRow = this.calculateFields(this.state.formRow);
    const newTableRow = {
      sr: this.state.tableData.length + 1,
      company: this.state.formRow.company,
      itemCode: this.state.formRow.itemCode,
      item: this.state.formRow.item,
      hsn: this.state.formRow.hsn,
      qty: this.state.formRow.qty,
      unit: this.state.formRow.unit,
      mrp: this.state.formRow.mrp,
      dis1: this.state.formRow.dis1,
      dis1Rs: calculatedRow.dis1Rs,
      dis2: this.state.formRow.dis2,
      dis2Rs: calculatedRow.dis2Rs,
      gst: this.state.formRow.gst,
      netRate: calculatedRow.netRate,
      total: calculatedRow.total,
      gstRs: calculatedRow.gstRs,
    };
    this.setState((prevState) => ({
      tableData: [...prevState.tableData, newTableRow],
      formRow: {
        company: '',
        itemCode: '',
        item: '',
        hsn: '',
        qty: '',
        unit: '',
        mrp: '',
        dis1: '',
        dis1Rs: '',
        dis2: '',
        dis2Rs: '',
        gst: '',
        rate: '',
        total: '',
        taxType: 'GST',
      },
    }));
  };

  handleDeleteRow = (index) => {
    const updatedTableData = this.state.tableData.filter((_, i) => i !== index);
    const reindexedTableData = updatedTableData.map((row, i) => ({
      ...row,
      sr: i + 1,
    }));
    this.setState({ tableData: reindexedTableData });
  };

  handleSave = () => {
    this.setState({
      successMessage: 'Purchase saved successfully (simulated).',
      errorMessage: '',
    });
    this.handleNew();
  };

  handleEstimate = () => {
    console.log('Estimating:', {
      finalAmount: this.state.finalAmount,
      netTotal: this.state.netTotal,
      balance: this.state.balance,
    });
  };

  handleNew = () => {
    this.setState({
      formRow: {
        company: '',
        itemCode: '',
        item: '',
        hsn: '',
        qty: '',
        unit: '',
        mrp: '',
        dis1: '',
        dis1Rs: '',
        dis2: '',
        dis2Rs: '',
        gst: '',
        rate: '',
        total: '',
        taxType: 'GST',
      },
      tableData: [],
      forwardingCharges: '',
      forwardingGstPercent: '',
      forwardingGstRs: '',
      finalAmount: '',
      dis1Total: '',
      dis2Total: '',
      taxValue: '',
      gstRs: '',
      otherCharges: '',
      tcs: '',
      netTotal: '',
      cash: '',
      cardUPI: '',
      cheque: '',
      chequeNo: '',
      bank: '',
      balance: '',
      successMessage: '',
      errorMessage: '',
    });
    if (this.props.setParentBalance) this.props.setParentBalance('0.00');
  };

  render() {
    const {
      successMessage,
      errorMessage,
      formRow,
      tableData,
      forwardingCharges,
      forwardingGstPercent,
      forwardingGstRs,
      finalAmount,
      dis1Total,
      dis2Total,
      taxValue,
      gstRs,
      otherCharges,
      tcs,
      netTotal,
      cash,
      cardUPI,
      cheque,
      chequeNo,
      bank,
      balance,
    } = this.state;
    const { supplierID, purchaseDate, billNo, remark, dueAmount } = this.props;

    const tableStyle = {
      width: '100%',
      fontSize: '0.8rem',
      overflowX: 'auto',
      display: 'block',
    };

    const cellStyle = {
      padding: '5px',
      textAlign: 'center',
      verticalAlign: 'middle',
      whiteSpace: 'nowrap',
    };

    const inputStyle = {
      padding: '0.1rem 0.2rem',
      fontSize: '0.8rem',
      width: '80%',
      boxSizing: 'border-box',
    };

    const buttonStyle = {
      padding: '0.25rem 0.5rem',
      fontSize: '0.8rem',
      borderRadius: '4px',
      border: 'none',
    };

    const cardHeaderStyle = {
      backgroundColor: '#f8f9fa',
      padding: '10px',
      fontWeight: 'bold',
    };

    const cardBodyStyle = {
      padding: '15px',
    };

    const alertStyle = {
      fontSize: '0.9rem',
      marginBottom: '10px',
    };

    const buttonGroupStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '20px',
      flexDirection: 'row',
      gap: '10px',
    };

    const formControlStyle = {
      ...inputStyle,
      display: 'inline-block',
    };

    return (
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '4px',
          marginTop: '20px',
        }}
      >
        <div style={cardHeaderStyle}>Purchase Items</div>
        <div style={cardBodyStyle}>
          {successMessage && (
            <div
              style={{
                ...alertStyle,
                backgroundColor: '#d4edda',
                color: '#155724',
                border: '1px solid #c3e6cb',
              }}
            >
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div
              style={{
                ...alertStyle,
                backgroundColor: '#f8d7da',
                color: '#721c24',
                border: '1px solid #f5c6cb',
              }}
            >
              {errorMessage}
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={cellStyle}>Sr.</th>
                  <th style={cellStyle}>Company Name</th>
                  <th style={cellStyle}>Item</th>
                  <th style={cellStyle}>Item Name</th>
                  <th style={cellStyle}>HSN</th>
                  <th style={cellStyle}>Qty</th>
                  <th style={cellStyle}>Unit select</th>
                  <th style={cellStyle}>MRP(Rs)</th>
                  <th style={cellStyle}>Dis1%</th>
                  <th style={cellStyle}>Dis1(Rs)</th>
                  <th style={cellStyle}>Dis2%</th>
                  <th style={cellStyle}>Dis2(Rs)</th>
                  <th style={cellStyle}>GST(%)</th>
                  <th style={cellStyle}>Net Rate</th>
                  <th style={cellStyle}>Total</th>
                  <th style={cellStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={cellStyle}>1</td>
                  <td style={cellStyle}>
                    <select
                      value={formRow.company}
                      onChange={(e) =>
                        this.handleInputChange('company', e.target.value)
                      }
                      style={formControlStyle}
                    >
                      <option value="">-select-</option>
                      <option value="ANGLE">ANGLE</option>
                      <option value="BOLT">BOLT</option>
                      <option value="FG">FG</option>
                      <option value="GF">GF</option>
                    </select>
                  </td>
                  <td style={cellStyle}>
                    <input
                      type="text"
                      value={formRow.itemCode}
                      onChange={(e) =>
                        this.handleInputChange('itemCode', e.target.value)
                      }
                      style={formControlStyle}
                    />
                  </td>
                  <td style={cellStyle}>
                    <input
                      type="text"
                      value={formRow.item}
                      onChange={(e) =>
                        this.handleInputChange('item', e.target.value)
                      }
                      style={formControlStyle}
                    />
                  </td>
                  <td style={cellStyle}>
                    <input
                      type="text"
                      value={formRow.hsn}
                      onChange={(e) =>
                        this.handleInputChange('hsn', e.target.value)
                      }
                      style={formControlStyle}
                    />
                  </td>
                  <td style={cellStyle}>
                    <input
                      type="text"
                      value={formRow.qty}
                      onChange={(e) =>
                        this.handleInputChange('qty', e.target.value)
                      }
                      style={formControlStyle}
                    />
                  </td>
                  <td style={cellStyle}>
                    <select
                      value={formRow.unit}
                      onChange={(e) =>
                        this.handleInputChange('unit', e.target.value)
                      }
                      style={formControlStyle}
                    >
                      <option value="">-select-</option>
                      <option value="bag">bag</option>
                      <option value="UGS">UGS</option>
                      <option value="unit">unit</option>
                      <option value="qtl">qtl</option>
                    </select>
                  </td>
                  <td style={cellStyle}>
                    <input
                      type="text"
                      value={formRow.mrp}
                      onChange={(e) =>
                        this.handleInputChange('mrp', e.target.value)
                      }
                      style={formControlStyle}
                    />
                  </td>
                  <td style={cellStyle}>
                    <input
                      type="text"
                      value={formRow.dis1}
                      onChange={(e) =>
                        this.handleInputChange('dis1', e.target.value)
                      }
                      style={formControlStyle}
                    />
                  </td>
                  <td style={cellStyle}>
                    <input
                      type="text"
                      value={formRow.dis1Rs}
                      readOnly
                      style={formControlStyle}
                    />
                  </td>
                  <td style={cellStyle}>
                    <input
                      type="text"
                      value={formRow.dis2}
                      onChange={(e) =>
                        this.handleInputChange('dis2', e.target.value)
                      }
                      style={formControlStyle}
                    />
                  </td>
                  <td style={cellStyle}>
                    <input
                      type="text"
                      value={formRow.dis2Rs}
                      readOnly
                      style={formControlStyle}
                    />
                  </td>
                  <td style={cellStyle}>
                    <input
                      type="text"
                      value={formRow.gst}
                      onChange={(e) =>
                        this.handleInputChange('gst', e.target.value)
                      }
                      style={formControlStyle}
                    />
                  </td>
                  <td style={cellStyle}>
                    <input
                      type="text"
                      value={formRow.netRate}
                      readOnly
                      style={formControlStyle}
                    />
                  </td>
                  <td style={cellStyle}>
                    <input
                      type="text"
                      value={formRow.total}
                      readOnly
                      style={formControlStyle}
                    />
                  </td>
                  <td style={cellStyle}>
                    <button
                      onClick={this.handleAddRow}
                      style={{
                        ...buttonStyle,
                        backgroundColor: '#007bff',
                        color: 'white',
                      }}
                    >
                      ADD
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={cellStyle}>Sr.</th>
                  <th style={cellStyle}>Company</th>
                  <th style={cellStyle}>Item</th>
                  <th style={cellStyle}>Item Name</th>
                  <th style={cellStyle}>HSN</th>
                  <th style={cellStyle}>Unit select</th>
                  <th style={cellStyle}>Net Rate(Rs)</th>
                  <th style={cellStyle}>Dis1(%)</th>
                  <th style={cellStyle}>Dis1(Rs)</th>
                  <th style={cellStyle}>Dis2(%)</th>
                  <th style={cellStyle}>Dis2(Rs)</th>
                  <th style={cellStyle}>GST(%)</th>
                  <th style={cellStyle}>GST(Rs)</th>
                  <th style={cellStyle}>Qty</th>
                  <th style={cellStyle}>MRP(Rs)</th>
                  <th style={cellStyle}>Total</th>
                  <th style={cellStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={cellStyle}>{row.sr}</td>
                    <td style={cellStyle}>{row.company}</td>
                    <td style={cellStyle}>{row.itemCode}</td>
                    <td style={cellStyle}>{row.item}</td>
                    <td style={cellStyle}>
                      <input
                        type="text"
                        value={row.hsn}
                        onChange={(e) =>
                          this.handleTableInputChange(
                            index,
                            'hsn',
                            e.target.value
                          )
                        }
                        style={formControlStyle}
                      />
                    </td>
                    <td style={cellStyle}>
                      <select
                        value={row.unit}
                        onChange={(e) =>
                          this.handleTableInputChange(
                            index,
                            'unit',
                            e.target.value
                          )
                        }
                        style={formControlStyle}
                      >
                        <option value="">-select-</option>
                        <option value="bag">bag</option>
                        <option value="UGS">UGS</option>
                        <option value="unit">unit</option>
                        <option value="qtl">qtl</option>
                      </select>
                    </td>
                    <td style={cellStyle}>
                      <input
                        type="text"
                        value={row.netRate}
                        readOnly
                        style={formControlStyle}
                      />
                    </td>
                    <td style={cellStyle}>
                      <input
                        type="text"
                        value={row.dis1}
                        onChange={(e) =>
                          this.handleTableInputChange(
                            index,
                            'dis1',
                            e.target.value
                          )
                        }
                        style={formControlStyle}
                      />
                    </td>
                    <td style={cellStyle}>{row.dis1Rs}</td>
                    <td style={cellStyle}>
                      <input
                        type="text"
                        value={row.dis2}
                        onChange={(e) =>
                          this.handleTableInputChange(
                            index,
                            'dis2',
                            e.target.value
                          )
                        }
                        style={formControlStyle}
                      />
                    </td>
                    <td style={cellStyle}>{row.dis2Rs}</td>
                    <td style={cellStyle}>
                      <input
                        type="text"
                        value={row.gst}
                        onChange={(e) =>
                          this.handleTableInputChange(
                            index,
                            'gst',
                            e.target.value
                          )
                        }
                        style={formControlStyle}
                      />
                    </td>
                    <td style={cellStyle}>{row.gstRs}</td>
                    <td style={cellStyle}>
                      <input
                        type="text"
                        value={row.qty}
                        onChange={(e) =>
                          this.handleTableInputChange(
                            index,
                            'qty',
                            e.target.value
                          )
                        }
                        style={formControlStyle}
                      />
                    </td>
                    <td style={cellStyle}>
                      <input
                        type="text"
                        value={row.mrp}
                        onChange={(e) =>
                          this.handleTableInputChange(
                            index,
                            'mrp',
                            e.target.value
                          )
                        }
                        style={formControlStyle}
                      />
                    </td>
                    <td style={cellStyle}>{row.total}</td>
                    <td style={cellStyle}>
                      <button
                        onClick={() => this.handleDeleteRow(index)}
                        style={{
                          ...buttonStyle,
                          backgroundColor: '#dc3545',
                          color: 'white',
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={cellStyle}>Forwarding Charges</th>
                  <th style={cellStyle}>GST(%)</th>
                  <th style={cellStyle}>GST(Rs.)</th>
                  <th style={cellStyle}>Amount(Rs.)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={cellStyle}>
                    <input
                      type="text"
                      value={forwardingCharges}
                      onChange={(e) =>
                        this.handleSummaryInputChange(
                          'forwardingCharges',
                          e.target.value
                        )
                      }
                      style={formControlStyle}
                    />
                  </td>
                  <td style={cellStyle}>
                    <input
                      type="text"
                      value={forwardingGstPercent}
                      onChange={(e) =>
                        this.handleSummaryInputChange(
                          'forwardingGstPercent',
                          e.target.value
                        )
                      }
                      style={formControlStyle}
                    />
                  </td>
                  <td style={cellStyle}>
                    <input
                      type="text"
                      value={forwardingGstRs}
                      readOnly
                      style={formControlStyle}
                    />
                  </td>
                  <td style={cellStyle}>
                    <input
                      type="text"
                      value={finalAmount}
                      readOnly
                      style={formControlStyle}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th colSpan="13" style={{ ...cellStyle, textAlign: 'left' }}>
                    Payment Details
                  </th>
                </tr>
                <tr>
                  <th style={cellStyle}>Dis 1</th>
                  <th style={cellStyle}>Dis 2</th>
                  <th style={cellStyle}>Tax Value</th>
                  <th style={cellStyle}>GST(Rs.)</th>
                  <th style={cellStyle}>Other(Rs.)</th>
                  <th style={cellStyle}>TCS(Rs)</th>
                  <th style={cellStyle}>Net Total</th>
                  <th style={cellStyle}>Cash</th>
                  <th style={cellStyle}>CardUPI</th>
                  <th style={cellStyle}>Cheque</th>
                  <th style={cellStyle}>Cheque No</th>
                  <th style={cellStyle}>Bank</th>
                  <th style={cellStyle}>Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={cellStyle}>
                    <input
                      type="text"
                      value={dis1Total}
                      readOnly
                      style={formControlStyle}
                    />
                  </td>
                  <td style={cellStyle}>
                    <input
                      type="text"
                      value={dis2Total}
                      readOnly
                      style={formControlStyle}
                    />
                  </td>
                  <td style={cellStyle}>
                    <input
                      type="text"
                      value={taxValue}
                      readOnly
                      style={formControlStyle}
                    />
                  </td>
                  <td style={cellStyle}>
                    <input
                      type="text"
                      value={gstRs}
                      readOnly
                      style={formControlStyle}
                    />
                  </td>
                  <td style={cellStyle}>
                    <input
                      type="text"
                      value={otherCharges}
                      onChange={(e) =>
                        this.handleSummaryInputChange(
                          'otherCharges',
                          e.target.value
                        )
                      }
                      style={formControlStyle}
                    />
                  </td>
                  <td style={cellStyle}>
                    <input
                      type="text"
                      value={tcs}
                      onChange={(e) =>
                        this.handleSummaryInputChange('tcs', e.target.value)
                      }
                      style={formControlStyle}
                    />
                  </td>
                  <td style={cellStyle}>
                    <input
                      type="text"
                      value={netTotal}
                      readOnly
                      style={formControlStyle}
                    />
                  </td>
                  <td style={cellStyle}>
                    <input
                      type="text"
                      value={cash}
                      onChange={(e) =>
                        this.handlePaymentInputChange('cash', e.target.value)
                      }
                      style={formControlStyle}
                    />
                  </td>
                  <td style={cellStyle}>
                    <input
                      type="text"
                      value={cardUPI}
                      onChange={(e) =>
                        this.handlePaymentInputChange('cardUPI', e.target.value)
                      }
                      style={formControlStyle}
                    />
                  </td>
                  <td style={cellStyle}>
                    <input
                      type="text"
                      value={cheque}
                      onChange={(e) =>
                        this.handlePaymentInputChange('cheque', e.target.value)
                      }
                      style={formControlStyle}
                    />
                  </td>
                  <td style={cellStyle}>
                    <input
                      type="text"
                      value={chequeNo}
                      onChange={(e) =>
                        this.handlePaymentInputChange(
                          'chequeNo',
                          e.target.value
                        )
                      }
                      style={formControlStyle}
                    />
                  </td>
                  <td style={cellStyle}>
                    <select
                      value={bank}
                      onChange={(e) =>
                        this.handlePaymentInputChange('bank', e.target.value)
                      }
                      style={formControlStyle}
                    >
                      <option value="">-select-</option>
                      <option value="SBI">SBI</option>
                      <option value="HDFC">HDFC</option>
                      <option value="ICICI">ICICI</option>
                      <option value="Axis">Axis</option>
                    </select>
                  </td>
                  <td style={cellStyle}>
                    <input
                      type="text"
                      value={balance}
                      readOnly
                      style={formControlStyle}
                    />
                  </td>
                </tr>
              </tbody>
              <div style={buttonGroupStyle}>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '20px' }}
                >
                  <label style={{ marginBottom: 0 }}>Tax Type: </label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <label>
                      <input
                        type="radio"
                        name="taxType"
                        value="GST"
                        checked={formRow.taxType === 'GST'}
                        onChange={(e) =>
                          this.handleInputChange('taxType', e.target.value)
                        }
                      />{' '}
                      GST
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="taxType"
                        value="IGST"
                        checked={formRow.taxType === 'IGST'}
                        onChange={(e) =>
                          this.handleInputChange('taxType', e.target.value)
                        }
                      />{' '}
                      IGST
                    </label>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={this.handleSave}
                    style={{
                      ...buttonStyle,
                      backgroundColor: '#28a745',
                      color: 'white',
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={this.handleEstimate}
                    style={{
                      ...buttonStyle,
                      backgroundColor: '#17a2b8',
                      color: 'white',
                    }}
                  >
                    Estimate
                  </button>
                  <button
                    onClick={this.handleNew}
                    style={{
                      ...buttonStyle,
                      backgroundColor: '#6c757d',
                      color: 'white',
                    }}
                  >
                    New
                  </button>
                </div>
              </div>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

// Main AddPurchase Component
class AddPurchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supplier: '',
      purchaseDate: '',
      billNo: '',
      landmark: '',
      dueAmount: '0.00',
      suppliers: [],
      loading: false,
      error: null,
      selectedSupplierDetails: null,
      purchases: [],
    };
  }

  componentDidMount() {
    // Fetch supplier data if needed
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.supplier !== this.state.supplier) {
      const selectedSupplier = this.state.suppliers.find(
        (s) => s.id === this.state.supplier
      );
      this.setState({
        dueAmount: '0.00',
        selectedSupplierDetails: selectedSupplier || null,
      });
    }
  }

  handleSupplierChange = (e) => {
    this.setState({ supplier: e.target.value });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      supplier,
      purchaseDate,
      billNo,
      landmark,
      dueAmount,
      loading,
      error,
      selectedSupplierDetails,
      suppliers,
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
          <div style={cardHeaderStyle}>New Purchase Stock</div>
          <div style={cardBodyStyle}>
            {error && (
              <div
                style={{
                  fontSize: '0.9rem',
                  marginBottom: '10px',
                  backgroundColor: '#f8d7da',
                  color: '#721c24',
                  border: '1px solid #f5c6cb',
                }}
              >
                {error}
              </div>
            )}



            {/* Supplier Details Table */}
            <div
              style={{
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
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '0.8rem',
                  }}
                >
                  <thead>
                    <tr>
                      <th style={tableHeaderStyle}>Supplier Name</th>
                      <th style={tableHeaderStyle}>Purchase Date</th>
                      <th style={tableHeaderStyle}>Bill No</th>
                      <th style={tableHeaderStyle}>Landmark</th>
                      <th style={tableHeaderStyle}>Due Amount (Rs)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={tableCellStyle}>
                        <input
                          type="text"
                          name="supplier"
                          value={
                           supplier
                          }
                          onChange={this.handleInputChange}
                          style={formInputStyle}
                        />
                      </td>
                      <td style={tableCellStyle}>
                        <input
                          type="date"
                          name="purchaseDate"
                          value={purchaseDate}
                          onChange={this.handleInputChange}
                          style={formInputStyle}
                        />
                      </td>
                      <td style={tableCellStyle}>
                        <input
                          type="text"
                          name="billNo"
                          value={billNo}
                          onChange={this.handleInputChange}
                          style={formInputStyle}
                        />
                      </td>
                      <td style={tableCellStyle}>
                        <input
                          type="text"
                          name="landmark"
                          value={landmark}
                          onChange={this.handleInputChange}
                          style={formInputStyle}
                        />
                      </td>
                      <td style={tableCellStyle}>
                        <input
                          type="number"
                          name="dueAmount"
                          value={dueAmount}
                          onChange={this.handleInputChange}
                          style={formInputStyle}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <PurchaseItemsSection
              setParentBalance={(value) => this.setState({ dueAmount: value })}
              supplierID={supplier}
              purchaseDate={purchaseDate}
              billNo={billNo}
              dueAmount={dueAmount}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default AddPurchase;

