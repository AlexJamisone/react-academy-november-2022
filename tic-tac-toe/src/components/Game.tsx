import React, { useState, useEffect } from 'react';
import Square from './Square';
import { useToast } from '@chakra-ui/react';

interface Score {
	[key: string]: number;
}

const Game = () => {
	const initial_game = ['', '', '', '', '', '', '', '', ''];
	const initial_score: Score = { X: 0, O: 0 };
	const winner_combs = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	const toast = useToast()

	const [game, setGame] = useState(initial_game);
	const [currentPlayer, setCurrentPlayer] = useState('X');
	const [scores, setScores] = useState(initial_score);

	useEffect(() => {
		const storedScroes = localStorage.getItem('scores');
		if (storedScroes) {
			setScores(JSON.parse(storedScroes));
		}
	}, []);

	useEffect(() => {
		if (game === initial_game) {
			return;
		}
		checkForWinner();
	}, [game]);

	const hanndWin = () => {
		const winner = currentPlayer === "X" ? 'cyan' : 'red'
		toast({
			position: 'top',
			title: `Congratulations player: ${currentPlayer} won!`,
			status: "success",
			duration: 5000,
			isClosable: true,

		})
		const newPlayerScore = scores[currentPlayer] + 1;
		const newScores = { ...scores };
		newScores[currentPlayer] = newPlayerScore;
		setScores(newScores);
		localStorage.setItem('scores', JSON.stringify(newScores));
		resetBoard();
	};
	const hanndDraw = () => {
		toast({
			position: 'top',
			title: 'The Game in a Draw!',
			status: 'warning',
			duration: 5000,
			isClosable: true
		})
		resetBoard();
	};
	const resetBoard = () => setGame(initial_game);

	const checkForWinner = () => {
		let roundeWin = false;
		for (let i = 0; i < winner_combs.length; i++) {
			const winComp = winner_combs[i];
			let a = game[winComp[0]];
			let b = game[winComp[1]];
			let c = game[winComp[2]];
			if ([a, b, c].includes('')) {
				continue;
			}
			if (a === b && b === c) {
				roundeWin = true;
				break;
			}
		}
		if (roundeWin) {
			setTimeout(() => hanndWin(), 500);
			return;
		}
		if (!game.includes('')) {
			setTimeout(() => hanndDraw(), 500);
			return;
		}
		changePlayer();
	};

	const changePlayer = () => {
		setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
	};
	const handlClick = (e: React.MouseEvent<HTMLElement>) => {
		const target = e.target as HTMLElement;
		const attr = target.getAttribute('data-index');
		const index = Number(attr);
		const currentValue = game[index];
		if (currentValue) {
			return;
		}
		const newValues = [...game];
		newValues[index] = currentPlayer;
		setGame(newValues);
	};
	return (
		<div className="h-full p-8 text-slate-800 bg-gray-800">
			<h1 className="text-center text-5xl mb-4 text-white">
				Tic Tac Toc Game
			</h1>
			<div className="flex flex-col-reverse justify-center items-center mb-10 text-slate-300">
				<p className="text-xl mt-5">
					Next Player: <span>{currentPlayer}</span>
				</p>
				<p>
					Player X wins: <span>{scores['X']}</span>
				</p>
				<p>
					Player O wins: <span>{scores['O']}</span>
				</p>
			</div>
			<div className="flex flex-col justify-center items-center">
				<div className="grid grid-cols-3 gap-3 mx-auto w-96 mb-10">
					{game.map((player, index) => (
						<Square
							onClick={handlClick}
							key={index}
							{...{ index, player }}
						/>
					))}
				</div>
				<button
					className="py-3 px-8 font-medium bg-cyan-600 text-teal-50 border-0 hover:bg-cyan-500 hover:text-slate-500 transition-all duration-500 ease-in-out rounded-xl"
					onClick={() => setGame(initial_game)}
				>
					Reset Game
				</button>
			</div>
		</div>
	);
};

export default Game;
