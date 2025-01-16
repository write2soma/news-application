import React, { useEffect, useState } from 'react';

const SidebarCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = 'https://soma.rkmvivekatirtha.org/wp-json/wp/v2/categories';

    const fetchCategories = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <aside className="sidebar">
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <a href={`/category/${category.slug}`}>{category.name}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarCategories;