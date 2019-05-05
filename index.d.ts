import * as React from 'react';

/**
 * Props for custom indicator component.
 */
export type IndicatorProps = { isSelected?: boolean };

/**
 * Props for custom item component.
 */
export type ItemProps = {
	isSelected?: boolean;
	label: string;
};

/**
 * Select item definition.
 */
export type Item = {
	label: string;
	value: React.Key;
	key?: React.Key;
};

export type InkSelectInputProps = {
	/**
	 * Items to display in a list. Each item must be an object and have `label` and `value` props,
	 * it may also optionally have a `key` prop.
	 * If no `key` prop is provided, `value` will be used as the item key.
	 */
	items?: Item[];

	/**
	 * Listen to user's input. Useful in case there are multiple input components
	 * at the same time and input must be "routed" to a specific component.
	 */
	focus?: boolean;

	/**
	 * Index of initially-selected item in `items` array.
	 */
	initialIndex?: number;

	/**
	 * Function to call when user selects an item.
	 * Item object is passed to that function as an argument.
	 */
	onSelect?: (item: Item) => void;

	/**
	 * Function to call when user highlights an item.
	 * Item object is passed to that function as an argument.
	 */
	onHighlight?: (item: Item) => void;

	/**
	 * Custom component to override the default indicator component.
	 */
	indicatorComponent?: React.ComponentType<IndicatorProps>;

	/**
	 * Custom component to override the default item component.
	 */
	itemComponent?: React.ComponentType<ItemProps>;

	/**
	 * Number of items to display.
	 */
	limit?: number;
};

/**
 * Select input component for Ink
 */
export default class InkSelectInput extends React.Component<InkSelectInputProps> {}
