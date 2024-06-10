export function getDataOpenClosed(condition: boolean): "open" | "closed" {
	return condition ? "open" : "closed";
}

export function getAriaExpanded(condition: boolean): "true" | "false" {
	return condition ? "true" : "false";
}
