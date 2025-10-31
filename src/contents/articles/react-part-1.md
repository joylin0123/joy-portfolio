---
title: React Fundamentals and Mental Model
date: 2025-10-31
summary: A introduction to React, the frontend library
tags: [Tech, Frontend]
---

#### 1. Why React Was Created  

Before React, web interfaces were often built with **imperative DOM manipulation** — developers had to manually select elements and update them using libraries like jQuery.  
As applications grew more dynamic, keeping the UI consistent with underlying data became increasingly complex.  
For example, a single user action might require updating multiple parts of the DOM, and tracking those relationships quickly led to fragile, hard-to-maintain code.  

React was created by engineers at Facebook in 2013 to solve this exact problem.  
Instead of telling the browser *how* to update the interface step by step, React introduced a **declarative approach**: you simply describe *what* the UI should look like for a given state, and React efficiently updates it when that state changes.  
This shift made large-scale, interactive applications more predictable, testable, and easier to reason about.

#### 2. What React Is  

React is a **JavaScript library for building user interfaces**, not a full framework.  
It focuses solely on the **view layer** of an application — how data is transformed into UI — while letting developers integrate other tools for routing, state management, or data fetching as needed.  

At its core, React treats the UI as a function of state:

```jsx
UI = f(state)
```

Whenever the underlying state changes, React re-renders components to reflect the new state, automatically keeping the DOM in sync.

React’s architecture is built around components — small, reusable units that encapsulate both structure and behavior.
These components form a hierarchy that mirrors the structure of the UI itself, making large applications easier to organize and maintain.

Combined with its Virtual DOM and declarative rendering model, React enables developers to build fast, interactive interfaces while writing code that’s both modular and intuitive.

#### 3. From the DOM to React’s Virtual DOM

The [**Document Object Model (DOM)**](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)  represents an HTML page as a hierarchical tree of elements. While it works well for static pages, updating it directly can become slow and error-prone in large, interactive applications. Each change forces the browser to reflow and repaint parts of the page, which quickly adds up when many updates occur per second.

React introduces the **Virtual DOM**, a lightweight, in-memory representation of the real DOM. When your app’s state changes, React re-renders a virtual tree and uses a process called **diffing** to detect what actually changed. Only those specific updates are applied to the real DOM—a process known as **reconciliation**—resulting in smoother performance and more predictable UI updates.

#### 4. JSX and TSX — Writing UI in JavaScript and TypeScript

React uses a special syntax extension called **JSX (JavaScript XML)**, which lets you write HTML-like code directly inside JavaScript.  
Instead of manually calling `document.createElement()` or building templates as strings, JSX makes UI structure declarative:  

```tsx
function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>;
}
````

Behind the scenes, JSX is **transformed into function calls** (usually `React.createElement`), producing lightweight JavaScript objects that represent elements in the Virtual DOM.
This means every piece of JSX is just data describing what the UI should look like — not real DOM nodes.

When using **TypeScript**, files typically use the `.tsx` extension instead of `.jsx`.
This enables **type safety** for props, state, and event handlers, catching common bugs during compilation rather than at runtime.
TypeScript-aware editors (like VS Code) also provide autocompletion, type hints, and quick refactors, which make maintaining large React projects much easier.

##### Example: defining typed props in TSX

```tsx
interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
```

Using JSX/TSX doesn’t change how React works—it just improves **developer experience** and code clarity by blending markup with logic in a single, consistent language.

#### 5. Components as Pure Functions  

In React, the **component** is the fundamental building block of the UI. A component is essentially a **pure function** that takes in input data (called **props**) and returns what the UI should look like. Instead of imperatively describing how to update the DOM, you simply describe *what* you want the interface to be for a given state.

A minimal component looks like this:

```tsx
function Welcome({ user }: { user: string }) {
  return <h2>Welcome, {user}!</h2>;
}
````

Each render of a component depends only on its **props** and **state**, producing the same result given the same inputs — just like a pure function in mathematics.
React takes care of reconciling the result with the real DOM efficiently.

React supports two kinds of components:

