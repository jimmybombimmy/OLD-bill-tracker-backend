const {convertTimestampToDate} = require('../dist/db/seed-files/utils.js')

describe("convertTimestampToDate", () => {
    test('check that result comes back as a date object', () => {
        const timestamp = 1557572706232;
        const result = convertTimestampToDate(timestamp)
        expect(isNaN(result)).toBe(false)
        expect(typeof result).toBe('object')
    })
})

