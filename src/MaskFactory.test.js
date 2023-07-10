import test from "ava";
import MaskFactory from "./MaskFactory.js";

test("properties other than newMask method return incrementing bit values", (t) => {
	let mf = MaskFactory();

	// Interleaving these to ensure accessing functions doesn't increment bit values
	t.true(typeof mf.newMask === "function");
	t.is(mf.a, 1);
	t.true(typeof mf.newMask === "function");
	t.is(mf.b, 2);
	t.true(typeof mf.newMask === "function");
});

test("can generate properties, create new masks, then use the properties with those masks", (t) => {
	let mf = MaskFactory();
	let { a, b } = mf;
	t.is(a, 1);
	t.is(b, 2);

	let m1 = mf.newMask();
	t.is(m1.asNumber(), 0);
	t.false(m1.has(a));
	t.false(m1.has(b));
	m1.set(a);
	t.true(m1.has(a));
	t.false(m1.has(b));

	let m2 = mf.newMask();
	t.is(m2.asNumber(), 0);
	t.false(m2.has(a));
	t.false(m2.has(a));
	m2.set(b);
	t.false(m2.has(a));
	t.true(m2.has(b));

	t.not(m1, m2);
	t.not(m1.asNumber(), m2.asNumber());
});