| Type                    | Description                                                                                                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Function Components** | The modern, recommended style. They are stateless by default, but can use Hooks for state and lifecycle logic.                                            |
| **Class Components**    | The older style using ES6 classes with methods like `render()` and lifecycle hooks (`componentDidMount`, etc.). Still supported, but no longer preferred. |

Example of an equivalent class component (for legacy reference):

```tsx
class Welcome extends React.Component<{ user: string }> {
  render() {
    return <h2>Welcome, {this.props.user}!</h2>;
  }
}
```

Function components are simpler, more readable, and integrate naturally with Hooks — making them the de facto standard in modern React development.

#### 6. Props, State, and Unidirectional Data Flow  

React’s design is based on **one-way data flow** — data always moves **from parent components down to child components**.  
This makes applications easier to reason about, since each component’s output depends only on its current **props** and **state**.

##### Props (Properties)
**Props** are read-only values passed from a parent to a child component.  
They are immutable inside the child — changing them directly doesn’t re-render anything.  
Instead, the parent must update its own state and pass new props down.

Example:
```tsx
function UserCard({ name, age }: { name: string; age: number }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{age} years old</p>
    </div>
  );
}

function App() {
  return <UserCard name="Joy" age={23} />;
}
````

##### State

**State** represents internal, mutable data managed by a component itself.
When state changes, React triggers a **re-render**, updating only the affected parts of the DOM.

Example using the `useState` Hook:

```tsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

##### Unidirectional Data Flow

React enforces **unidirectional (top-down) data flow**:

1. A parent passes data to children through props.
2. A child triggers updates by calling a callback prop provided by the parent.
3. The parent updates its state, which causes a re-render and new props to flow down.

This pattern avoids side effects from shared mutable state and keeps components predictable.

```tsx
function Parent() {
  const [text, setText] = useState("");

  return (
    <div>
      <Child value={text} onChange={setText} />
      <p>You typed: {text}</p>
    </div>
  );
}

function Child({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />;
}
```

This example shows how the child can communicate changes *upward* while data still flows *downward*, maintaining React’s one-way architecture.

#### 7. Hooks — Managing Logic Without Classes  

Before Hooks, React components that needed state or lifecycle methods had to be written as **class components**.  
Hooks, introduced in React 16.8, allow **function components** to manage state, side effects, and shared logic directly — without classes.  
They make React code cleaner, more reusable, and easier to test.

###### useState — Managing Local State

`useState` adds internal state to a function component.  
It returns a pair: the current state value and a function to update it.

```tsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      You clicked {count} times
    </button>
  );
}
````

Each call to `setCount` schedules a re-render — React compares the new virtual tree and updates the DOM efficiently.

###### useEffect — Handling Side Effects

`useEffect` lets components perform side effects such as data fetching, subscriptions, or DOM manipulation **after rendering**.
It runs after the component mounts and re-runs when its dependencies change.

```tsx
import { useEffect, useState } from "react";

function UserInfo({ id }: { id: number }) {
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then(setUser);
  }, [id]); // dependency array

  return <div>{user ? user.name : "Loading..."}</div>;
}
```

The dependency array (`[id]`) ensures the effect only re-runs when `id` changes — preventing infinite loops.

###### useMemo and useCallback — Performance Optimization

`useMemo` memoizes computed values; `useCallback` memoizes functions to prevent unnecessary re-creations and re-renders of child components.

```tsx
const doubled = useMemo(() => count * 2, [count]);
const handleClick = useCallback(() => setCount((c) => c + 1), []);
```

###### Custom Hooks — Reusing Logic

Hooks can be composed into **custom hooks** that encapsulate reusable behavior.

```tsx
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

