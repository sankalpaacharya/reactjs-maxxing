# Enhanced Code Blocks Guide

Your code blocks now support **line highlighting** and **collapsible sections**!

## Line Highlighting

Highlight specific lines while making others low opacity. Perfect for drawing attention to specific parts of code.

### Syntax

Add `{line-numbers}` to the code fence meta string:

````markdown
```tsx {3,5-7}
function Example() {
  const [count, setCount] = useState(0);
  // This line is highlighted
  
  // Lines 5-7 are highlighted
  const handleClick = () => {
    setCount(count + 1);
  };
  
  return <button onClick={handleClick}>{count}</button>;
}
```
````

### Examples

**Single line:**
```tsx {2}
```

**Multiple lines:**
```tsx {1,3,5}
```

**Range:**
```tsx {3-7}
```

**Combined:**
```tsx {1,3-5,8}
```

## Collapsible/Foldable Sections

Collapse parts of your code to focus on specific sections. Great for hiding boilerplate or non-essential code.

### Syntax

Add `[fold=start-end "optional label"]` to the code fence meta string:

````markdown
```tsx [fold=1-5 "imports"] [fold=15-20 "boilerplate"]
import React from 'react';
import { useState } from 'react';
import './styles.css';
// ... other imports

function UpdateExample() {
  const update = {
    lane,
    action,
    hasEagerState: false,
    eagerState: null,
    next: null as any,
  };
  
  // Lines 15-20 will be collapsed
  const boilerplate1 = true;
  const boilerplate2 = false;
  const boilerplate3 = null;
  const boilerplate4 = {};
  const boilerplate5 = [];
  
  return <div>Important code here</div>;
}
```
````

### Features

- Click the chevron icon to expand/collapse
- Sections are collapsed by default
- Shows line count when collapsed (or custom label if provided)
- Multiple folds per code block

## Combining Both

You can use highlighting and folding together:

````markdown
```tsx {10-13} [fold=1-5 "setup code"]
const setup1 = true;
const setup2 = false;
const setup3 = null;
const setup4 = {};
const setup5 = [];

function Component() {
  const [state, setState] = useState(0);
  
  // Lines 10-13 highlighted
  const handleUpdate = () => {
    setState(prev => prev + 1);
  };
  
  return <button onClick={handleUpdate}>{state}</button>;
}
```
````

## Your Use Case

Based on your example in the MDX file, you can now do:

````markdown
```tsx {6-12} [fold=14-17 "normal path"] [fold=19-24 "scheduling"]
function dispatchSetState<S, A>(
  fiber: Fiber,
  queue: UpdateQueue<S, A>,
  action: A,
) {
  // Highlight the update object creation (lines 6-12)
  const update: Update<S, A> = {
    lane,
    action,
    hasEagerState: false,
    eagerState: null,
    next: null as any,
  };

  // This section will be folded
  if (fiber.lanes === NoLanes) {
    // ... eager compute logic
  }
  
  // This section will also be folded
  const root = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
  if (root !== null) {
    const eventTime = requestEventTime();
    scheduleUpdateOnFiber(root, fiber, lane, eventTime);
  }
}
```
````

This will:
1. Highlight the update object (lines 6-12) while making other lines dimmed
2. Collapse the "normal path" section (lines 14-17)
3. Collapse the "scheduling" section (lines 19-24)
4. Allow readers to expand sections as needed

Perfect for progressive disclosure in technical explanations!
