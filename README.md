# 🚀 Interview App

## 📚 Introduction

The Interview App is a web application designed to streamline the interview process for both interviewers and candidates. With this app, interviewers can easily upload a .csv file containing topics and questions. The platform then displays topics and three random cards with questions based on the provided data. Candidates can select a card to reveal a randomly generated question within that specific topic, creating a dynamic and engaging interview experience.

## 🎯 Goals

1. Provide a platform for interviewers to upload questions and topics.
2. Allow interviewers to choose topics and generate random questions.
3. Enable a user-friendly interface for interviewers and candidates.
4. Provide a 'multiplayer' mode for online interviews.

## ✨ Features

- 📥 Interviewer can upload a .csv file with topics and questions
- 🃏 Generate 3 random cards with topics based on the uploaded .csv file
- ❓ Show a random question in the chosen topic when a card is selected
- 🌐 'Multiplayer' mode where interviewers can share a link to the interview
- 📊 Personal dashboard to track progress and received feedback

## 🛠️ Tech Stack

- **HTML5**
- **SCSS**
- **JavaScript**
- **Vite**

## 🚀 Setup Instructions

1. Clone the repository
2. Install dependencies with `npm install`
3. Run the development server with `npm run dev`

## 🗺️ Roadmap

| Task/Feature                          | Status         | Expected(or done) Completion Date |
|---------------------------------------|----------------|-----------------------------------|
| Add header with topics & finish button| ✅ Completed   | 2023-03-18                        |
| Add cards with questions              | ✅ Completed   | 2023-03-18                        |
| Make the page responsive              | ✅ Completed   | 2023-03-18                        |
| Animate cards                         | ✅ Completed   | 2023-03-18                        |
| Rewrite styles to SASS                | ✅ Completed   | 2023-03-18                        |
| Add a drop zone, instead of greet text| ✅ Completed   | 2023-03-18                        |
| Prepare list of questions             | ✅ Completed   | 2023-03-18                        |
| Refactor click event on cards         | ✅ Completed   | 2023-04-01                        |
| Refactor pageSwitcher (dz -> cards)   | ✅ Completed   | 2023-04-12                        |
| Add icons for topics                  | ✅ Completed   | 2023-04-15                        |
| Add result form                       | ✅ Completed   | 2023-04-16                        |
| Change color on state of progress bar | ✅ Completed   | 2023-04-16                        |
| Improve questions generation          | ✅ Completed   | 2023-04-17                        |
| Style back side of cards              | ✅ Completed   | 2023-04-18                        |
| Improve card regeneration             | ✅ Completed   | 2023-04-18                        |
| Add topic--active state               | ✅ Completed   | 2023-04-18                        |
| Regenerate cards after an answer      | ✅ Completed   | 2023-04-19                        |
| Add restarting button                 | ✅ Completed   | 2023-04-20                        |
| Give each question a price            | ✅ Completed   | 2023-04-30                        |
| Save score                            | 🚧 Not Started | TBD                               |
| Save answered questions               | 🚧 Not Started | TBD                               |
| BE for uploading a CSV file           | 🚧 Not Started | TBD                               |
| Add randomizer for qs generation      | 🚧 Not Started | TBD                               |
| Show results                          | 🚧 Not Started | TBD                               |
| Add language variations               | 🚧 Not Started | TBD                               |
| Error for non-CSV on mobile           | 🚧 Not Started | TBD                               |
| Improve topics mobile (optional)      | 🚧 Not Started | TBD                               |
| Online multiplayer                    | 🚧 Not Started | TBD                               |

HW: save active topic in State
HW: rewrite switchSvg()