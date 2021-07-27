This repo contains all my answers for the FullStack Open Course @ https://fullstackopen.com/en/
This ReadMe contains all my summary notes of the course lesson material.

# Defining the Frontend with React

### Initializing a React Project

---

React projects can be created with the Node script call `npx create-react-app <app_name>`. Create react app will create a folder structure with the same name as the app. The folder structure will include all the necessary files for a React application and install all the dependencies automatically from npm. A git repo will also be created if the React app folder structure isn't already embedded within another git repo. 
The default app created includes a development server which communicates via localhost:3000. The development server automatically hot reloads the app on any code change. If the app can't compile due to the code change, then the development server serves up a html page which contains the encoutered error including the code snippet on which the error was encountered.



### React Components

---

In React, components are simply JavaScript functions which return JSX. JSX is a HTML templating language which the React application renders HTML to be inserted into the DOM.
The method `ReactDOM.render()` takes a React component and DOM element as arguments, renders the returned JSX returned by the component to HTML, and then inserts the rendered HTML into the specified DOM element.

React components take the form:

```jsx
const <Component_name> = (props) => {
  // some JS code
  return (
  // some JSX
  )
}
```

In order for the React application to distinguish components from HTML tags in JSX, the component name must be capitalized. The body of the component can contain JavaScript which can be dynamically referenced by the JSX included within the return statement. Values can be passed to the component function in the form of an input object defined as `props`. 
The returned JSX must define a single tag at the top level. Any number of nested child tags can be defined for the returned value but the top value must be a tag. In order to avoid unecessary `<div>` elements in the rendered HTML, the React renderer will accept an empty openning and closing tags `<> </>` as the outer tags of the returned JSX.

The following is an example of a component defintion:

```jsx
const Greet = () => {
  const greeting = 'Hello!'
  return (
  	<>
    	<p>{greeting}</p>
    </>
  )
}
```

In order to reference or execute JavaScript within JSX, the JavaScript content must be surrounded by curly braces `{}`. Above, `greeting` is a JavaScript variable referenced by the returned JSX is surrounded by braces.

Best practice is to declare components within their own files stored within `/src/components/` and import them into `App.js`. 



### Combining Components

---

Component can be referenced within the returned JSX of other components using similar syntax to that of a JSX tag of the form `<Container_name />`. For example, the above component `Greet` could be rendered within the below component `GreetTeam`:

```jsx
const GreetTeam = () => {
  return (
  	<>
    	<Greet />
    	<Greet />
    	<Greet />
    </>
  )
}
```

The HTML rendered by the `ReactDOM.render()` method would then become:

```html
<p>Hello!</p>
<p>Hello!</p>
<p>Hello!</p>
```



### Passing Values to Components

---

The `props` parameter defined for each component is an object where the properties of the object are defined on the JSX tags that represent a component 'invocation'. For example, in the following redefinition of the `Greet` component, the `name` property of the `props` parameter object is referenced within the JSX returned by the component. 

```jsx
const Greet = (props) => {
  return (
  	<p>Hello, {props.name}</p> 
  )
}
```

The `Greet` component thus *expects* the passed object to define a value for the `props` (i.e. input) object. However, because the react component is 'invoked' using the JSX tag syntax, an object isn't defined as the argument within the tag. Rather, the 'property' names specifed in the JSX component tag reference are created as properties of the `props` object. For example, updating the `GreetTeam` component to 'invoke' the redefined `Greet` component by passing values to `props` takes the form...

```jsx
const GreetTeam = () => {
  return (
  	<>
    	<Greet name="Steve" />
    	<Greet name="Shirley"/>
    	<Greet name="Sam"/>
    </>
  )
}
```

The HTML rendered by the `ReactDOM.render()` method would then become:

```html
<p>Hello, Steve</p>
<p>Hello, Shirley</p>
<p>Hello, Sam</p>
```



### Rendering Collections

---

Rendering of collections can be easily accomplish by invoking the `map` method within a JSX template such that JSX is returned for each element of the collection. 
However, there is one caveat when to account for when dealing with JSX and React. When a tag is defined in JSX, the React app automatically assigns an identifer (key attribute) to the tag. React performs this assignment on the static JS file and then associates the assigned tag with the HTML. When the `map` method is defined in the static file, React cannot determine how many JSX tags will result from the execution of the `map` method. 
In order to account for this lack of foresight on the part of React, the tag template defined are the return value of the `map` method a `key` attribute can be declared. The React app can then uniquely identify the JSX tag with an HTML element in the DOM. The value assigned to the `key` property must be unique.

