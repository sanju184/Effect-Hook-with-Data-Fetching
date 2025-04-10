// Problem:
// The following React component tries to fetch data from an API but doesn’t handle the loading or error states properly.

// import React, { useEffect } from 'react';

// const UserList = () => {
// useEffect(() => {
// fetch('https://jsonplaceholder.typicode.com/users')
// .then(response => response.json())
// .then(data => {
// console.log(data); // Data is logged, but not displayed
// });
// }, []);

// return (
// <div>
// <h1>Users</h1>
// {/* Users data should be displayed here */}
// </div>
// );
// }

// export default UserList;


// Modify the code to display the fetched data (users) in the component.
// Add loading and error handling states and display appropriate messages while the data is being fetched or if an error occurs.

// Solution :

import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);       
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);      

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;