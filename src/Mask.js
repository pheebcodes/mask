import Bitmask from "./Bitmask.js";
import FieldsProxy from "./FieldsProxy.js";

let Mask = (num = 0) => {
	let bitmask = Bitmask(num);

	return FieldsProxy(bitmask);
};

export { Mask as default, Mask };
