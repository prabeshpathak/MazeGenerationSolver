import { useState } from "react";

const max_size = 51;
const startRow = 1;
const startCol = 1;

const direction = [
  [0, -2],
  [2, 0],
  [0, 2],
  [-2, 0],
];

const isValidWall = (grid: Uint8Array<ArrayBuffer>, row: number, col: number) =>
  row > 0 &&
  col > 0 &&
  row < max_size - 1 &&
  col < max_size - 1 &&
  grid[row * max_size + col] === 1;

const generateMaze = () => {
  const frontier = new Set<string>();
  const grid = new Uint8Array(max_size * max_size).fill(1);
  for (const [r, c] of direction) {
    const newRow = startRow + r;
    const newCol = startCol + c;

    if (isValidWall(grid, newRow, newCol)) {
      frontier.add(`${newRow},${newCol},${startRow},${startCol}`);
    }
  }
  while (frontier.size > 0) {
    const randomIndex = Math.floor(Math.random() * frontier.size);
    const [row, col, prevRow, prevCol] = [...frontier][randomIndex]
      .split(",")
      .map(Number);

    frontier.delete(`${row},${col},${prevRow},${prevCol}`);

    if (grid[row * max_size + col] === 1) {
      grid[row * max_size + col] = 0;
      grid[((row + prevRow) / 2) * max_size + (col + prevCol) / 2] = 0;
    }

    for (const [r, c] of direction) {
      const newRow = row + r;
      const newCol = col + c;
      if (isValidWall(grid, newRow, newCol)) {
        frontier.add(`${newRow},${newCol},${row},${col}`);
      }
    }
  }
  return grid;
};

export const Gen = () => {
  const m = generateMaze();
  const [maze, setMaze] = useState(m);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      <button
        style={{ alignSelf: "flex-start" }}
        onClick={() => setMaze(generateMaze())}
      >
        Generate Maze
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${max_size}, 20px)`,
        }}
      >
        {Array.from(maze).map((item, index) => (
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
