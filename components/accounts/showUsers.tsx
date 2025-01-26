'use client'
import React, { useEffect, useState } from 'react';
import { AxiosReqInstance } from './utils/axiosInstance';

interface User {
  id: number;
  username: string;
  email: string;
}

export const ShowUsers = () => {
  const protectedRoute = AxiosReqInstance();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await protectedRoute.get('/api/users/list/');
        setUsers(response.data);
      } catch (error) {
        setError('Failed to show users');
        console.error('Failed to show users', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [protectedRoute]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};