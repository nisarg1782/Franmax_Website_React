import React, { useEffect, useState } from 'react';
import { getApiUrl } from '../../utils/api';


export default function CategoryDrawer() {
  const [masterCategories, setMasterCategories] = useState([]);
  const [categories, setCategories] = useState({});
  const [subcategories, setSubcategories] = useState({});

  const [activePanel, setActivePanel] = useState('master');
  const [selectedMaster, setSelectedMaster] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Search and visible count per panel
  const [searchTerm, setSearchTerm] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [subSearch, setSubSearch] = useState('');
  const [visibleMasters, setVisibleMasters] = useState(4);
  const [visibleCategories, setVisibleCategories] = useState(4);
  const [visibleSubcategories, setVisibleSubcategories] = useState(4);

  useEffect(() => {
    fetch(getApiUrl('get-master-category.php'))
      .then(res => res.json())
      .then(data => Array.isArray(data) && setMasterCategories(data));
  }, []);

  const handleMasterClick = (master) => {
    setSelectedMaster(master);
    setActivePanel('category');
    setCategorySearch('');
    setVisibleCategories(4);

    if (!categories[master.mas_cat_id]) {
      fetch(getApiUrl(`get-category.php?mas_cat_id=${master.mas_cat_id}`))
        .then(res => res.json())
        .then(data => {
          setCategories(prev => ({ ...prev, [master.mas_cat_id]: data }));
        });
    }
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setActivePanel('subcategory');
    setSubSearch('');
    setVisibleSubcategories(4);

    if (!subcategories[cat.cat_id]) {
      fetch(getApiUrl(`get-sub-category.php?cat_id=${cat.cat_id}`))
        .then(res => res.json())
        .then(data => {
          setSubcategories(prev => ({ ...prev, [cat.cat_id]: data }));
        });
    }
  };

  const goBack = () => {
    if (activePanel === 'subcategory') {
      setActivePanel('category');
    } else if (activePanel === 'category') {
      setActivePanel('master');
    }
  };

  // Filter logic
  const filteredMasters = masterCategories.filter(cat =>
    cat.mas_cat_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const displayedMasters = filteredMasters.slice(0, visibleMasters);

  const categoryList = categories[selectedMaster?.mas_cat_id] || [];
  const filteredCategories = categoryList.filter(cat =>
    cat.cat_name.toLowerCase().includes(categorySearch.toLowerCase())
  );
  const displayedCategories = filteredCategories.slice(0, visibleCategories);

  const subcategoryList = subcategories[selectedCategory?.cat_id] || [];
  const filteredSubcategories = subcategoryList.filter(sub =>
    sub.subcat_name.toLowerCase().includes(subSearch.toLowerCase())
  );
  const displayedSubcategories = filteredSubcategories.slice(0, visibleSubcategories);

  return (
    <div className="drawer-container">
      {/* MASTER CATEGORY PANEL */}
      <div className={`drawer-panel ${activePanel === 'master' ? 'active' : ''}`}>
        <h4>Explore Categories</h4>

        <input
          type="text"
          placeholder="Search master categories..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setVisibleMasters(4);
          }}
        />

        <ul className="drawer-list">
          {displayedMasters.map(master => (
            <li key={master.mas_cat_id} onClick={() => handleMasterClick(master)}>
              {master.mas_cat_name} <span className="arrow">›</span>
            </li>
          ))}
        </ul>

        {visibleMasters < filteredMasters.length && (
          <div className="load-more-wrapper">
            <button className="load-more-btn" onClick={() => setVisibleMasters(v => v + 4)}>
              Load More
            </button>
          </div>
        )}
      </div>

      {/* CATEGORY PANEL */}
      <div className={`drawer-panel ${activePanel === 'category' ? 'active' : ''}`}>
        <div className="drawer-header">
          <button onClick={goBack}>← Back</button>
          <h4>{selectedMaster?.mas_cat_name}</h4>
        </div>

        <input
          type="text"
          placeholder="Search categories..."
          className="search-input"
          value={categorySearch}
          onChange={(e) => {
            setCategorySearch(e.target.value);
            setVisibleCategories(4);
          }}
        />

        <ul className="drawer-list">
          {displayedCategories.map(cat => (
            <li key={cat.cat_id} onClick={() => handleCategoryClick(cat)}>
              {cat.cat_name} <span className="arrow">›</span>
            </li>
          ))}
        </ul>

        {visibleCategories < filteredCategories.length && (
          <div className="load-more-wrapper">
            <button className="load-more-btn" onClick={() => setVisibleCategories(v => v + 4)}>
              Load More
            </button>
          </div>
        )}
      </div>

      {/* SUBCATEGORY PANEL */}
      <div className={`drawer-panel ${activePanel === 'subcategory' ? 'active' : ''}`}>
        <div className="drawer-header">
          <button onClick={goBack}>← Back</button>
          <h4>{selectedCategory?.cat_name}</h4>
        </div>

        <input
          type="text"
          placeholder="Search subcategories..."
          className="search-input"
          value={subSearch}
          onChange={(e) => {
            setSubSearch(e.target.value);
            setVisibleSubcategories(4);
          }}
        />

        <ul className="drawer-list">
          {displayedSubcategories.map(sub => (
            <li key={sub.subcat_id}>
              <a href="#">{sub.subcat_name}</a>
            </li>
          ))}
        </ul>

        {visibleSubcategories < filteredSubcategories.length && (
          <div className="load-more-wrapper">
            <button className="load-more-btn" onClick={() => setVisibleSubcategories(v => v + 4)}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
