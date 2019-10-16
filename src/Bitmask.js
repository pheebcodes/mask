import FrozenProperties from "./FrozenProperties.js";

let Bitmask = (num = 0) =>
	FrozenProperties(
		{},
		{
			has: (bit) => Math.floor(num / bit) % 2 === 1,
			set: (bit) => {
				num += bit;
			},
			unset: (bit) => {
				num -= bit;
			},
			asNumber: () => num,
		},
	);

export { Bitmask as default, Bitmask };
