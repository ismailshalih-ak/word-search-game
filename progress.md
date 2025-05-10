# Feature Checklist – Word Search Game (Ordered by Development Flow)

## Player Login & Setup
- [ ] Show login screen for player to input their name
- [ ] Load configuration from a JSON file
- [ ] Filter playable themes based on `playerName`
- [ ] Theme selector (shows only themes allowed for player)

## Core Gameplay
- [ ] Display a grid with randomly placed words
- [ ] Support horizontal, vertical, and diagonal word placement
- [ ] Allow selection of grid cells to form words
- [ ] Detect correct word selections
- [ ] Highlight found words in the grid
- [ ] Display only found words (not full word list)
- [ ] Countdown timer for game session

## Persistence
- [ ] Save progress (found words, time remaining) to `localStorage`
- [ ] Restore progress on page reload
- [ ] Reset progress when switching themes or players

## Completion & Feedback
- [ ] Show `completionMessage` when all words in a theme are found
- [ ] Game over screen when timer runs out