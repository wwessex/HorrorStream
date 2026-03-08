import { useState, KeyboardEvent } from 'react';

type Props = {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  suggestions?: readonly string[];
};

export default function TagInput({ label, values, onChange, placeholder, suggestions }: Props) {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !values.includes(trimmed)) {
      onChange([...values, trimmed]);
    }
    setInput('');
    setShowSuggestions(false);
  };

  const removeTag = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (input.trim()) addTag(input);
    } else if (e.key === 'Backspace' && !input && values.length) {
      removeTag(values.length - 1);
    }
  };

  const filteredSuggestions = suggestions?.filter(
    (s) => s.toLowerCase().includes(input.toLowerCase()) && !values.includes(s)
  );

  return (
    <div className="tag-input-wrapper">
      <label className="admin-label">{label}</label>
      <div className="tag-input-container">
        {values.map((tag, i) => (
          <span key={i} className="tag">
            {tag}
            <button type="button" className="tag-remove" onClick={() => removeTag(i)}>
              &times;
            </button>
          </span>
        ))}
        <input
          className="tag-input"
          value={input}
          onChange={(e) => { setInput(e.target.value); setShowSuggestions(true); }}
          onKeyDown={onKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={values.length === 0 ? placeholder : ''}
        />
      </div>
      {showSuggestions && filteredSuggestions && filteredSuggestions.length > 0 && input && (
        <ul className="tag-suggestions">
          {filteredSuggestions.slice(0, 6).map((s) => (
            <li key={s} onMouseDown={() => addTag(s)}>{s}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
