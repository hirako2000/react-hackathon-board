# What I learned building this app

Various notes capturing some of the lessons learnt using the react/redux/semntic-ui/koa stack

### React

#### Boiler plate
Compared to other view libraries, it takes a lot of boiler plate code to get simple view to render.
This pays off in the long term, especially for large views.

#### Components
It's very handy to reuse components, I wish I had done more of that from the beginning.
What's particularly cool is the fact that the multiple components to render a page have their own module to fetch its data and render it - with redux that comes so handy to be able to just cascade the fetches and update the component only.

#### React.createClass vs React.Component
Not sure what's the deal there - I guess they wanted to provide ES5 APIs..
Components are much neater, they however *don't* bind added functions automatically to _this_.
It sort of threw me off for a while, until - always bind the method so that _this_ can be referenced.

#### Plugins
It's easy to get into a library creep by adding numerous plugins to do certain things, like forms. The uni directional design makes it very painful (boilerplate) when dealing with input elements.
The css transition plugin is clearly not stable, cross browser compatibility issues, it's important to test cross browsers early. e.g Chrome/FF works perfectly fine on Mac, but transitions totally break the layout with flickering on Windows FF and IE.

### Redux

#### Overuse
The store clearly should not be used blindly all over the place - the mistake of thinking everything should be handled by reducers just makes the code more complicated than it should, with little to no benefit.
It's perfect for the moving parts and complex entities, but for simple forms it's just better to use the react component states, it does the job perfectly fine

#### Actions
Rookie mistake to think the actions are scoped to each redux module. they are not, single store contains all the named actions, it sort of becomes verbose and strange to create unique Strings for each, but redux allows duplicates, then causing weird bugs.

#### Server side
I wish I had used redux on the server side and load it on first page load to hand over to the client to then manage the store. Kind of difficult to make this change down the road.

#### semantic-ui
Brilliant theming , 2.x not as solid as Bootstrap 3 though, also comes w.r.t basic components like mobile menu transitions.
Padding around certain elements can be painful, the grid system must be fully understood, or hacks comes in by overriding certain classes.

#### koa
Brilliant server side framework. But very bleeding edge, the API keeps changing, started using v2 (not even stable at the time) and v3 was already being worked on.
A lot of hand work and research to be able to get certain things done. Express is much more mature with a huge eco system and plugins.
