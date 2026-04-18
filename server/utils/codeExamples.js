export const sampleCodes = {
  javascript: `function calculateTotal(items, tax, discount, shipping, coupon, membership) {
  let total = 0;
  
  if (items && items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].price) {
        if (items[i].quantity) {
          total += items[i].price * items[i].quantity;
        }
      }
    }
  }
  
  if (tax) {
    total = total + (total * tax);
  }
  
  if (discount) {
    total = total - discount;
  }
  
  return total;
}`,

  react: `import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/users/' + userId)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}`,

  typescript: `interface User {
  id: number;
  name: string;
  email: string;
}

function processUsers(users: User[]): void {
  for (let i = 0; i < users.length; i++) {
    if (users[i]) {
      if (users[i].email) {
        if (users[i].email.includes('@')) {
          console.log(users[i].name);
        }
      }
    }
  }
}`
};
