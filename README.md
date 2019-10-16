# @chancedickson/mask

A easy library using ES6 Proxies for streamlining Bitmask definitions.

## MaskFactory

For most use cases, you'll probably want to use the `MaskFactory` function.
`MaskFactory` returns an object with a special method on it called `newMask`.
To generate the fields for this mask, simply access any other property on
the `MaskFactory` object and it'll generate one for you! Here's an example:

```javascript
import { MaskFactory } from "@chancedickson/mask";

let maskFactory = MaskFactory();
let { FIELD_A, FIELD_B, FIELD_C } = maskFactory;
let mask = maskFactory.newMask(0); // Optionally takes the initial value as an argument

assert(mask.asNumber() === 0);
assert(FIELD_A === 1);
assert(FIELD_B === 2);
assert(FIELD_C === 4);

mask.set(FIELD_B);
assert(mask.asNumber() === 2);

mask.set(FIELD_A);
assert(mask.asNumber() === 3);

mask.unset(FIELD_B);
assert(mask.asNumber() === 1);

assert(mask.has(FIELD_A) === true);
assert(mask.has(FIELD_C) === false);
```

You can use `MaskFactory` to build a simple module that encapsulates a type
of bitmask.

```javascript
// SomeBitmask.js
import { MaskFactory } from "@chancedickson/mask";

let factory = MaskFactory();

export default factory.newMask;
export let { FIELD_A, FIELD_B, FIELD_C } = factory;
```

Then, you could easily import it and use it like so.

```javascript
import SomeBitmask, { FIELD_A } from "./SomeBitmask.js";

const mask = SomeBitmask();
assert(mask.has(FIELD_A) === false);
mask.set(FIELD_A);
assert(mask.has(FIELD_A) === true);
```

## Mask

Unlike `MaskFactory` which can create any number of masks, `Mask` creates a
single mask. Accessing any property other than the bitmask methods generates
a new bitmask field.

```javascript
import { Mask } from "@chancedickson/mask";

let mask = Mask(0); // Optionally takes the initial value as an argument
let { FIELD_A, FIELD_B, FIELD_C } = mask;

assert(mask.asNumber() === 0);
assert(FIELD_A === 1);
assert(FIELD_B === 2);
assert(FIELD_C === 4);

mask.set(FIELD_B);
assert(mask.asNumber() === 2);

mask.set(FIELD_A);
assert(mask.asNumber() === 3);

mask.unset(FIELD_B);
assert(mask.asNumber() === 1);

assert(mask.has(FIELD_A) === true);
assert(mask.has(FIELD_C) === false);
```

## Bitmask

Unlike `Mask` instances, `Bitmask` instances does not generate fields on
property access.

```javascript
import { Bitmask } from "@chancedickson/mask";

let mask = Bitmask(0); // Optionally takes the initial value as an argument
let FIELD_A = 1;
let FIELD_B = 2;
let FIELD_C = 4;

assert(mask.asNumber() === 0);
assert(FIELD_A === 1);
assert(FIELD_B === 2);
assert(FIELD_C === 4);

mask.set(FIELD_B);
assert(mask.asNumber() === 2);

mask.set(FIELD_A);
assert(mask.asNumber() === 3);

mask.unset(FIELD_B);
assert(mask.asNumber() === 1);

assert(mask.has(FIELD_A) === true);
assert(mask.has(FIELD_C) === false);
```

## Fields

`Fields` returns an iterable that yields sequential bit field values. By
default the iterable is infinite, however you can set a limit by passing the
limit as an argument.

```javascript
import { Fields } from "@chancedickson/mask";

let fields = Fields();

let first = fields.next();
assert(first.value === 1);

let second = fields.next();
assert(first.value === 2);

let limitedFields = Fields(6); // Fields optionally takes a length as an argument.
let i = 0;
for (let value of limitedFields) {
	assert(Math.pow(2, i++) === value);
}
```

## License

`@chancedickson/mask` uses License Zero's Prosperity license. Please read the
included LICENSE file before using `@chancedickson/mask`. This is especially
important if you are using `@chancedickson/mask` in a for-profit project since
purchasing a license is required. To purchase a license, please follow the
instructions [at License Zero's website.](https://licensezero.com).

In the future I may dual-license `@chancedickson/mask` with License Zero's
Patron license, however currently there are no plans for that.
