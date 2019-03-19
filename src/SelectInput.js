import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import arrRotate from 'arr-rotate';
import {Box, StdinContext} from 'ink';
import Indicator from './Indicator';
import Item from './Item';

const ARROW_UP = '\u001B[A';
const ARROW_DOWN = '\u001B[B';
const ENTER = '\r';

class SelectInput extends PureComponent {
	static propTypes = {
		items: PropTypes.array,
		focus: PropTypes.bool,
		initialIndex: PropTypes.number,
		indicatorComponent: PropTypes.func,
		itemComponent: PropTypes.func,
		limit: PropTypes.number,
		onSelect: PropTypes.func,
		onHighlight: PropTypes.func
	}

	static defaultProps = {
		items: [],
		focus: true,
		initialIndex: 0,
		indicatorComponent: Indicator,
		itemComponent: Item,
		limit: null,
		onSelect() {},
		onHighlight() {}
	}

	state = {
		rotateIndex: 0,
		selectedIndex: this.props.initialIndex
	}

	render() {
		const {items, indicatorComponent, itemComponent} = this.props;
		const {rotateIndex, selectedIndex} = this.state;
		const limit = this.getLimit();

		const slicedItems = this.hasLimit() ? arrRotate(items, rotateIndex).slice(0, limit) : items;

		return (
			<Box flexDirection="column">
				{slicedItems.map((item, index) => {
					const isSelected = index === selectedIndex;

					return (
						<Box key={item.key || item.value}>
							{React.createElement(indicatorComponent, {isSelected})}
							{React.createElement(itemComponent, {...item, isSelected})}
						</Box>
					);
				})}
			</Box>
		);
	}

	componentDidMount() {
		const {stdin, setRawMode} = this.props; // eslint-disable-line react/prop-types

		setRawMode(true);
		stdin.on('data', this.handleInput);
	}

	componentWillUnmount() {
		const {stdin, setRawMode} = this.props; // eslint-disable-line react/prop-types

		stdin.removeListener('data', this.handleInput);
		setRawMode(false);
	}

	componentDidUpdate(prevProps, prevState) {
		if (!isEqual(prevProps.items, this.props.items)) {
			this.setState({ // eslint-disable-line react/no-did-update-set-state
				rotateIndex: 0,
				selectedIndex: 0
			});
		}

		if (prevState.selectedIndex !== this.state.selectedIndex) {
			const {onHighlight, items} = this.props;
			const {rotateIndex, selectedIndex} = this.state;
			const hasLimit = this.hasLimit();
			const limit = this.getLimit();
			const slicedItems = hasLimit ? arrRotate(items, rotateIndex).slice(0, limit) : items;
			onHighlight(slicedItems[selectedIndex]);
		}
	}

	handleInput = data => {
		const {items, focus, onSelect} = this.props;
		const {rotateIndex, selectedIndex} = this.state;
		const hasLimit = this.hasLimit();
		const limit = this.getLimit();

		if (focus === false) {
			return;
		}

		const s = String(data);

		if (s === ARROW_UP || s === 'k') {
			const lastIndex = (hasLimit ? limit : items.length) - 1;
			const atFirstIndex = selectedIndex === 0;
			const nextIndex = (hasLimit ? selectedIndex : lastIndex);

			this.setState({
				rotateIndex: atFirstIndex ? rotateIndex + 1 : rotateIndex,
				selectedIndex: atFirstIndex ? nextIndex : selectedIndex - 1
			});
		}

		if (s === ARROW_DOWN || s === 'j') {
			const atLastIndex = selectedIndex === (hasLimit ? limit : items.length) - 1;
			const nextIndex = (hasLimit ? selectedIndex : 0);

			this.setState({
				rotateIndex: atLastIndex ? rotateIndex - 1 : rotateIndex,
				selectedIndex: atLastIndex ? nextIndex : selectedIndex + 1
			});
		}

		if (s === ENTER) {
			const slicedItems = hasLimit ? arrRotate(items, rotateIndex).slice(0, limit) : items;
			onSelect(slicedItems[selectedIndex]);
		}
	}

	hasLimit = () => {
		const {limit, items} = this.props;

		return typeof limit === 'number' && items.length > limit;
	}

	getLimit = () => {
		const {limit, items} = this.props;

		if (this.hasLimit()) {
			return Math.min(limit, items.length);
		}

		return items.length;
	}
}

export default class SelectInputWithStdin extends PureComponent {
	render() {
		return (
			<StdinContext.Consumer>
				{({stdin, setRawMode}) => (
					<SelectInput {...this.props} stdin={stdin} setRawMode={setRawMode}/>
				)}
			</StdinContext.Consumer>
		);
	}
}

export {Indicator, Item};
