import * as React from 'react';
import type {FC} from 'react';
import {Box, Text} from 'ink';
import * as figures from 'figures';

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
	accentColor?: colors;
}

const Indicator: FC<Props> = ({isSelected = false, accentColor}) => (
	<Box marginRight={1} marginLeft={1}>
		{isSelected ? <Text color={accentColor}>{figures.pointer}</Text> : <Text> </Text>}
	</Box>
);

export default Indicator;
