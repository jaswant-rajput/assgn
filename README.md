
### How to Implement Shared Functionality Across a Component Tree

To implement shared functionality across a component tree in React, there are several approaches you can take:

1. **Lifting State Up**: When two or more components need to share the same state, you can "lift" the state up to their closest common ancestor. The ancestor component holds the state and passes it down as props to the child components that need it. This allows the components to stay in sync.

2. **Context API/Redux**: The React Context API or Redux are powerful tool for sharing state or functions across a component tree without passing props down manually at every level. You create a context, provide it at a higher level in the tree, and consume it in any descendant components that need access to the shared functionality.

### Why is the `useState` Hook Appropriate for Handling State in a Complex Component?

The `useState` hook is appropriate for handling state in complex components for several reasons:

1. **Component-Level State Management**: With `useState`, state is scoped to the component in which it is used. This means that each instance of a component has its own state, which is useful when you have multiple instances of a component, each with independent state.

2. **Reactivity**: `useState` triggers re-renders when the state changes, ensuring that your component UI stays in sync with the latest state. This reactivity is essential in complex components where the UI needs to reflect changes dynamically.

3. **Handling Complex State**: Even in complex components, you can manage intricate state structures (like objects or arrays) with `useState`. Additionally, you can use multiple `useState` hooks to manage different pieces of state separately, making the code more modular and easier to maintain.

4. **Functional Updates**: When dealing with complex state updates, `useState` provides functional updates, where you can pass a function to the state setter. This function receives the previous state and returns the new state, which is useful when the new state depends on the previous state.



### Setup Locally

**Note:** Ensure there is no MongoDB database named `assgn` already present.

#### Global Steps:
1. `git clone https://github.com/jaswant-rajput/assgn.git`
2. `cd assgn`

#### Backend Steps:
1. `cd backend`
2. `npm install`
3. `npm run build`
4. `npm run start`

#### Frontend Steps:
1. `cd frontend`
2. `npm install`
3. `npm run dev`



