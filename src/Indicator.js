import React from 'react';
import PropTypes from 'prop-types';
import {Box, Color} from 'ink';
import figures from 'figures';

const Indicator = ({isSelected}) => (
	<Box marginRight={1}>
		{isSelected ? (
			<Color blue>
				{figures.pointer}
			</Color>
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
