import { useState } from 'react';
import Square from './Square';

const Game = () => {
	const initial_game = ['', '', '', '', '', '', '', '', ''];
	const [game, setGame] = useState(initial_game);
	return (
		<div className="h-full p-8 text-slate-800 bg-gradient-to-r from-cyan-500 to-blue-500">
			<h1 className="text-center text-5xl mb-4 text-white">
				Tic Tac Toc Game
			</h1>
			<div>
				<div className="grid grid-cols-3 gap-3 mx-auto w-96">
					{game.map((player, index) => (
						<Square key={index}>{player}</Square>
					))}
				</div>
				<div>Score</div>
			</div>
		</div>
	);
};

export default Game;
