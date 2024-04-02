# Lab 5

This is the repository containing example implementations of API usage for Lab 5 for CPRG-218.

## Instructions

This repository demonstrates two ways you could integrate an API to add interactivity to your web page, as well as an enhancement which adds additional interactivity if desired.

1. Using javascript, fetch an API of your choice.

2. Using javascript and HTML, choose one of the following options to implement:
    - Select at least three data endpoints and render the content in a flexible card layout.
    - Add a dropdown input (`<select`>) and a button element to the page, allowing users to change the API endpoint (for example, city names for a weather API), and update the content on the page when the user clicks the button.

3. Use CSS to style the content and create a responsive layout.

Recommended APIs you can use:
- https://pokeapi.co/api/v2/pokemon/ (free without an account or API key)
- https://weatherstack.com/ (sign up for a free account to get an API key)
- https://newsapi.org/ (sign up for a free account to get an API key)

## Files

- index.html: This is the page to be analyzed.
- scripts.js: Used in index.html
- styles.css: Used in index.html
- README.md: The file you are reading right now.

## How to use

Install node and npm on your system.  Then, use the command `npx http-server .` in this directory in order to start a web server at http://localhost:8080.  The web server will serve `index.html`.
