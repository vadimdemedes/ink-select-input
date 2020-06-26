import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'ink';

const Item = ({isSelected, label}) => (
	<Text color={isSelected ? 'blue' : 'white'}>
		{label}
	</Text>
);

Item.propTypes = {
	isSelected: PropTypes.bool,
	label: PropTypes.string.isRequired
};

Item.defaultProps = {
	isSelected: false
};

export default Item;