function App() {
  const width = useWindowWidth();
  return <p>Window width: {width}px</p>;
}
```

This pattern keeps logic modular and shareable between components without duplicating code.

Hooks follow **strict rules**:

1. Only call hooks at the top level of a component or custom hook.
2. Only call them inside React functions (not loops, conditions, or nested scopes).

#### 8. React’s Rendering Lifecycle  

Every time data changes, React goes through a precise **rendering lifecycle** to determine how the UI should update.  
Understanding this flow is key to writing efficient components and avoiding unnecessary re-renders.

##### The Three Phases of Rendering  

React Fiber — the internal engine introduced in React 16 — breaks updates into **three main phases**:

| Phase | Description |
|--------|--------------|
| **Render (Reconciliation)** | React calls your component functions to build a new Virtual DOM tree. It compares the new tree with the previous one to detect what has changed (this process is called *diffing*). |
| **Commit** | React applies the minimal set of changes (patches) to the real DOM. DOM mutations, refs, and layout effects (`useLayoutEffect`) happen here. |
| **Paint** | The browser draws the updated elements on the screen. This step is outside React but part of the visible update cycle. |

React Fiber’s design allows these phases to be **split, paused, or interrupted**, making React updates more responsive to user interactions and animations.

##### How Scheduling Works  

React uses a priority-based **scheduler** to decide which updates should run first.  
For example, typing in an input field is higher priority than re-rendering an offscreen list.  
This scheduling ensures the UI remains fluid even under heavy workloads.

##### Lifecycle Example  

Here’s a simplified mental model:

```tsx
// 1️⃣ Render phase: React calls component functions.
function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}</h1>;
}

// 2️⃣ Diffing: React compares the new Virtual DOM with the previous one.
// 3️⃣ Commit: React updates the real DOM node only if 'name' changed.
````

When `name` changes, only the `<h1>` text node is updated — not the entire component tree.

##### Effects in the Lifecycle

Hooks integrate tightly into this lifecycle:

* `useEffect` runs **after** the commit phase (non-blocking side effects).
* `useLayoutEffect` runs **synchronously** after the DOM is updated but before the browser paints, useful for measurements or immediate DOM adjustments.

#### 9. Client and Server Components (React 18+)  

With React 18, the rendering model expanded to support **Server Components**, allowing parts of your UI to render on the server before being sent to the client.  
This new model improves performance, reduces bundle size, and enhances data-fetching efficiency — especially in frameworks like **Next.js 13+**.

##### What Are Client and Server Components?  

| Type | Runs Where | Typical Use |
|------|-------------|--------------|
| **Client Components** | In the browser | Interactive UI: event handlers, `useState`, `useEffect`, DOM APIs |
| **Server Components** | On the server | Static markup, data fetching, pre-rendered content |

Server Components generate serialized output (not HTML) that React can hydrate with Client Components on the browser side.  
This hybrid approach combines SSR (Server-Side Rendering) performance with client-side interactivity.

##### Client Component Example  

Client Components are the default in classic React setups.  
They include interactivity and React Hooks:

```tsx
'use client'; // Next.js directive

import { useState } from "react";

export default function LikeButton() {
  const [likes, setLikes] = useState(0);
  return (
    <button onClick={() => setLikes(likes + 1)}>
      ❤️ {likes}
    </button>
  );
}
````

The `"use client"` directive (in Next.js 13+) explicitly marks this file for client-side execution.

##### Server Component Example

Server Components can run **only** on the server.
They can access databases, files, and secrets directly — no bundling or API needed.

```tsx
// No 'use client' directive → runs on the server
import { getUser } from "@/lib/db";

export default async function Profile() {
  const user = await getUser();
  return <h2>Welcome back, {user.name}</h2>;
}
```

The output is streamed as serialized React data, not HTML; the client receives it, merges it into the tree, and hydrates interactive parts.

##### Benefits

* **Smaller client bundles:** logic that never runs in the browser isn’t shipped to users.
* **Faster initial load:** pre-rendered content is ready sooner.
* **Improved security:** sensitive operations stay on the server.
* **Better data fetching:** fetch once on the server, not again on the client.

##### When to Use Which

| Use Case                             | Component Type |
| ------------------------------------ | -------------- |
| Fetching data from a database or API | **Server**     |
| Handling user input or animations    | **Client**     |
| Rendering static markdown or lists   | **Server**     |
| Managing local state (like toggles)  | **Client**     |

Most modern React frameworks mix both automatically — you write components as needed, and the build system decides where they run.
