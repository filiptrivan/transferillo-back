//module
import React from "react";
//module
import ReactDOM from "react-dom";
//component
import App from "./App";

//The ReactDOM.render() method is used to render the App component on the web page.
//second argument is the document.getElementById("root"), which specifies where the component should be rendered in the HTML document.
//allows you to write HTML-like code within JavaScript.
ReactDOM.render(<App />, document.getElementById("root"));
