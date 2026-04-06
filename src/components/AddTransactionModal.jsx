import { useState } from 'react';
import { TRANSACTION_TYPES } from '../utils/constants';

const initialFormState = {
  amount: '',
  category: '',
  type: TRANSACTION_TYPES.expense,
  date: '',
};

function AddTransactionModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState(initialFormState);

  if (!isOpen) {
    return null;
  }

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Normalize values before sending to context.
    const payload = {
      amount: Number(form.amount),
      category: form.category.trim(),
      type: form.type,
      date: form.date,
    };

    if (!payload.amount || !payload.category || !payload.date) {
      return;
    }

    onSubmit(payload);
    setForm(initialFormState);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal-card"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Add transaction"
      >
        <h3>Add Transaction</h3>

        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            Amount
            <input
              type="number"
              min="1"
              value={form.amount}
              onChange={(event) => updateField('amount', event.target.value)}
              required
            />
          </label>

          <label>
            Category
            <input
              type="text"
              value={form.category}
              onChange={(event) => updateField('category', event.target.value)}
              required
            />
          </label>

          <label>
            Type
            <select
              value={form.type}
              onChange={(event) => updateField('type', event.target.value)}
            >
              <option value={TRANSACTION_TYPES.income}>Income</option>
              <option value={TRANSACTION_TYPES.expense}>Expense</option>
            </select>
          </label>

          <label>
            Date
            <input
              type="date"
              value={form.date}
              onChange={(event) => updateField('date', event.target.value)}
              required
            />
          </label>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTransactionModal;
