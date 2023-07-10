import test from "ava";
import Fields from "./Fields.js";

let arrayOf = (n, fn) => {
	let ret = [];
	for (let i = 0; i < n; i++) {
		ret.push(fn(i));
	}
	return ret;
};

test(".next() returns the next bit", (t) => {
	let f = Fields();
	let bits = arrayOf(64, (i) => Math.pow(2, i));

	while (bits.length !== 0) {
		let bit = bits.shift();
		let next = f.next();
		t.is(next.value, bit);
	}
});

test("Fields instances are iterables", (t) => {
	let f = Fields();
	t.true(typeof f.next === "function");
	let v = f.next();
	t.deepEqual(v, { value: 1, done: false });
});

test("Fields works with destructuring and respects limit", (t) => {
	// Testing iterable with destructuring
	let f = Fields(2);
	let [a, b, c] = f;
	t.is(a, 1);
	t.is(b, 2);
	t.is(c, undefined);
});

test("Fields works with let..of and respects limit", (t) => {
	// Testing iterable with let..of
	let limit = 6;
	let f = Fields(limit);
	let i = 0;
	for (let v of f) {
		t.is(v, Math.pow(2, i++));

		if (i > limit) {
			throw new Error("Runaway loop");
		}
	}
	t.is(i, limit);
});
