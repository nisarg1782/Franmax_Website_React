import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function CategoryPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const mas_cat = params.get("mas_cat");
  const cat = params.get("cat");
  const sub = params.get("sub");

  const [data, setData] = useState([]);

  useEffect(() => {
    let url = "http://localhost/react-api/get-filtered-brands.php?";
    if (mas_cat) url += `mas_cat=${mas_cat}&`;
    if (cat) url += `cat=${cat}&`;
    if (sub) url += `sub=${sub}&`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [mas_cat, cat, sub]);

  return (
    <div>
      <h2>Products List</h2>
      {data.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {data.map((p) => (
            <li key={p.id}>{p.product_name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
