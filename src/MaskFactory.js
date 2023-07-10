import FieldsProxy from "./FieldsProxy.js";
import FrozenProperties from "./FrozenProperties.js";
import Mask from "./Mask.js";

let MaskFactory = () => {
	let maskFactory = FrozenProperties(
		{},
		{
			newMask: (n) => Mask(n),
		},
	);

	return FieldsProxy(maskFactory);
};

export { MaskFactory as default, MaskFactory };
