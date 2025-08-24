import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import type { RootState } from '../redux/store';
import {
  fetchLists,
  addList,
  updateList,
  deleteList,
  setSearchQuery,
  setSortBy,
} from '../redux/slices/shoppingListSlice';
import ShoppingListCard from '../components/ShoppingListCard';
import type { ShoppingList } from '../types';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const user = useSelector((state: RootState) => state.auth.user);
  const { lists, searchQuery, sortBy } = useSelector((state: RootState) => state.shoppingList);
  const [form, setForm] = useState<ShoppingList>({
    userId: user?.id || 0,
    name: '',
    quantity: 1,
    category: '',
    notes: '',
    image: '',
    dateAdded: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user?.id !== undefined) {
      dispatch(fetchLists(user.id) as any);
    }
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'dateAdded';
    dispatch(setSearchQuery(search));
    dispatch(setSortBy(sort));
  }, [dispatch, user, searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateList(form) as any);
    } else {
      dispatch(addList(form) as any);
    }
    setForm({ userId: user?.id || 0, name: '', quantity: 1, category: '', notes: '', image: '', dateAdded: '' });
    setIsEditing(false);
  };

  const handleEdit = (list: ShoppingList) => {
    setForm(list);
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteList(id) as any);
  };

  const handleShare = (id: number) => {
    const shareUrl = `${window.location.origin}/shared-list/${id}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Share URL copied to clipboard!');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setSearchQuery(value));
    setSearchParams({ search: value, sort: sortBy });
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch(setSortBy(value));
    setSearchParams({ search: searchQuery, sort: value });
  };

  const filteredLists = lists
    .filter((list) => list.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    });

  return (
    <div className={styles.container}>
      <h2>Shopping Lists</h2>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearch}
          className={styles.search}
          aria-label="Search shopping lists"
        />
        <select value={sortBy} onChange={handleSort} className={styles.sort} aria-label="Sort shopping lists">
          <option value="name">Name</option>
          <option value="category">Category</option>
          <option value="dateAdded">Date Added</option>
        </select>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Item Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            aria-label="Item name"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            min="1"
            required
            aria-label="Quantity"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            aria-label="Category"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="notes">Notes (optional)</label>
          <input
            type="text"
            id="notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            aria-label="Notes"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="image">Image URL (optional)</label>
          <input
            type="url"
            id="image"
            name="image"
            value={form.image}
            onChange={handleChange}
            aria-label="Image URL"
          />
        </div>
        <button type="submit" className={styles.submit}>
          {isEditing ? 'Update List' : 'Add List'}
        </button>
      </form>
      <div className={styles.lists}>
        {filteredLists.map((list) => (
          <ShoppingListCard
            key={list.id}
            list={list}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onShare={handleShare}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;