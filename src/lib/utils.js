export function formatMessageTime(date) {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      // hour: '2-digit',
      // minute: '2-digit',
      hour12: true,
    }).replace(',', '').replace(':00', '');
  }