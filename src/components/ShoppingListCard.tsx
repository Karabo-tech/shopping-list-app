import React from 'react';
import type { ShoppingList } from '../types';
import styles from './ShoppingListCard.module.css';

interface ShoppingListCardProps {
  list: ShoppingList;
  onEdit: (list: ShoppingList) => void;
  onDelete: (id: number) => void;
  onShare: (id: number) => void;
}

class ShoppingListCard extends React.Component<ShoppingListCardProps> {
  handleEdit = () => {
    this.props.onEdit(this.props.list);
  };

  handleDelete = () => {
    this.props.onDelete(this.props.list.id!);
  };

  handleShare = () => {
    this.props.onShare(this.props.list.id!);
  };

  render() {
    const { list } = this.props;
    return (
      <div className={styles.card}>
        {list.image && <img src={list.image} alt={list.name} className={styles.image} />}
        <h3>{list.name}</h3>
        <p>Quantity: {list.quantity}</p>
        <p>Category: {list.category}</p>
        {list.notes && <p>Notes: {list.notes}</p>}
        <p>Date Added: {new Date(list.dateAdded).toLocaleDateString()}</p>
        <div className={styles.actions}>
          <button onClick={this.handleEdit} className={styles.button}>
            Edit
          </button>
          <button onClick={this.handleDelete} className={`${styles.button} ${styles.delete}`}>
            Delete
          </button>
          <button onClick={this.handleShare} className={styles.button}>
            Share
          </button>
        </div>
      </div>
    );
  }
}

export default ShoppingListCard;