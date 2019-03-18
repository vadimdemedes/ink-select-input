import * as React from 'react';

export type Item = {
	label:string;
	value:React.Key;
	key?:React.Key;
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
	onSelect?: (item:Item) => void;

	/**
	 * Custom component to override the default indicator component.
	 */
	indicatorComponent?: React.ComponentType;

	/**
	 * Custom component to override the default item component.
	 */
	itemComponent?: React.ComponentType;

	/**
	 * Number of items to display.
	 */
	limit?: number;
}

/**
 * Select input component for Ink
 */
declare class InkSelectInput extends React.Component<InkSelectInputProps> {}

export default InkSelectInput;