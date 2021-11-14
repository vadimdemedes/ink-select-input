import * as React from 'react';
import type {FC} from 'react';
import {Text} from 'ink';
import Colors from './Colors';

export interface Props {
	isSelected?: boolean;
	label: string;
	defaultColor?: Colors;
	accentColor?: Colors;
}

const Item: FC<Props> = ({isSelected = false, label, defaultColor, accentColor}) => (
	<Text color={isSelected ? accentColor : defaultColor}>{label}</Text>
);

export default Item;
