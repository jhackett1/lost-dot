const CompletionMeter = ({ completion }) => {
  const size = 200
  const thickness = 25
  const radius = size * 0.435
  const circumference = 2 * Math.PI * radius
  const strokeOffset = circumference * (1 - completion)

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="completion-meter"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        strokeWidth={thickness}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeOffset}
      />
      <text x={size / 2} y={(size / 2) * 1.05}>
        {Math.round(completion * 100)}%
      </text>
      <text x={size / 2} y={(size / 2) * 1.3}>
        complete
      </text>
    </svg>
  )
}

export default CompletionMeter
