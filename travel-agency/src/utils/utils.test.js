// testy funkcji formatTime.
import { formatTime } from './formatTime';

describe('utils', () => {
  describe('formatTime', () => {
  
    it('should return null if there is no arg', () => { // Czy jeśli nie podano argumentu, to funkcja zwróci null?
      expect(formatTime()).toBe(null);
    });

    it('should return null if arg is not a number', () => { // Czy jeśli podane coś innego niż liczbę, to funkcja zwróci null?
      expect(formatTime('abc')).toBe(null);
      expect(formatTime(() => {})).toBe(null);
    });

    it('should return null if arg is lower than zero', () => { // Czy jeśli podano liczbę mniejszą niż zero, to funkcja zwróci null?
      expect(formatTime(-1)).toBe(null);
      expect(formatTime(-2)).toBe(null);
    });

    it('should return time in hh:mm:ss if arg is proper', () => {
      expect(formatTime(122)).toBe('00:02:02');
      expect(formatTime(3793)).toBe('01:03:13');
      expect(formatTime(120)).toBe('00:02:00');
      expect(formatTime(3604)).toBe('01:00:04');
    });
  
  });
});

