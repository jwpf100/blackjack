## Blackjack Card Game

A recreation of blackjack using vanilla CSS, HTML and JavaScript for logic. Responsive layout.

## Project Status

Complete

## Project Screen Shots

#### Example:   

<img src="https://user-images.githubusercontent.com/64267174/106170998-f9d71100-6188-11eb-9410-b312ad96b937.png" height="500"> <img src="https://user-images.githubusercontent.com/64267174/106170641-8df4a880-6188-11eb-8def-01625321b6d8.png" height="500"> <img src="https://user-images.githubusercontent.com/64267174/106170695-9f3db500-6188-11eb-83d2-a6063f95b4e3.png" height="500"> 

## Installation and Setup Instructions

Clone down this repository.  Open index.html with your browser.  

Alternatively the project is hosted [here](https://josephfletcher.co.uk/blackjack).

## Reflection

This project was created in a few days as a response to a bootcamp entry challenge to create a Blackjack game using on vanilla HTML, CSS and JavaScript.  Setting up the functionality in JavaScript was challenging as the first significant project I'd coded from scratch, and there are areas of code that I would rewrite if I were to redo the project.  

One area that was particularly challenging at the time was getting the delays between cards being turned over to correspond with the messages being displayed.  It was a good opportunity to learn about the JavaScript event loop and call stack!  Subsequantly finding the balance between the cards being dealt too quickly and too slowly was also a consideration.  The solution I went with was to include some element of user control e.g. clicking to get the dealer to take their go rather than launching straight into it after the player go, and as a fallback to include controls so if it was too fast or slow the user could switch it up. 

The control panel also solved an issue with github pages where the images took longer to load, than the cards took to get turned over, so there's an option to play without images, replacing it with css styling. 

If I was to do this again, I would probably just use React, which I think would lend itself much better to this task.
