import React from 'react';
import PropTypes from 'prop-types';
import {Color} from 'ink';

const Item = ({isSelected, label}) => (
	<Color blue={isSelected}>
		{label}
	</Color>
);

Item.propTypes = {
	isSelected: PropTypes.bool,
	label: PropTypes.string.isRequired
};

Item.defaultProps = {
	isSelected: false
};

export default Item;
