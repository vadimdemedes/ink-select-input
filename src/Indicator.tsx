import * as React from 'react';
import type {FC} from 'react';
import {Box, Text} from 'ink';
import * as figures from 'figures';

export interface Props {
	isSelected?: boolean;
	accentColor?: string
}

const Indicator: FC<Props> = ({isSelected = false, accentColor}) => (
	<Box marginRight={1} marginLeft={1}>
		{isSelected ? <Text color={accentColor}>{figures.pointer}</Text> : <Text> </Text>}
	</Box>
);

export default Indicator;
