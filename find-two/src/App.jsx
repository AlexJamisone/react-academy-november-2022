import { useState, useEffect } from 'react';

const App = () => {
	const board_icons = ['🤡', '🐧', '🦚', '👽', '🤖', '🚀', '😄', '👻'];

	const [boardData, setBoardData] = useState([]);
	const [flippedCards, setFlippedCards] = useState([]);
	const [findCards, setFindCards] = useState([]);
	const [moves, setMoves] = useState(0);
	const [gameOver, setgameOver] = useState(false);

	useEffect(() => {
		initializeGame();
	}, []);

	useEffect(() => {
		console.log(findCards);
		console.log(boardData);
		if (findCards.length > 0 && findCards.length === boardData.length) {
			setgameOver(true);
		}
	}, [moves]);

	const initializeGame = () => {
		shuhhle();
		setFlippedCards([]);
		setFindCards([]);
		setMoves(0);
		setgameOver(false);
	};

	const shuhhle = () => {
		const shuffledCards = [...board_icons, ...board_icons]
			.sort(() => Math.random() - 0.5)
			.map((v) => v);
		setBoardData(shuffledCards);
	};

	const updateBoardData = (index) => {
		if (!flippedCards.includes(index)) {
			if (flippedCards.length == 1) {
				const firstIndex = flippedCards[0];
				const secondIndex = index;
				if (boardData[firstIndex] == boardData[secondIndex]) {
					setFindCards([...findCards, firstIndex, secondIndex]);
				}
				setFlippedCards([...flippedCards, index]);
			} else if (flippedCards.length == 2) {
				setFlippedCards([index]);
			} else {
				setFlippedCards([...flippedCards, index]);
			}
			setMoves((prev) => prev + 1);
		}
	};

	return (
		<>
			<h1 className="text-center">Memory Game</h1>
			<div className="flex justify-between mx-auto m-0">
				<p>Ходы: {moves}</p>
				<p>{`Game Over: ${gameOver}`}</p>
			</div>
			<div className="flex justify-center">
				<div className="grid grid-cols-4 place-content-center gap-10">
					{boardData.map((data, index) => {
						const flipped = flippedCards.includes(index)
							? 'rotateY(180deg)'
							: '';
						const found = findCards.includes(index)
							? 'rotateY(180deg) bg-emerald-600'
							: '';
						return (
							<div
								onClick={() => updateBoardData(index)}
								key={index}
								className={`relative h-20 w-20 transition-all cursor-pointer select-none`}
								style={{
									transformStyle: 'preserve-3d',
									transform: flipped || found,
								}}
							>
								<div
									className="absolute left-0 top-0 w-full h-full z-10 text-5xl align-middle text-center leading-[1.5]"
									style={{
										transform: 'rotateY(180deg)',
										backfaceVisibility: 'hidden',
									}}
								>
									{data}
								</div>
								<div
									className={`absolute left-0 top-0 w-full h-full bg-slate-200 ${found} transition-all rounded-full`}
								></div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="flex justify-center">
				<button
					className="border py-2 px-4 rounded-full mt-10 hover:bg-slate-600 hover:text-slate-100 transition-all duration-300 disabled:bg-slate-400 disabled:text-slate-400"
					onClick={() => initializeGame()}
					disabled={!gameOver}
				>
					Reset Game
				</button>
			</div>
		</>
	);
};

export default App;
