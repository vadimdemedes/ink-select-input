import EventEmitter from 'events';
import React from 'react';
import {render, renderToString, Box, Color} from 'ink';
import {spy} from 'sinon';
import figures from 'figures';
import test from 'ava';
import SelectInput, {Indicator, Item} from '.';

const ARROW_UP = '\u001B[A';
const ARROW_DOWN = '\u001B[B';
const ENTER = '\r';

const createInkOptions = () => {
	const stdin = new EventEmitter();
	stdin.setRawMode = () => {};
	stdin.setEncoding = () => {};

	const options = {
		stdin,
		stdout: {
			columns: 100,
			write: spy()
		},
		debug: true
	};

	return options;
};

test('indicator', t => {
	const output = renderToString((
		<Box>
			<Indicator/>X
		</Box>
	));

	t.is(output, ' X');
});

test('indicator - selected', t => {
	t.is(renderToString(<Indicator isSelected/>), renderToString((
		<Color blue>
			{`${figures.pointer} `}
		</Color>
	)));
});

test('item', t => {
	t.is(renderToString(<Item label="Test"/>), 'Test');
});

test('item - selected', t => {
	t.is(renderToString(<Item isSelected label="Test"/>), renderToString((
		<Color blue>
			Test
		</Color>
	)));
});

test('list', t => {
	const options = createInkOptions();
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	render(<SelectInput items={items}/>, options);
	const actual = options.stdout.write.lastCall.args[0];

	const expected = renderToString((
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

	t.is(actual, expected);
});

test('list - custom indicator', t => {
	const options = createInkOptions();
	const items = [{
		label: 'Test',
		value: 'test'
	}];

	const CustomIndicator = () => 'X ';

	render(<SelectInput items={items} indicatorComponent={CustomIndicator}/>, options);
	const actual = options.stdout.write.lastCall.args[0];

	const expected = renderToString((
		<Box flexDirection="column">
			<Box>
				<CustomIndicator/>
				<Item isSelected label="Test"/>
			</Box>
		</Box>
	));

	t.is(actual, expected);
});

test('list - custom item', t => {
	const options = createInkOptions();
	const items = [{
		label: 'Test',
		value: 'test'
	}];

	const CustomItem = ({label}) => `- ${label}`;

	render(<SelectInput items={items} itemComponent={CustomItem}/>, options);
	const actual = options.stdout.write.lastCall.args[0];

	const expected = renderToString((
		<Box flexDirection="column">
			<Box>
				<Indicator isSelected/>
				<CustomItem label="Test"/>
			</Box>
		</Box>
	));

	t.is(actual, expected);
});

test('list - ignore input if not focused', t => {
	const options = createInkOptions();
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	render(<SelectInput focus={false} items={items}/>, options);
	options.stdin.emit('data', ARROW_DOWN);

	const actual = options.stdout.write.lastCall.args[0];

	const expected = renderToString((
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

	t.is(actual, expected);
});

test('list - move up with up arrow key', t => {
	const options = createInkOptions();
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

	render(<SelectInput items={items}/>, options);
	options.stdin.emit('data', ARROW_UP);

	const actual = options.stdout.write.lastCall.args[0];

	const expected = renderToString((
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

	t.is(actual, expected);
});

test('list - move up with K key', t => {
	const options = createInkOptions();
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

	render(<SelectInput items={items}/>, options);
	options.stdin.emit('data', 'k');

	const actual = options.stdout.write.lastCall.args[0];

	const expected = renderToString((
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

	t.is(actual, expected);
});

test('list - move down with arrow down key', t => {
	const options = createInkOptions();
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

	render(<SelectInput items={items}/>, options);
	options.stdin.emit('data', ARROW_DOWN);

	const actual = options.stdout.write.lastCall.args[0];

	const expected = renderToString((
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

	t.is(actual, expected);
});

test('list - move down with J key', t => {
	const options = createInkOptions();
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

	render(<SelectInput items={items}/>, options);
	options.stdin.emit('data', 'j');

	const actual = options.stdout.write.lastCall.args[0];

	const expected = renderToString((
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

	t.is(actual, expected);
});

test('list - move to the beginning of the list after reaching the end', t => {
	const options = createInkOptions();
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

	render(<SelectInput items={items}/>, options);
	options.stdin.emit('data', ARROW_DOWN);
	options.stdin.emit('data', ARROW_DOWN);
	options.stdin.emit('data', ARROW_DOWN);

	const actual = options.stdout.write.lastCall.args[0];

	const expected = renderToString((
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

	t.is(actual, expected);
});

test('list - reset selection when new items are received', t => {
	const options = createInkOptions();
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	render(<SelectInput items={items}/>, options);
	options.stdin.emit('data', ARROW_DOWN);

	const newItems = [{
		label: 'Third',
		value: 'third'
	}, {
		label: 'Fourth',
		value: 'fourth'
	}];

	render(<SelectInput items={newItems}/>, options);

	const actual = options.stdout.write.lastCall.args[0];

	const expected = renderToString((
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

	t.is(actual, expected);
});

test('list - item limit', t => {
	const options = createInkOptions();
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

	render(<SelectInput items={items} limit={2}/>, options);

	let actual = options.stdout.write.lastCall.args[0];

	let expected = renderToString((
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

	t.is(actual, expected);

	options.stdin.emit('data', ARROW_DOWN);
	options.stdin.emit('data', ARROW_DOWN);

	actual = options.stdout.write.lastCall.args[0];

	expected = renderToString((
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

	t.is(actual, expected);
});

test('list - handle enter', t => {
	const options = createInkOptions();
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	const onSelect = spy();

	render(<SelectInput items={items} onSelect={onSelect}/>, options);

	options.stdin.emit('data', ARROW_DOWN);
	options.stdin.emit('data', ENTER);

	t.true(onSelect.calledOnce);
	t.deepEqual(onSelect.firstCall.args[0], items[1]);
});
