export function timeAgo(timestamp: string): string {
  const now = new Date();
  const commentTime = new Date(timestamp);
  const diffInMs = now.getTime() - commentTime.getTime(); // Difference in milliseconds
  const diffInMinutes = Math.floor(diffInMs / 60000); // Convert to minutes

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  } else {
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  }
}
