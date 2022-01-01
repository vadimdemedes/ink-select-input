import * as React from 'react';
import type {FC} from 'react';
import {Box, Text} from 'ink';
import * as figures from 'figures';

export interface Props {
	isSelected?: boolean;
	color?: string;
}

const Indicator: FC<Props> = ({isSelected = false, color}) => (
	<Box marginRight={1}>
		{isSelected ? <Text color={color}>{figures.pointer}</Text> : <Text> </Text>}
	</Box>
);

export default Indicator;
