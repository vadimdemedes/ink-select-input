import * as React from "react";
import InkSelect, { Item } from ".";

const items: Item[] = [
	{ label: "label 1", value: "label 1" },
	{ label: "label 2", value: "label 2" }
];
const keyedItems: Item[] = [
	{ label: "label 1", value: "label 1", key: 1 },
	{ label: "label 2", value: "label 2", key: 2 }
];

const plain = () => <InkSelect />;
const withProps = () => <InkSelect focus={false} limit={10} />;

const selectWithItems = () => <InkSelect items={items} />;
const selectWithKeyedItems = () => <InkSelect items={keyedItems} />;

const onSelect = (item: Item) => console.log(item);
const withHandler = () => <InkSelect onSelect={onSelect} />;

const CustomIndikator: React.FC = () => <div />;
const CustomItemComponent: React.FC = () => null;
const overrideComponents = () => (
	<InkSelect
		indicatorComponent={CustomIndikator}
		itemComponent={CustomItemComponent}
	/>
);
