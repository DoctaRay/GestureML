import React from "react";

const objects = ["heart", "tree", "gun", "dog"];

export default () => {
    const object = objects[parseInt(Math.random() * objects.length)]
    return (
        <h2>Become a ... {object}</h2>
    );
}
