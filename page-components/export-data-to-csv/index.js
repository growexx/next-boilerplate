import React from 'react'
import { Button, Table } from 'antd'

import { StyledButton, StyledExport } from './StyledExport'
import { CSV_FILE_NAME, FIELDS_FOR_CSV, TABLE_COLUMNS, TABLE_DATA } from './constants'
import { exportJsonAsCSV } from '@shared/utils/csvExport'

const ExportDataToCsv = () => {
  const [selectedRows, setSelectedRows] = React.useState([])

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows)
    }
  }

  const exportDataClientSide = () => {
    exportJsonAsCSV(selectedRows, FIELDS_FOR_CSV, CSV_FILE_NAME)
  }

  /**
   * export data server side
   * const exportDataServerSide = () => {
    const payload = {
      data: this.state.selectedRows,
      fields: FIELDS_FOR_CSV,
    };
    request(API_ENDPOINTS.EXPORT_CSV, payload).then(res => {
      const downloadLink = document.createElement('a');
      downloadLink.href = res.url;
      downloadLink.download = CSV_FILE_NAME;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  };
  */

  return (
    <div>
      <StyledExport>
        <StyledButton>
          <Button data-testid="ExportButton" type="primary" onClick={exportDataClientSide} disabled={selectedRows.length === 0}>
            Export Data
          </Button>
        </StyledButton>
        <Table
          scroll={{ x: 350 }}
          data-testid="DataTable"
          pagination={false}
          rowSelection={{
            type: 'checkbox',
            ...rowSelection
          }}
          columns={TABLE_COLUMNS}
          dataSource={TABLE_DATA}
        />
      </StyledExport>
    </div>
  )
}

export default ExportDataToCsv
