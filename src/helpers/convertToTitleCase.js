export default text => text
    .split(" ").map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(" ");