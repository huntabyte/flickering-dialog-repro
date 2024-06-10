import styleToCSS from "style-object-to-css-string";

export function styleToString(style = {}): string {
	return styleToCSS(style).replace("\n", " ");
}
