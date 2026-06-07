# Grid Maker (Made in pure JavaScript)
<br>

## Overview

At its core, this project uses the Canvas API (2D) to draw a grid of squares on which you can draw in. It has configuration modules for configuring the grid to your liking.

It has a game loop with recursive logic when calling the requestAnimationFrame API for drawing the squares and the grid.

For game state, it uses an internal class called GameState. It acts as a container to store variables useful for all classes in the codebase.

## Original Objective

This project was originally meant to be a game fully made with the Canvas API. No framework in mind. However, as I developed it, I turned this project into a pixel art maker! For now, its just a place where I can improve my math skills. 

Since everything is made from "scratch" using the Canvas API, all concepts I implement need to be tied with math behind it.

## Lessons
As I develop this project, I am starting to see a contrast between on how we use modules in JS for making these types of respective projects. The contrast begins on the decision between declaring a single variable that holds the class instance, or just creating the class. Its almost like choosing between a singleton, or a reusable class. Architectural decisions like this are important.
