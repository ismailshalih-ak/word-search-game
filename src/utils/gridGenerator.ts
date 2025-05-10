const generateWordSearch = (words: string[], gridSize: number): string[][] => {
  const grid: string[][] = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));

  // Function to place a word in the grid
  const placeWord = (word: string): boolean => {
    const directions = [
      { x: 1, y: 0 },  // Horizontal
      { x: 0, y: 1 },  // Vertical
      { x: 1, y: 1 },  // Diagonal
      { x: -1, y: 0 }, // Horizontal Backwards
      { x: 0, y: -1 }, // Vertical Backwards
      { x: -1, y: -1 },// Diagonal Backwards
      { x: 1, y: -1 }, // Anti-Diagonal
      { x: -1, y: 1 }  // Anti-Diagonal Backwards
    ];

    // Try to place the word
    for (let attempt = 0; attempt < 100; attempt++) {
      const direction = directions[Math.floor(Math.random() * directions.length)];
      let startX = Math.floor(Math.random() * gridSize);
      let startY = Math.floor(Math.random() * gridSize);

      // Check if the word fits in the grid with the given direction and starting point
      let fits = true;
      for (let i = 0; i < word.length; i++) {
        const x = startX + i * direction.x;
        const y = startY + i * direction.y;

        if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) {
          fits = false;
          break;
        }

        if (grid[y][x] !== '' && grid[y][x] !== word[i]) {
          fits = false;
          break;
        }
      }

      if (fits) {
        // Place the word
        for (let i = 0; i < word.length; i++) {
          const x = startX + i * direction.x;
          const y = startY + i * direction.y;
          grid[y][x] = word[i];
        }
        return true;
      }
    }

    return false; // Word could not be placed
  };

  // Place each word in the grid
  words.forEach(word => {
    placeWord(word.toUpperCase());
  });

  // Fill empty cells with random letters
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (grid[y][x] === '') {
        grid[y][x] = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z
      }
    }
  }

  return grid;
};

export default generateWordSearch;
