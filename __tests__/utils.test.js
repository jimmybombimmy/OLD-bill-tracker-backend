const {convertTimestampToDate} = require('../dist/db/seed-files/utils.js')

describe("convertTimestampToDate", () => {
    test('result comes back as a date object', () => {
        const timestamp = 1557572706232;
        const convert = convertTimestampToDate(timestamp)
        expect(isNaN(convert)).toBe(false)
        expect(typeof convert).toBe('object')
    })

    //Warning: This test will fail if clock not set to British Summer Time
    test.skip('function is the correct time', () => {
        const timestamp = 1557572706232;
        const convert = convertTimestampToDate(timestamp)
        const result = convert.toString()
        expect(result).toBe('Sat May 11 2019 12:05:06 GMT+0100 (British Summer Time)')
        
    })
})

