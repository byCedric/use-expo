import React from 'react';
import { View, ViewProps } from 'react-native';
import { withTheme } from 'react-native-paper';
import { omit } from 'lodash';
import { ThemeSpace, WithThemeProp } from '../providers/theme';

const SpaceComponent: React.SFC<SpaceProps & WithThemeProp> = (props) => (
	<View {...createViewProps(props)} style={[createStyle(props), props.style]}>
		{props.children}
	</View>
);

export const Space = withTheme(SpaceComponent);

export type SpaceDimension = ThemeSpace | number | boolean;

export interface SpaceProps extends ViewProps {
	/** The size of the space, extracted from theme (defaults to `xxmedium`) */
	size?: ThemeSpace;
	/** If or how much the space is visible on the top side */
	top?: SpaceDimension;
	/** If or how much the space is visible on the right side */
	right?: SpaceDimension;
	/** If or how much the space is visible on the bottom side */
	bottom?: SpaceDimension;
	/** If or how much the space is visible on the left side */
	left?: SpaceDimension;
	/** If or how much the space is visible on both the right and left sides */
	horizontal?: SpaceDimension;
	/** If or how much the space is visible on both the top and bottom sides */
	vertical?: SpaceDimension;
}

SpaceComponent.defaultProps = {
	size: 'medium',
};

/**
 * Get the space size for a specific axis or side.
 * This return the theme or exact size for the specific axis or side.
 * If it's not a theme or exact size it falls back to the global size.
 */
const getSizeFor = (props: SpaceProps & WithThemeProp, specific: SpaceDimension) => {
	switch (typeof specific) {
		case 'boolean':
			return props.theme.spaces[props.size!];
		case 'string':
			return props.theme.spaces[specific];
		default:
			return specific;
	}
};

/**
 * Create an inline styling object with the desired padding.
 * This first extracts the size from the theme and applies it where necessary.
 */
const createStyle = (props: SpaceProps & WithThemeProp) => {
	const { top, right, bottom, left, horizontal, vertical } = props;

	if (!top && !right && !bottom && !left && !horizontal && !vertical) {
		return { padding: getSizeFor(props, true) };
	}

	return {
		...(horizontal && { paddingHorizontal: getSizeFor(props, horizontal) }),
		...(vertical && { paddingVertical: getSizeFor(props, vertical) }),
		...(top && { paddingTop: getSizeFor(props, top) }),
		...(right && { paddingRight: getSizeFor(props, right) }),
		...(bottom && { paddingBottom: getSizeFor(props, bottom) }),
		...(left && { paddingLeft: getSizeFor(props, left) }),
	};
};

/**
 * Create a props object that is safe to spread onto the underlying `<View />`.
 * It uses Lodash's omit with all (extra) properties from the `<Space />`
 */
const createViewProps = (props: SpaceProps) => (
	omit(props, ['theme', 'size', 'top', 'right', 'bottom', 'left', 'horizontal', 'vertical'])
);

