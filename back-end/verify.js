import jwt from 'jsonwebtoken';

try {
  const decoded = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJqYXlhcmFtYWtyaXNobmFuMjYwNUBnbWFpbC5jb20iLCJpYXQiOjE3MjQ0OTU1NjgsImV4cCI6MTcyNDU4MTk2OH0.TtDGk3ckUtcjq__6zNCqesHWFFhC0TjTTgeESsJxVa4", "sdbckjvsdvkjsdvjkbddvjbejb78323");
  console.log("Token is valid:", decoded);
} catch (error) {
  console.error("Token validation failed:", error.message);
}
