import * as React from 'react';
import type {FC} from 'react';
import {Box, Text} from 'ink';
import * as figures from 'figures';
import Colors from './Colors';


export interface Props {
	isSelected?: boolean;
	accentColor?: Colors;
}

const Indicator: FC<Props> = ({isSelected = false, accentColor}) => (
	<Box marginRight={1} marginLeft={1}>
		{isSelected ? <Text color={accentColor}>{figures.pointer}</Text> : <Text> </Text>}
	</Box>
);

export default Indicator;
