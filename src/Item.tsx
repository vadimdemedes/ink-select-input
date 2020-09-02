import * as React from 'react';
import type {FC} from 'react';
import {Text} from 'ink';

declare type colors = 'black'
	| 'red'
	| 'green'
	| 'yellow'
	| 'blue'
	| 'magenta'
	| 'cyan'
	| 'white'
	| 'gray'
	| 'grey'
	| 'blackBright'
	| 'redBright'
	| 'greenBright'
	| 'yellowBright'
	| 'blueBright'
	| 'magentaBright'
	| 'cyanBright'
	| 'whiteBright';

export interface Props {
	isSelected?: boolean;
	label: string;
	defaultColor: colors,
	accentColor: colors,
}
// typeof chalk.ForegroundColor | typeof chalk.BackgroundColor | typeof chalk.Modifiers;
const Item: FC<Props> = ({isSelected = false, label, defaultColor, accentColor}) => (
	<Text color={isSelected ? accentColor : defaultColor}>{label}</Text>
);

export default Item;