```jsx
const GreeTeam = ({ teamArr }) => {
  return (
  	<>
    	{	teamsArr.map(member => {
       		return <li key={member.id}>Hello, {member.name}!</li>
       	)}
			 )}
  	</>
  )
}
```

Note that it is a bad practice to use array indicies as keys. Because JavaScript arrays are mutable, the association between data and array position can be changed or deleted.



### Stateful Components

---

In order to automatically re-render the HTML of a component in response to events or new information, React utilizes a *state hook*. The state hook takes the form of a function `useState` that is imported from the `react-dom` module.

```jsx
import React, { useState } from 'react-dom'
```

The funciton `useState` is called within a component and defines two entities; a state variable, a function which sets the state variable value. In addition to setting the value of the defined state variable the setter function has a side effect that triggers a re-render of the component as well. Two birds, one stone. Array destructuring can be used to define the state variable and setter function pair. The initial value of the state variable is set to the value passed to the `useState` function in the assignment statement.
As long as they are defined as pairs, any number of state variables and assoicated setter functions can be defined.

```jsx
const ComponentName = () => {
  // define state variable and setter function
  const [stateVariable1, stateSetter1] = useState('stateVariable1 initial value')
  const [stateVariable2, stateSetter2] = useState('stateVariable2 initial value')
  return (
  // some JSX
  )
}
```



### State Changes

---

When a state variable *is re-assigned to a new value*, the components which reference that state variable are re-rendered. This does not include mutations. React doesn't consider a state variable to have changed state if the value referenced by the state variable is mutated. This isn't an issue for state variables which reference a primitive value in JavaScript but it could be an issue for objects. A component will not be re-rendered if the objected referenced by a state variable is mutated.
The best practice for changing state of state variables which reference objects, is to copy the object and re-assign the value of the property in question. For example, suppose `stateVariable` is references `{ user: 'steve', age: '35' }`. React will recognize a state change relative to `stateVariable` if `setStateVariable({ ...stateVariable, user: 'Tim' })` is called.
If an array is referenced by `stateVariable`, then a convienient approach for changing state of `stateVariable` would be to utilize the `concat` method which is an immutable method that returns a new array. Where `setStateVariable(stateVariable.concat('new element'))` would result in a re-render of any components which reference `stateVariable`.



### Event Handlers in React

---

In React, generally, the `document.addEventListener` method is not invoked to register event listeners to a DOM element. Rather, the event is assigned to a component as a property specified on the JSX component tag. The same HTML property names for event handlers are used by JSX/React. The specified event property is assigned a callback function which executes in response to the event.

```jsx
const ComponentName = () => {
  const [stateVariable, stateSetter] = useState(0)
  
  return (
  	<button onClick={stateSetter(stateVariable + 1)}
      increment state
    </button>
  )
}
```

 

### Lifting State

---

If multiple components need to be re-rendered due to the same state change (single button click, etc), then the best practice is to create a 'parent component' in which the state variable is defined. Both 'child components' are re-rendered within the JSX of the 'parent component'. This practice is referred to this 

```jsx
const App = () => {
  const [sharedState, stateSetter] = useState(0)
  
  return (
  	<Component1 props_property={sharedState}/>
    <Component2 props_property={sharedState}/>
  )
}
```



### Implementing Forms

---

Best practice for the implement HTML forms in React is to associate each field within the form with a state variable. Each time the `onChange` event fires, the associated state variable is reassigned to the new value of the field. When the form `onSumbit` event fires, the associated callback function can then access the current value of all the fields by referenced their respective state variable(s).

```jsx
const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState(
    'a new note...'
  ) 

  const addNote = (event) => {
    event.preventDefault()
    // submit current value of <input> field
    postRequestToServer(newNote)  
    setNewNote('')
  }
  
  // whenever change occurs to <input> field
  //save field value to state variable
  const handleInputChange = (event) => {
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Create New Note</h1>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleInputChange} />
        <button type="submit">save</button>
      </form>   
    </div>
  )
}
```

 In the above `App` component, each time the input field of the form is modified, the value of the field is assigned to the `newNote` state variable. When the form submission event occurs, the current value of the field (i.e. `newNote`) is sent in a `POST` request to update the server data store.
After the request is sent, the invocation of `setNewNote` results in 'clearing' of the input field text.



### Practices to Avoid in React

---

The `useState` function, used by React to define state variables and their setters, is considered a hook. Hooks have rules of thumb to ensure that they're always called in the same order in order to prevent erratic behavior of the application. The `useState` function...

- must not be called from within a loop
- must not be called in a conditional expression
- must not be called outside a function defining a component

Additionally, components should not be defined within other components. The main reason for this is that when the outer component is re-rendered, the inner component is also re-rendered. React cannot optimize the inner or outer component and this can impact the app's performance.

