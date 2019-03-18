import * as React from 'react';

export type Item = {
	label:string;
	value:React.Key;
	key?:React.Key;
};

export type InkSelectInputProps = {
	items?: Item[];
	focus?: boolean;
	initialIndex?: number;
	onSelect?: (item:Item) => void;
	indicatorComponent?: React.ComponentType;
	itemComponent?: React.ComponentType;
	limit?: number;
}

/**
 * Select input component for Ink
 */
declare class InkSelectInput extends React.Component<InkSelectInputProps> {}

export default InkSelectInput;
