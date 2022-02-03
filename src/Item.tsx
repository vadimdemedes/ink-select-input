import * as React from 'react';
import type {FC} from 'react';
import {Text} from 'ink';

export interface Props {
	isSelected?: boolean;
	selectedItemColor?: string;
	label: string;
}

const Item: FC<Props> = ({isSelected = false, label, selectedItemColor = 'blue'}) => (
	<Text color={isSelected ? selectedItemColor : undefined}>{label}</Text>
);

export default Item;
