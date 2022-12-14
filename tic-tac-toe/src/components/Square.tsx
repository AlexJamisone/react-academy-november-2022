import React from 'react';

interface SquareProps {
	player?: string;
	index: number;
	onClick(e: React.MouseEvent<HTMLElement>): void;
}
const Square = ({ player, index, onClick }: SquareProps) => {
	const scale = player ? 'scale-100' : 'scale-0';
	const textColor = player === 'X' ? 'text-cyan-400' : 'text-red-400';
	const hoverStyle = 'transition duration-500 hover:scale-105 transform';
	return (
		<div
			data-index={index}
			className={`h-36 border-solid border-4 border-slate-200 font-game text-7xl text-center flex justify-center items-center cursor-pointer rounded-3xl ${hoverStyle}`}
			{...{ onClick }}
		>
			<span
				data-index={index}
				className={`transform transition-all duration-150 ease-in-out ${scale} ${textColor}`}
			>
				{player}
			</span>
		</div>
	);
};

export default Square;
