import * as React from 'react';
import type {FC} from 'react';
import {Text} from 'ink';

export interface Props {
	isSelected?: boolean;
	color?: string;
	label: string;
}

const Item: FC<Props> = ({isSelected = false, label, color = 'blue'}) => (
	<Text color={isSelected ? color : undefined}>{label}</Text>
);

export default Item;
