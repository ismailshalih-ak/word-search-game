# Feature Checklist – Word Search Game (Ordered by Development Flow)

## Player Login & Setup
- [x] Show login screen for player to input their name
- [x] Load configuration from a JSON file
- [x] Filter playable themes based on `playerName`
- [x] Theme selector (shows only themes allowed for player)

## Core Gameplay
- [x] Display a grid with randomly placed words
- [x] Support horizontal, vertical, and diagonal word placement
- [x] Allow selection of grid cells to form words
- [x] Detect correct word selections
- [x] Highlight found words in the grid
- [x] Display only found words (not full word list)
- [x] Countdown timer for game session

## Persistence
- [ ] Save progress (found words, time remaining) to `localStorage`
- [ ] Restore progress on page reload
- [ ] Reset progress when switching themes or players

## Completion & Feedback
- [ ] Show `completionMessage` when all words in a theme are found
- [ ] Game over screen when timer runs out
