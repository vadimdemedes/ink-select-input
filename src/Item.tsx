import * as React from 'react';
import type {FC} from 'react';
import {Text} from 'ink';
import type {LiteralUnion} from 'type-fest';
import ForegroundColor from 'chalk';

export interface Props {
	isSelected?: boolean;
	label: string;
	defaultColor: LiteralUnion<typeof ForegroundColor, any>;
	accentColor: LiteralUnion<typeof ForegroundColor, any>;
}
// typeof chalk.ForegroundColor | typeof chalk.BackgroundColor | typeof chalk.Modifiers;
const Item: FC<Props> = ({isSelected = false, label, defaultColor, accentColor}) => (
	<Text color={isSelected ? accentColor : {defaultColor}}>{label}</Text>
);

export default Item;
