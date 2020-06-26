import React from 'react';
import PropTypes from 'prop-types';
import {Box, Text} from 'ink';
import figures from 'figures';

const Indicator = ({isSelected}) => (
	<Box marginRight={1}>
		{isSelected ? (
			<Text color="blue">
				{figures.pointer}
			</Text>
		) : ' '}
	</Box>
);

Indicator.propTypes = {
	isSelected: PropTypes.bool
};

Indicator.defaultProps = {
	isSelected: false
};

export default Indicator;
