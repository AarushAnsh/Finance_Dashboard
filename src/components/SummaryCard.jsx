function SummaryCard({ title, value }) {
  return (
    <article className="summary-card">
      <p className="summary-title">{title}</p>
      <h3 className="summary-value">{value}</h3>
    </article>
  );
}

export default SummaryCard;
