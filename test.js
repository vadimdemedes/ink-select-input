import React from 'react';
import {Box, Color} from 'ink';
import {render} from 'ink-testing-library';
import {spy} from 'sinon';
import figures from 'figures';
import test from 'ava';
import SelectInput, {Indicator, Item} from '.';

const ARROW_UP = '\u001B[A';
const ARROW_DOWN = '\u001B[B';
const ENTER = '\r';

test('indicator', t => {
	const {lastFrame} = render((
		<Box>
			<Indicator/>X
		</Box>
	));

	t.is(lastFrame(), '  X');
});

test('indicator - selected', t => {
	const actual = render(<Indicator isSelected/>);
	const expected = render(<Color blue>{figures.pointer}</Color>);

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('item', t => {
	const {lastFrame} = render(<Item label="Test"/>);

	t.is(lastFrame(), 'Test');
});

test('item - selected', t => {
	const actual = render(<Item isSelected label="Test"/>);
	const expected = render(<Color blue>Test</Color>);

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	const actual = render(<SelectInput items={items}/>);

	const expected = render((
		<Box flexDirection="column">
			<Box>
				<Indicator isSelected/>
				<Item isSelected label="First"/>
			</Box>

			<Box>
				<Indicator/>
				<Item label="Second"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - initial index', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	const actual = render(<SelectInput items={items} initialIndex={1}/>);

	const expected = render((
		<Box flexDirection="column">
			<Box>
				<Indicator/>
				<Item label="First"/>
			</Box>

			<Box>
				<Indicator isSelected/>
				<Item isSelected label="Second"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - custom indicator', t => {
	const items = [{
		label: 'Test',
		value: 'test'
	}];

	const CustomIndicator = () => 'X ';

	const actual = render(<SelectInput items={items} indicatorComponent={CustomIndicator}/>);

	const expected = render((
		<Box flexDirection="column">
			<Box>
				<CustomIndicator/>
				<Item isSelected label="Test"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - custom item', t => {
	const items = [{
		label: 'Test',
		value: 'test'
	}];

	const CustomItem = ({label}) => `- ${label}`;

	const actual = render(<SelectInput items={items} itemComponent={CustomItem}/>);

	const expected = render((
		<Box flexDirection="column">
			<Box>
				<Indicator isSelected/>
				<CustomItem label="Test"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - ignore input if not focused', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	const actual = render(<SelectInput focus={false} items={items}/>);
	actual.stdin.write(ARROW_DOWN);

	const expected = render((
		<Box flexDirection="column">
			<Box>
				<Indicator isSelected/>
				<Item isSelected label="First"/>
			</Box>

			<Box>
				<Indicator/>
				<Item label="Second"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - move up with up arrow key', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}, {
		label: 'Third',
		value: 'third'
	}];

	const actual = render(<SelectInput items={items}/>);
	actual.stdin.write(ARROW_UP);

	const expected = render((
		<Box flexDirection="column">
			<Box>
				<Indicator/>
				<Item label="First"/>
			</Box>

			<Box>
				<Indicator/>
				<Item label="Second"/>
			</Box>

			<Box>
				<Indicator isSelected/>
				<Item isSelected label="Third"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - move up with K key', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}, {
		label: 'Third',
		value: 'third'
	}];

	const actual = render(<SelectInput items={items}/>);
	actual.stdin.write('k');

	const expected = render((
		<Box flexDirection="column">
			<Box>
				<Indicator/>
				<Item label="First"/>
			</Box>

			<Box>
				<Indicator/>
				<Item label="Second"/>
			</Box>

			<Box>
				<Indicator isSelected/>
				<Item isSelected label="Third"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - move down with arrow down key', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}, {
		label: 'Third',
		value: 'third'
	}];

	const actual = render(<SelectInput items={items}/>);
	actual.stdin.write(ARROW_DOWN);

	const expected = render((
		<Box flexDirection="column">
			<Box>
				<Indicator/>
				<Item label="First"/>
			</Box>

			<Box>
				<Indicator isSelected/>
				<Item isSelected label="Second"/>
			</Box>

			<Box>
				<Indicator/>
				<Item label="Third"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - move down with J key', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}, {
		label: 'Third',
		value: 'third'
	}];

	const actual = render(<SelectInput items={items}/>);
	actual.stdin.write('j');

	const expected = render((
		<Box flexDirection="column">
			<Box>
				<Indicator/>
				<Item label="First"/>
			</Box>

			<Box>
				<Indicator isSelected/>
				<Item isSelected label="Second"/>
			</Box>

			<Box>
				<Indicator/>
				<Item label="Third"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - move to the beginning of the list after reaching the end', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}, {
		label: 'Third',
		value: 'third'
	}];

	const actual = render(<SelectInput items={items}/>);
	actual.stdin.write(ARROW_DOWN);
	actual.stdin.write(ARROW_DOWN);
	actual.stdin.write(ARROW_DOWN);

	const expected = render((
		<Box flexDirection="column">
			<Box>
				<Indicator isSelected/>
				<Item isSelected label="First"/>
			</Box>

			<Box>
				<Indicator/>
				<Item label="Second"/>
			</Box>

			<Box>
				<Indicator/>
				<Item label="Third"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - reset selection when new items are received', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	const actual = render(<SelectInput items={items}/>);
	actual.stdin.write(ARROW_DOWN);

	const newItems = [{
		label: 'Third',
		value: 'third'
	}, {
		label: 'Fourth',
		value: 'fourth'
	}];

	actual.rerender(<SelectInput items={newItems}/>);

	const expected = render((
		<Box flexDirection="column">
			<Box>
				<Indicator isSelected/>
				<Item isSelected label="Third"/>
			</Box>

			<Box>
				<Indicator/>
				<Item label="Fourth"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - item limit', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}, {
		label: 'Third',
		value: 'third'
	}];

	const actual = render(<SelectInput items={items} limit={2}/>);

	const expected = render((
		<Box flexDirection="column">
			<Box>
				<Indicator isSelected/>
				<Item isSelected label="First"/>
			</Box>

			<Box>
				<Indicator/>
				<Item label="Second"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());

	actual.stdin.write(ARROW_DOWN);
	actual.stdin.write(ARROW_DOWN);

	expected.rerender((
		<Box flexDirection="column">
			<Box>
				<Indicator/>
				<Item label="Second"/>
			</Box>

			<Box>
				<Indicator isSelected/>
				<Item isSelected label="Third"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - handle enter', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	const onSelect = spy();
	const {stdin} = render(<SelectInput items={items} onSelect={onSelect}/>);

	stdin.write(ARROW_DOWN);
	stdin.write(ENTER);

	t.true(onSelect.calledOnce);
	t.deepEqual(onSelect.firstCall.args[0], items[1]);
});

test('list - don\'t rotate when there are less items than limit', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	const actual = render(<SelectInput items={items} limit={4}/>);
	actual.stdin.write(ARROW_DOWN);
	actual.stdin.write(ARROW_DOWN);

	const expected = render((
		<Box flexDirection="column">
			<Box>
				<Indicator isSelected/>
				<Item isSelected label="First"/>
			</Box>

			<Box>
				<Indicator/>
				<Item label="Second"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - rotate when there are more items than limit', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}, {
		label: 'Third',
		value: 'third'
	}];

	const actual = render(<SelectInput items={items} limit={2}/>);
	actual.stdin.write(ARROW_DOWN);
	actual.stdin.write(ARROW_DOWN);

	const expected = render((
		<Box flexDirection="column">
			<Box>
				<Indicator/>
				<Item label="Second"/>
			</Box>

			<Box>
				<Indicator isSelected/>
				<Item isSelected label="Third"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - onHighlight', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}, {
		label: 'Third',
		value: 'third'
	}];

	const onHighlight = spy();
	const {stdin} = render(<SelectInput items={items} limit={2} onHighlight={onHighlight}/>);

	stdin.write(ARROW_DOWN);
	stdin.write(ARROW_DOWN);

	t.true(onHighlight.calledTwice);
	t.deepEqual(onHighlight.firstCall.args[0], items[1]);
	t.deepEqual(onHighlight.secondCall.args[0], items[2]);
});
