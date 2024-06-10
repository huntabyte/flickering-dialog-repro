import parse from "style-to-object";
import { camelCase, pascalCase } from "scule";

export function cssToStyleObj(css: string | null | undefined) {
	if (!css) return {};
	const styleObj: Record<string, unknown> = {};

	function iterator(name: string, value: string) {
		if (
			name.startsWith("-moz-") ||
			name.startsWith("-webkit-") ||
			name.startsWith("-ms-") ||
			name.startsWith("-o-")
		) {
			styleObj[pascalCase(name)] = value;
			return;
		}
		styleObj[camelCase(name)] = value;
	}

	parse(css, iterator);

	return styleObj;
}
