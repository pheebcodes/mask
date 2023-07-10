import Fields from "./Fields.js";

let FieldsProxy = (obj) => {
	let fieldGenerator = Fields();

	return new Proxy(Object.create(obj), {
		get: (target, prop) => {
			if (!Reflect.has(target, prop)) {
				let value = fieldGenerator.next().value;
				Reflect.defineProperty(target, prop, {
					configurable: false,
					enumerable: true,
					writable: false,
					value,
				});
			}

			return target[prop];
		},
	});
};

export { FieldsProxy as default, FieldsProxy };
