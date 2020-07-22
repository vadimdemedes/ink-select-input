import * as React from 'react';
import type {FC} from 'react';
import {Box, Text} from 'ink';
import * as figures from 'figures';

export interface Props {
	isSelected?: boolean;
}

const Indicator: FC<Props> = ({isSelected = false}) => (
	<Box marginRight={1}>
		{isSelected ? <Text color="blue">{figures.pointer}</Text> : <Text> </Text>}
	</Box>
);

export default Indicator;
