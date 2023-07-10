import test from "ava";
import Bitmask from "./Bitmask.js";

test(".set() sets a single bit", (t) => {
	let bm = Bitmask();
	t.is(bm.asNumber(), 0);
	bm.set(1);
	t.is(bm.asNumber(), 1);
	bm.set(2);
	t.is(bm.asNumber(), 3);
});

test(".unset() unsets a single bit", (t) => {
	let bm = Bitmask(3);
	t.is(bm.asNumber(), 3);
	bm.unset(1);
	t.is(bm.asNumber(), 2);
	bm.unset(2);
	t.is(bm.asNumber(), 0);
});

test(".has() returns true if the bit is set, otherwise false", (t) => {
	let bm1 = Bitmask(0);
	t.is(bm1.has(1), false);
	let bm2 = Bitmask(1);
	t.is(bm2.has(1), true);
});
