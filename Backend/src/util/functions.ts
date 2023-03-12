export function hasExpired(currentTime: string, expiredAt: string): boolean {
 
  const [currentHr, currentMin, currentSec] = currentTime.split(':').map(Number);
  const [expiredHr, expiredMin, expiredSec] = expiredAt.split(':').map(Number);

  if (currentHr > expiredHr) {
    return true;
  } else if (currentHr === expiredHr) {
    if (currentMin > expiredMin) {
      return true;
    } else if (currentMin === expiredMin) {
      if (currentSec >= expiredSec) {
        return true;
      }
    }
  }

  return false;
}
