This repo contains all my answers for the FullStack Open Course @ https://fullstackopen.com/en/

# Part 1

### Initializing a React Project

---

React projects can be created with the Node script call `npx create-react-app <app_name>`. Create react app will create a folder structure with the same name as the app. The folder structure will include all the necessary files for a React application and install all the dependencies automatically from npm. A git repo will also be created if the React app folder structure isn't already embedded within another git repo. 
The default app created includes a development server which communicates via localhost:3000. 



### Components

---

In React, components are simply JavaScript functions which return JSX. JSX is a HTML templating language which the React application renders HTML to be inserted into the DOM.
The method `ReactDOM.render()` takes a React component and DOM element as arguments, renders the returned JSX returned by the component to HTML, and then inserts the rendered HTML into the specified DOM element.

React components take the form:

```React
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

```react
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



### Combining Components

---

Component can be referenced within the returned JSX of other components using similar syntax to that of a JSX tag of the form `<Container_name />`. For example, the above component `Greet` could be rendered within the below component `GreetTeam`:

```react
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

```react
const Greet = (props) => {
  return (
  	<p>Hello, {props.name}</p> 
  )
}
```

The `Greet` component thus *expects* the passed object to define a value for the `props` (i.e. input) object. However, because the react component is 'invoked' using the JSX tag syntax, an object isn't defined as the argument within the tag. Rather, the 'property' names specifed in the JSX component tag reference are created as properties of the `props` object. For example, updating the `GreetTeam` component to 'invoke' the redefined `Greet` component by passing values to `props` takes the form...

```react
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

