const build = (type) => ({
	input: "./src/index.js",
	output: { file: `mask.${type}.js`, format: type },
});

export default [build("esm"), build("cjs")];
