# Javascript Guidelines

Let's keep all the JS assets to this path.

## Naming classes

Use `PascalCase` for classes.

```js
class YswProduct {
    constructor() {}
}

class YswGlobal {
    constructor() {}
}
```

## Naming functions, variables, methods, etc

Use `camelCase` for functions, variables methods and others.

```js
function getProduct() {}

const productPrice = () => {}
```

## Folder Structure

* **addons:** reserved only for addons installations.
* **cmd:** for executing console scripts for automation tasks.
* **components:** for custom components.
* **modules:** for product, category, global code modules.
* **widgets:** reserved only for custom widgets.
