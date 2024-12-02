const { calTimekeeping } = require('@service');

describe('Timekeeping Service', () => {
  describe('calTimekeeping', () => {
    test('Làm đúng giờ', () => {
      const { late, soon, totalTimeReality, totalWorkReality, summary } = calTimekeeping(
        { timeStart: '08:30', timeEnd: '17:30', timeBreakStart: '12:30', timeBreakEnd: '13:30', totalTime: 8, totalWork: 1 },
        '08:30',
        '17:30'
      );
      expect(late).toBe(0);
      expect(soon).toBe(0);
      expect(totalTimeReality).toBe(8);
      expect(totalWorkReality).toBe(1);
      expect(summary).toBe(1);
    });

    test('Không checkout', () => {
      const { totalTimeReality, totalWorkReality, summary } = calTimekeeping(
        { timeStart: '08:30', timeEnd: '17:30', timeBreakStart: '12:30', timeBreakEnd: '13:30', totalTime: 8, totalWork: 1 },
        '08:30'
      );
      expect(totalTimeReality).toBe(0);
      expect(totalWorkReality).toBe(0);
      expect(summary).toBe(0);
    });

    test('Không checkin', () => {
      const { totalTimeReality, totalWorkReality, summary } = calTimekeeping(
        { timeStart: '08:30', timeEnd: '17:30', timeBreakStart: '12:30', timeBreakEnd: '13:30', totalTime: 8, totalWork: 1 },
        undefined,
        '17:30'
      );
      expect(totalTimeReality).toBe(0);
      expect(totalWorkReality).toBe(0);
      expect(summary).toBe(0);
    });

    test('Đi sớm, về muộn', () => {
      const { late, soon, totalTimeReality, totalWorkReality, summary } = calTimekeeping(
        { timeStart: '08:30', timeEnd: '17:30', timeBreakStart: '12:30', timeBreakEnd: '13:30', totalTime: 8, totalWork: 1 },
        '08:25',
        '17:35'
      );
      expect(late).toBe(0);
      expect(soon).toBe(0);
      expect(totalTimeReality).toBe(8);
      expect(totalWorkReality).toBe(1);
      expect(summary).toBe(1);
    });

    test('Đi muộn 5p', () => {
      const { late, soon, totalTimeReality, totalWorkReality, summary } = calTimekeeping(
        { timeStart: '08:30', timeEnd: '17:30', timeBreakStart: '12:30', timeBreakEnd: '13:30', totalTime: 8, totalWork: 1 },
        '08:35',
        '17:30'
      );
      expect(late).toBe(0.08);
      expect(soon).toBe(0);
      expect(totalTimeReality).toBe(7.92);
      expect(totalWorkReality).toBe(0.99);
      expect(summary).toBe(0.99);
    });

    test('Đi muộn về sớm', () => {
      const { late, soon, totalTimeReality, totalWorkReality, summary } = calTimekeeping(
        { timeStart: '08:30', timeEnd: '17:30', timeBreakStart: '12:30', timeBreakEnd: '13:30', totalTime: 8, totalWork: 1 },
        '08:40',
        '17:20'
      );
      expect(late).toBe(0.17);
      expect(soon).toBe(0.17);
      expect(totalTimeReality).toBe(7.66);
      expect(totalWorkReality).toBe(0.96);
      expect(summary).toBe(0.96);
    });

    test('Đến làm trong thời gian nghỉ', () => {
        const { late, soon, totalTimeReality, totalWorkReality, summary } = calTimekeeping(
          { timeStart: '08:30', timeEnd: '17:30', timeBreakStart: '12:30', timeBreakEnd: '13:30', totalTime: 8, totalWork: 1 },
          '13:00',
          '17:30'
        );
        expect(late).toBe(4);
        expect(soon).toBe(0);
        expect(totalTimeReality).toBe(4);
        expect(totalWorkReality).toBe(0.5);
        expect(summary).toBe(0.5);
      });
  });
});
