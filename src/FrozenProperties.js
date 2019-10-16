let FrozenProperties = (obj, definitions) => {
	Reflect.ownKeys(definitions).forEach((key) => {
		let value = definitions[key];
		Reflect.defineProperty(obj, key, {
			configurable: false,
			enumerable: false,
			writable: false,
			value,
		});
	});

	return obj;
};

export { FrozenProperties as default, FrozenProperties };
