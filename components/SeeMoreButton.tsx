const SeeMoreButton = props => (
  <button className="admin-table__see-more" {...props}>
    <svg width="13" height="18" viewBox="0 0 13 18" fill="none">
      <path d="M2 1.5L9.5 9L2 16.5" stroke="white" stroke-width="4" />
    </svg>

    <span className="visually-hidden">See more</span>
  </button>
)

export default SeeMoreButton
