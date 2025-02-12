export const Gen = () => {
  const max_size = 61;
  const startRow = 1;
  const startCol = 1;

  const direction = [
    [0, -2],
    [2, 0],
    [0, 2],
    [-2, 0],
  ];

  const frontier: Array<number[]> = [];

  const grid = Array(max_size)
    .fill("")
    .map(() => Array(max_size).fill(1));

  const isValidWall = (row: number, col: number) =>
    row > 0 &&
    col > 0 &&
    row < max_size - 1 &&
    col < max_size - 1 &&
    grid[row][col] === 1;

  for (const [r, c] of direction) {
    const newRow = startRow + r;
    const newCol = startCol + c;

    if (isValidWall(newRow, newCol)) {
      frontier.push([newRow, newCol, startRow, startCol]);
    }
  }

  while (frontier.length) {
    const randomIndex = Math.floor(Math.random() * frontier.length);
    const [row, col, prevRow, prevCol] = frontier.splice(randomIndex, 1)[0];

    if (grid[row][col] === 1) {
      grid[row][col] = 0;
      grid[(row + prevRow) / 2][(col + prevCol) / 2] = 0;
    }

    for (const [r, c] of direction) {
      const newRow = row + r;
      const newCol = col + c;
      if (isValidWall(newRow, newCol)) {
        frontier.push([newRow, newCol, row, col]);
      }
    }
  }

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${max_size},20px)`,
        }}
      >
        {grid
          .flatMap((e) => e)
          .map((item, index) => (
            <span
              key={index}
              style={{
                display: "inline-block",
                height: "20px",
                width: "20px",
                backgroundColor: item === 1 ? "black" : "white",
              }}
            ></span>
          ))}
      </div>
    </div>
  );
};
