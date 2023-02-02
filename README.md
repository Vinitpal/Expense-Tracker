# todo

## next tasks

- hosting
  -- the problem occurring here is that i can host only one type of environment
  -- it will be either golang or node environment
  -- for its solution i can do something like:

  ```
    - use react inside go
      -- for this, i would need something like webpack to create a build of my app
      -- and put it inside views or public something folder in golang
        --- I think, CRA have a webpack compiler to create a build, maybe i can use it?
        --- above step is done, but need lot cleanup before pushing the code

        --- my further step should considering how I can auto generate build without hardcode
        --- becuz as of now I need to switch to client, use "npm run build"
        --- then copy the build folder to main folder, then use "go run bulid" this is hectic
        --- I want all this steps to complete with just one command

        --- above is done, I've combined client and server
        --- now i can use
        --- for build: "npm run build && go build main.go"
        --- for run: "go run main.go"
        --- issue here is: I have to cd two folders inside before running this cmd
        --- need to check if hosting platform allow above issue or not

    - check about mysql server runtime
    - and finally host golang
  ```

- login and sign up feature <-
- can use tooltip in various places <-
- cleanup <-
  -by default userId check form LS and logging in

## home page

- mobile navbar improvement needed
- fan animation color and styling
- how to use section
- login/signup/guest function implementation
- other animation features

## dashboard

- make mobile responsive more better
- add graphs

## other functions

- check out the aria-label issue

# --- DONE ---

- navbar
- landing section styling
- style the btns container area
- table section styling
- functioning of btns container area
  - ~~update current balance~~
  - ~~amount expended automatic calculation~~
  - ~~add new record~~
  - ~~update record~~
  - ~~delete record~~
- functioning of tables rows
- navbar responsive
- landing section responsive
- make dashboard responsive
- done view all expense page
- added filter features on that page
- add context api for less lines of code
- view all page -- responsive work
  -- gotta increase the ux for mobile screens
- guest login
- limit labels to its users <-
