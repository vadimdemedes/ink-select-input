import React from 'react';
import {Box, Text} from 'ink';
import {render} from 'ink-testing-library';
import {spy} from 'sinon';
import figures from 'figures';
import test from 'ava';
import delay from 'delay';
import SelectInput, {Indicator, Item} from '.';

const ARROW_UP = '\u001B[A';
const ARROW_DOWN = '\u001B[B';
const ENTER = '\r';

test('indicator', t => {
	const {lastFrame} = render(
		<Box>
			<Indicator />
			<Text>X</Text>
		</Box>
	);

	t.is(lastFrame(), '  X');
});

test('indicator - selected', t => {
	const actual = render(<Indicator isSelected />);
	const expected = render(<Text color="blue">{figures.pointer}</Text>);

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('item', t => {
	const {lastFrame} = render(<Item label="Test" />);

	t.is(lastFrame(), 'Test');
});

test('item - selected', t => {
	const actual = render(<Item isSelected label="Test" />);
	const expected = render(<Text color="blue">Test</Text>);

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list', t => {
	const items = [
		{
			label: 'First',
			value: 'first'
		},
		{
			label: 'Second',
			value: 'second'
		}
	];

	const actual = render(<SelectInput items={items} />);

	const expected = render(
		<Box flexDirection="column">
			<Box>
				<Indicator isSelected />
				<Item isSelected label="First" />
			</Box>

			<Box>
				<Indicator />
				<Item label="Second" />
			</Box>
		</Box>
	);

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - initial index', t => {
	const items = [
		{
			label: 'First',
			value: 'first'
		},
		{
			label: 'Second',
			value: 'second'
		}
	];

	const actual = render(<SelectInput items={items} initialIndex={1} />);

	const expected = render(
		<Box flexDirection="column">
			<Box>
				<Indicator />
				<Item label="First" />
			</Box>

			<Box>
				<Indicator isSelected />
				<Item isSelected label="Second" />
			</Box>
		</Box>
	);

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - custom indicator', t => {
	const items = [
		{
			label: 'Test',
			value: 'test'
		}
	];

	const CustomIndicator = () => <Text>X </Text>;

	const actual = render(
		<SelectInput items={items} indicatorComponent={CustomIndicator} />
	);

	const expected = render(
		<Box flexDirection="column">
			<Box>
				<CustomIndicator />
				<Item isSelected label="Test" />
			</Box>
		</Box>
	);

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - custom item', t => {
	const items = [
		{
			label: 'Test',
			value: 'test'
		}
	];

	const CustomItem = ({label}) => <Text>- {label}</Text>;

	const actual = render(
		<SelectInput items={items} itemComponent={CustomItem} />
	);

	const expected = render(
		<Box flexDirection="column">
			<Box>
				<Indicator isSelected />
				<CustomItem label="Test" />
			</Box>
		</Box>
	);

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - ignore input if not focused', async t => {
	const items = [
		{
			label: 'First',
			value: 'first'
		},
		{
			label: 'Second',
			value: 'second'
		}
	];

	const actual = render(<SelectInput isFocused={false} items={items} />);

	await delay(100);
	actual.stdin.write(ARROW_DOWN);
	await delay(100);

	const expected = render(
		<Box flexDirection="column">
			<Box>
				<Indicator isSelected />
				<Item isSelected label="First" />
			</Box>

			<Box>
				<Indicator />
				<Item label="Second" />
			</Box>
		</Box>
	);

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - move up with up arrow key', async t => {
	const items = [
		{
			label: 'First',
			value: 'first'
		},
		{
			label: 'Second',
			value: 'second'
		},
		{
			label: 'Third',
			value: 'third'
		}
	];

	const actual = render(<SelectInput items={items} />);

	await delay(100);
	actual.stdin.write(ARROW_UP);
	await delay(100);

	const expected = render(
		<Box flexDirection="column">
			<Box>
				<Indicator />
				<Item label="First" />
			</Box>

			<Box>
				<Indicator />
				<Item label="Second" />
			</Box>

			<Box>
				<Indicator isSelected />
				<Item isSelected label="Third" />
			</Box>
		</Box>
	);

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - move up with K key', async t => {
	const items = [
		{
			label: 'First',
			value: 'first'
		},
		{
			label: 'Second',
			value: 'second'
		},
		{
			label: 'Third',
			value: 'third'
		}
	];

	const actual = render(<SelectInput items={items} />);

	await delay(100);
	actual.stdin.write('k');
	await delay(100);

	const expected = render(
		<Box flexDirection="column">
			<Box>
				<Indicator />
				<Item label="First" />
			</Box>

			<Box>
				<Indicator />
				<Item label="Second" />
			</Box>

			<Box>
				<Indicator isSelected />
				<Item isSelected label="Third" />
			</Box>
		</Box>
	);

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - move down with arrow down key', async t => {
	const items = [
		{
			label: 'First',
			value: 'first'
		},
		{
			label: 'Second',
			value: 'second'
		},
		{
			label: 'Third',
			value: 'third'
		}
	];

	const actual = render(<SelectInput items={items} />);

	await delay(100);
	actual.stdin.write(ARROW_DOWN);
	await delay(100);

	const expected = render(
		<Box flexDirection="column">
			<Box>
				<Indicator />
				<Item label="First" />
			</Box>

			<Box>
				<Indicator isSelected />
				<Item isSelected label="Second" />
			</Box>

			<Box>
				<Indicator />
				<Item label="Third" />
			</Box>
		</Box>
	);

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - move down with J key', async t => {
	const items = [
		{
			label: 'First',
			value: 'first'
		},
		{
			label: 'Second',
			value: 'second'
		},
		{
			label: 'Third',
			value: 'third'
		}
	];

	const actual = render(<SelectInput items={items} />);

	await delay(100);
	actual.stdin.write('j');
	await delay(100);

	const expected = render(
		<Box flexDirection="column">
			<Box>
				<Indicator />
				<Item label="First" />
			</Box>

			<Box>
				<Indicator isSelected />
				<Item isSelected label="Second" />
			</Box>

			<Box>
				<Indicator />
				<Item label="Third" />
			</Box>
		</Box>
	);

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - move to the beginning of the list after reaching the end', async t => {
	const items = [
		{
			label: 'First',
			value: 'first'
		},
		{
			label: 'Second',
			value: 'second'
		},
		{
			label: 'Third',
			value: 'third'
		}
	];

	const actual = render(<SelectInput items={items} />);

	await delay(100);
	actual.stdin.write(ARROW_DOWN);
	await delay(100);
	actual.stdin.write(ARROW_DOWN);
	await delay(100);
	actual.stdin.write(ARROW_DOWN);
	await delay(100);

	const expected = render(
		<Box flexDirection="column">
			<Box>
				<Indicator isSelected />
				<Item isSelected label="First" />
			</Box>

			<Box>
				<Indicator />
				<Item label="Second" />
			</Box>

			<Box>
				<Indicator />
				<Item label="Third" />
			</Box>
		</Box>
	);

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - do not reset selection when the values of new items are not changed', async t => {
	const items = [
		{
			label: 'First',
			value: 'first'
		},
		{
			label: 'Second',
			value: 'second'
		}
	];

	const actual = render(<SelectInput items={items} />);

	await delay(100);
	actual.stdin.write(ARROW_DOWN);
	await delay(100);

	const newItems = [
		{
			label: 'First new',
			value: 'first'
		},
		{
			label: 'Second new',
			value: 'second'
		}
	];

	actual.rerender(<SelectInput items={newItems} />);

	const expected = render(
		<Box flexDirection="column">
			<Box>
				<Indicator />
				<Item label="First new" />
			</Box>

			<Box>
				<Indicator isSelected />
				<Item isSelected label="Second new" />
			</Box>
		</Box>
	);

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - reset selection when new items are received', async t => {
	const items = [
		{
			label: 'First',
			value: 'first'
		},
		{
			label: 'Second',
			value: 'second'
		}
	];

	const actual = render(<SelectInput items={items} />);

	await delay(100);
	actual.stdin.write(ARROW_DOWN);
	await delay(100);

	const newItems = [
		{
			label: 'Third',
			value: 'third'
		},
		{
			label: 'Fourth',
			value: 'fourth'
		}
	];

	actual.rerender(<SelectInput items={newItems} />);

	const expected = render(
		<Box flexDirection="column">
			<Box>
				<Indicator isSelected />
				<Item isSelected label="Third" />
			</Box>

			<Box>
				<Indicator />
				<Item label="Fourth" />
			</Box>
		</Box>
	);

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - item limit', async t => {
	const items = [
		{
			label: 'First',
			value: 'first'
		},
		{
			label: 'Second',
			value: 'second'
		},
		{
			label: 'Third',
			value: 'third'
		}
	];

	const actual = render(<SelectInput items={items} limit={2} />);

	const expected = render(
		<Box flexDirection="column">
			<Box>
				<Indicator isSelected />
				<Item isSelected label="First" />
			</Box>

			<Box>
				<Indicator />
				<Item label="Second" />
			</Box>
		</Box>
	);

	t.is(actual.lastFrame(), expected.lastFrame());

	await delay(100);
	actual.stdin.write(ARROW_DOWN);
	await delay(100);
	actual.stdin.write(ARROW_DOWN);
	await delay(100);

	expected.rerender(
		<Box flexDirection="column">
			<Box>
				<Indicator />
				<Item label="Second" />
			</Box>

			<Box>
				<Indicator isSelected />
				<Item isSelected label="Third" />
			</Box>
		</Box>
	);

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - handle enter', async t => {
	const items = [
		{
			label: 'First',
			value: 'first'
		},
		{
			label: 'Second',
			value: 'second'
		}
	];

	const onSelect = spy();
	const {stdin} = render(<SelectInput items={items} onSelect={onSelect} />);

	await delay(100);
	stdin.write(ARROW_DOWN);
	await delay(100);
	stdin.write(ENTER);
	await delay(100);

	t.true(onSelect.calledOnce);
	t.deepEqual(onSelect.firstCall.args[0], items[1]);
});

// eslint-disable-next-line @typescript-eslint/quotes
test("list - don't rotate when there are less items than limit", async t => {
	const items = [
		{
			label: 'First',
			value: 'first'
		},
		{
			label: 'Second',
			value: 'second'
		}
	];

	const actual = render(<SelectInput items={items} limit={4} />);

	await delay(100);
	actual.stdin.write(ARROW_DOWN);
	await delay(100);
	actual.stdin.write(ARROW_DOWN);
	await delay(100);

	const expected = render(
		<Box flexDirection="column">
			<Box>
				<Indicator isSelected />
				<Item isSelected label="First" />
			</Box>

			<Box>
				<Indicator />
				<Item label="Second" />
			</Box>
		</Box>
	);

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - rotate when there are more items than limit', async t => {
	const items = [
		{
			label: 'First',
			value: 'first'
		},
		{
			label: 'Second',
			value: 'second'
		},
		{
			label: 'Third',
			value: 'third'
		}
	];

	const actual = render(<SelectInput items={items} limit={2} />);

	await delay(100);
	actual.stdin.write(ARROW_DOWN);
	await delay(100);
	actual.stdin.write(ARROW_DOWN);
	await delay(100);

	const expected = render(
		<Box flexDirection="column">
			<Box>
				<Indicator />
				<Item label="Second" />
			</Box>

			<Box>
				<Indicator isSelected />
				<Item isSelected label="Third" />
			</Box>
		</Box>
	);

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - onHighlight', async t => {
	const items = [
		{
			label: 'First',
			value: 'first'
		},
		{
			label: 'Second',
			value: 'second'
		},
		{
			label: 'Third',
			value: 'third'
		}
	];

	const onHighlight = spy();
	const {stdin} = render(
		<SelectInput items={items} limit={2} onHighlight={onHighlight} />
	);

	await delay(100);
	stdin.write(ARROW_DOWN);
	await delay(100);
	stdin.write(ARROW_DOWN);
	await delay(100);

	t.true(onHighlight.calledTwice);
	t.deepEqual(onHighlight.firstCall.args[0], items[1]);
	t.deepEqual(onHighlight.secondCall.args[0], items[2]);
});
