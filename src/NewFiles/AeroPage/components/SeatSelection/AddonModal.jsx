import "./AddonModal.css";

const AddonModal = ({
  open,
  title,
  options,
  selectedOption,
  onSelect,
  onClose,
  onSave,
}) => {
  if (!open) return null;

  return (
    <div
      className="addon-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="addon-modal" onClick={(e) => e.stopPropagation()}>
        <div className="addon-header">
          <h2>{title}</h2>

          <button type="button" className="addon-close" onClick={onClose}>
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div className="addon-body">
          {options.map((option) => (
            <button
              type="button"
              key={option.id}
              className={`addon-card ${
                selectedOption.id === option.id ? "selected" : ""
              }`}
              onClick={() => onSelect(option)}
            >
              <div className="addon-icon">
                <i className={`bi ${option.icon}`} />
              </div>

              <div className="addon-info">
                <h4>{option.title}</h4>
                <p>{option.desc}</p>
              </div>

              <div className="addon-price">
                {option.price === 0 ? "Free" : `₹${option.price}`}
              </div>
            </button>
          ))}
        </div>

        <div className="addon-footer">
          <button type="button" className="addon-cancel" onClick={onClose}>
            Cancel
          </button>

          <button
            type="button"
            className="addon-save"
            disabled={!selectedOption}
            onClick={onSave}
          >
            Save Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddonModal;
