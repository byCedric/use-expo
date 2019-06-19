import React from 'react';
import { Caption, Text } from 'react-native-paper';
import { round } from 'lodash';

export const Measurement: React.SFC<MeasurementProps> = (props) => {
	const value = typeof props.value === 'number'
		? format(props.value, props.precision)
		: props.value;

	const unit = props.unit
		? <Caption>  {props.unit}</Caption>
		: null;

	return (
		<Text>
			{props.name}  &mdash;  {value}{unit}
		</Text>
	);
};

interface MeasurementProps {
	name: string;
	value: number | string;
	precision?: number;
	unit?: string;
}

const format = (value: number, precision: number = 3) => {
	const rounded = round(value, precision).toFixed(precision);

	return value >= 0 ? ` ${rounded}` : rounded;
};
