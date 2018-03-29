'use strict';

const {h, Text, Component} = require('ink');
const PropTypes = require('prop-types');
const isEqual = require('lodash.isequal');
const figures = require('figures');
const arrRotate = require('arr-rotate');

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
			rotateIndex: 0,
			selectedIndex: 0
		};

		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	render({items, indicatorComponent, itemComponent, limit}, {rotateIndex, selectedIndex}) {
		const slicedItems = typeof limit === 'number' ? arrRotate(items, rotateIndex).slice(0, limit) : items;

		return slicedItems.map((item, index) => {
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
				rotateIndex: 0,
				selectedIndex: 0
			});
		}
	}

	handleKeyPress(ch, key) {
		const {items, focus, limit, onSelect} = this.props;
		const {rotateIndex, selectedIndex} = this.state;

		if (focus === false) {
			return;
		}

		if (key.name === 'up' || key.name === 'k') {
			const lastIndex = (typeof limit === 'number' ? limit : items.length) - 1;
			const atFirstIndex = selectedIndex === 0;
			const nextIndex = (typeof limit === 'number' ? selectedIndex : lastIndex);

			this.setState({
				rotateIndex: atFirstIndex ? rotateIndex + 1 : rotateIndex,
				selectedIndex: atFirstIndex ? nextIndex : selectedIndex - 1
			});
		}

		if (key.name === 'down' || key.name === 'j') {
			const atLastIndex = selectedIndex === (typeof limit === 'number' ? limit : items.length) - 1;
			const nextIndex = (typeof limit === 'number' ? selectedIndex : 0);

			this.setState({
				rotateIndex: atLastIndex ? rotateIndex - 1 : rotateIndex,
				selectedIndex: atLastIndex ? nextIndex : selectedIndex + 1
			});
		}

		if (key.name === 'return') {
			const slicedItems = typeof limit === 'number' ? arrRotate(items, rotateIndex).slice(0, limit) : items;
			onSelect(slicedItems[selectedIndex]);
		}
	}
}

SelectInput.propTypes = {
	items: PropTypes.array,
	focus: PropTypes.bool,
	indicatorComponent: PropTypes.func,
	itemComponent: PropTypes.func,
	limit: PropTypes.number,
	onSelect: PropTypes.func
};

SelectInput.defaultProps = {
	items: [],
	focus: true,
	indicatorComponent: Indicator,
	itemComponent: Item,
	limit: null,
	onSelect: noop
};

module.exports = exports = SelectInput; // eslint-disable-line no-multi-assign
exports.Indicator = Indicator;
exports.Item = Item;
