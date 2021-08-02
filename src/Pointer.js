import React from 'react'


const PointerShape = ({ type, width, height, color, className }) => {
	switch (type) {
		case 'rect':
			return (<rect
				x={-width * 0.5}
				width={width}
				height={height}
				fill={color}
				className={className}
			/>)
		case 'circle':
			return (<circle
				r={width}
				fill={color}
				className={className}
			/>)
	}
}


export const Pointer = ({
	children,
	width,
	height = width,
	angleOffset,
	angleRange,
	percentage,
	radius,
	center,
	type,
	color,
	className,
}) => (
	<g
		transform={`
        rotate(${angleOffset + angleRange * percentage} ${center} ${center})
        translate( ${center} ${center - radius - height})
        `}
	>
		{children &&
			React.Children.map(children, child =>
				React.cloneElement(child, {
					width,
					height,
					percentage,
				})
			)}
		{type && (<PointerShape
			type={type}
			width={width}
			height={height}
			color={color}
			className={className}
		/>)}
	</g>
)
