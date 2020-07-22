import * as React from 'react';
import type {FC} from 'react';
import {Text} from 'ink';

export interface Props {
	isSelected?: boolean;
	label: string;
}

const Item: FC<Props> = ({isSelected = false, label}) => (
	<Text color={isSelected ? 'blue' : 'white'}>{label}</Text>
);

export default Item;
