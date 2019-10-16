import test from "ava";
import Mask from "./Mask.js";

test("properties other than Bitmask methods return incrementing bit values", (t) => {
	let m = Mask();

	// Interleaving these to ensure accessing functions doesn't increment bit values
	t.true(typeof m.asNumber === "function");
	t.is(m.a, 1);
	t.true(typeof m.set === "function");
	t.is(m.b, 2);
	t.true(typeof m.unset === "function");
	t.is(m.c, 4);
	t.true(typeof m.has === "function");
	t.is(m.d, 8);
});

test("Object.keys()/Reflect.ownKeys() returns bit keys", (t) => {
	let m = Mask();
	let props = ["a", "b", "c", "d"];
	let values = props.map((prop) => m[prop]);

	t.deepEqual(values, [1, 2, 4, 8]);
	t.deepEqual(Object.keys(m), props);
	t.deepEqual(Reflect.ownKeys(m), props);
});

test("generating properties and using them with the Bitmask methods works", (t) => {
	let m = Mask();
	let { a, b } = m;

	t.is(m.asNumber(), 0);

	m.set(a);
	t.is(m.asNumber(), 1);
	t.true(m.has(a));
	t.false(m.has(b));

	m.set(b);
	t.is(m.asNumber(), 3);
	t.true(m.has(a));
	t.true(m.has(b));

	m.unset(a);
	t.is(m.asNumber(), 2);
	t.false(m.has(a));
	t.true(m.has(b));

	m.unset(b);
	t.is(m.asNumber(), 0);
	t.false(m.has(a));
	t.false(m.has(b));
});
