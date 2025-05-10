Create a browser-based word search game using React (or Vanilla JS if specified otherwise), where the puzzle is generated from a JSON configuration file with the following structure:

{
  "playerName": "JohnDoe",
  "duration": 300,
  "themes": [
    {
      "themeName": "Fruits",
      "words": ["apple", "banana", "grape", "mango"],
      "completionMessage": "You found all the fruits!"
    }
  ]
}

Features & Requirements:
- Authentication:
    - Prompt the user to enter their name.
    - Only allow access to the game if the input matches playerName from the config.

- Game Setup:
    - After login, show the user a list of available themes from the config.
    - On theme selection, start the game with a timer based on duration (in seconds).
    - Generate a word search grid containing the theme’s words, placed randomly:
        - Directions: horizontal, vertical, diagonal (both forward and backward).
        - Fill unused cells with random letters.

- Gameplay:
    - Allow the player to select letters (click or drag).
    - When a valid word is found:
        - Visually highlight it in the grid.
        - Add it to the list of found words only (do not display all words upfront).
    - When all words are found or time runs out:
        - Show the completionMessage for that theme.

- Persistence:
    - Save game progress in localStorage:
        - Found words
        - Remaining time
        - Selected theme
    - On reload, resume from where the user left off.

- UX:
    - Responsive layout (desktop and mobile).
    - Clean and simple design.
    - Modular, maintainable code (e.g., GridGenerator, WordFinder, Timer, StorageHandler).

- Optional but nice to have:
    - Add subtle animations for found words.
    - Allow restarting the same theme or picking a new one after finishing.