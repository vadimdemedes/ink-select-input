'use strict';

const {h, Text, Component} = require('ink');
const PropTypes = require('prop-types');
const isEqual = require('lodash.isequal');
const figures = require('figures');

const noop = () => {};

const Indicator = ({isSelected}) => {
	if (!isSelected) {
		return ' ';
	}

	return (
		<Text blue>
			{`${figures.pointer} `}
		</Text>
	);
};

Indicator.propTypes = {
	isSelected: PropTypes.bool.isRequired
};

const Item = ({isSelected, label}) => (
	<Text blue={isSelected}>
		{label}
	</Text>
);

Item.propTypes = {
	isSelected: PropTypes.bool.isRequired,
	label: PropTypes.string.isRequired
};

class SelectInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedIndex: 0
		};

		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	render({items, indicatorComponent, itemComponent}, {selectedIndex}) {
		return items.map((item, index) => {
			const isSelected = index === selectedIndex;

			return (
				<div key={item.value}>
					{h(indicatorComponent, {isSelected})}
					{h(itemComponent, {...item, isSelected})}
				</div>
			);
		});
	}

	componentDidMount() {
		process.stdin.on('keypress', this.handleKeyPress);
	}

	componentWillUnmount() {
		process.stdin.removeListener('keypress', this.handleKeyPress);
	}

	componentWillReceiveProps(nextProps) {
		if (!isEqual(this.props.items, nextProps.items)) {
			this.setState({
				selectedIndex: 0
			});
		}
	}

	handleKeyPress(ch, key) {
		const {items, focus, onSelect} = this.props;
		const {selectedIndex} = this.state;

		if (focus === false) {
			return;
		}

		if (key.name === 'up' || key.name === 'k') {
			const lastIndex = items.length - 1;
			const atFirstIndex = selectedIndex === 0;

			this.setState({
				selectedIndex: atFirstIndex ? lastIndex : selectedIndex - 1
			});
		}

		if (key.name === 'down' || key.name === 'j') {
			const atLastIndex = selectedIndex === items.length - 1;

			this.setState({
				selectedIndex: atLastIndex ? 0 : selectedIndex + 1
			});
		}

		if (key.name === 'return') {
			onSelect(items[selectedIndex]);
		}
	}
}

SelectInput.propTypes = {
	items: PropTypes.array,
	focus: PropTypes.bool,
	indicatorComponent: PropTypes.func,
	itemComponent: PropTypes.func,
	onSelect: PropTypes.func
};

SelectInput.defaultProps = {
	items: [],
	focus: true,
	indicatorComponent: Indicator,
	itemComponent: Item,
	onSelect: noop
};

module.exports = exports = SelectInput; // eslint-disable-line no-multi-assign
exports.Indicator = Indicator;
exports.Item = Item;
