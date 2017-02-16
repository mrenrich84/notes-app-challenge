# Notes App Challenge

#### Makers Academy Week 7 Project Challenge:
Create a single-page web application using only front-end javascript. No libraries allowed!

## User Stories
```
As a programmer
I can see a list of my notes, where each note is abbreviated to the first 20 characters
So I can find the one I want
```
```
As a programmer
I can create a new note
So I can record something I need to remember
```
```
As a programmer
I can see the full text of an individual note on its own page
So I can see all the information in the note
```

## Approach

#### Planning & App Design

Our first challenge was to consider the constraints that had been placed on the project and plan our approach accordingly. We were required to build the web application using only front-end javascript and no external libraries. This meant no testing library or jQuery. We quickly came to the following decisions:
- To be able to create our app using Test Driven Development, we would need to create our own testing library.
- Our front-end files would be served from a simple node.js server (the use of the http-server and path packages was permitted).
- We would attempt to implement an MVC-style application framework within the front-end javascript.

This was followed by an extensive white-boarding session!

![High level route descs](https://github.com/rkclark/notes-app-challenge/images/high_level_route_descriptions.jpg)

![High level route descs](https://github.com/rkclark/notes-app-challenge/images/zoomed_out_dom_routes.jpg)

We then translated our scribblings into a planned MVP sprint in our [Taiga project.](https://tree.taiga.io/project/rkclark-notes-app/)

#### Development

Our team of four split into twos to pair program the development tasks listed on our [scrum board](https://tree.taiga.io/project/rkclark-notes-app/taskboard/mvp-93?kanban-status=890406). Work on the testing library began immediately while the node.js server and application skeleton was built.

Initial TDD relied on basic 'isEqual' tests initially and was then extended to include other methods as the testing library expanded in functionality.

## Results

We successfully delivered our MVP, with the fulfilling the specified user stories and creating the test library.

We chose to focus the MVP on achieving these goals and, as such, the app currently has a very basic front-end appearance.

## Installation

- Install `node.js`
- Clone this repo
- Navigate to project root folder
- Run `npm install`
- Run `nodemon server.js` to run the web server
- Open `http://localhost:3000/` in your browser to access the app

## Usage

#### Running the Tests

The tests are run every time the app loads and the results are output to the browser console.

#### Using the App

- Enter the next of your new note in the New Note text field. Click Create.

![Create new](https://github.com/rkclark/notes-app-challenge/images/create_new.png)

- You will now see your new note listed (only first 20 chars are shown)

![List new](https://github.com/rkclark/notes-app-challenge/images/list_new.png)

- Click your new note to see the full text

![see new](https://github.com/rkclark/notes-app-challenge/images/see_new.png)

- You can click back to the home page and then add as many notes as you like!

![list many](https://github.com/rkclark/notes-app-challenge/images/list_many.png)

If you refresh your browser, all your notes will be gone!

#### Team

- [Barbara Shinkarenko](https://github.com/varvarra)
- [Rick Clark](https://github.com/rkclark)
- [Pedro Castanheira](https://github.com/pedrocastanheira77)
- [Enrico Graziani](https://github.com/mrenrich84)
