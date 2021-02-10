import React from "react";

export default function App() {
    const handleClick = function() {
        console.log("hello");
    };

    return (
        <div onClick={handleClick}>Hello React SSR3</div>
    );
}
