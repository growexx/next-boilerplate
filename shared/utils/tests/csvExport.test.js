import { exportJsonAsCSV } from '../csvExport'
import { FIELDS_FOR_CSV, CSV_FILE_NAME } from '@page-components/export-data-to-csv/constants'

global.URL.createObjectURL = jest.fn()

describe('Export Data', () => {
  test('should return csv file', () => {
    expect(
      exportJsonAsCSV(
        [
          {
            key: '1',
            name: 'James Brown',
            age: 32,
            address: 'California Street'
          },
          {
            key: '2',
            name: 'Marshall Black',
            age: 42,
            address: 'Union Square'
          },
          {
            key: '3',
            name: 'Joe gold',
            age: 32,
            address: 'Avengers Tower'
          }
        ],
        FIELDS_FOR_CSV,
        CSV_FILE_NAME
      )
    ).toBe()
  })
})
