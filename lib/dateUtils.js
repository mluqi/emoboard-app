import { format, formatDistanceToNow, differenceInDays } from 'date-fns';

export const formatPostDate = (dateString) => {
  if (!dateString) {
    return '';
  }

  const postDate = new Date(dateString);
  const now = new Date();
  const daysDifference = differenceInDays(now, postDate);

  // Jika lebih dari 7 hari, tampilkan format dd/MM/yy
  if (daysDifference >= 7) {
    return format(postDate, 'dd/MM/yy');
  }

  // Jika kurang dari 7 hari, tampilkan format relatif (e.g., "5 minutes ago")
  // 'formatDistanceToNow' akan secara otomatis menangani detik, menit, jam, dan hari.
  return formatDistanceToNow(postDate, { addSuffix: true });
};

