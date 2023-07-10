import FrozenProperties from "./FrozenProperties.js";

let Fields = (limit = Infinity) => {
	let i = 0;

	let obj = FrozenProperties(
		{},
		{
			next: () => {
				if (i === limit) {
					return { done: true };
				}
				let value = Math.pow(2, i++);
				return { value, done: false };
			},
			[Symbol.iterator]: () => obj,
		},
	);

	return obj;
};

export { Fields as default, Fields };
