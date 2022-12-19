import { useState, useEffect } from 'react';
import { BsSun } from 'react-icons/bs';
import { MdDarkMode } from 'react-icons/md';

const App = () => {
	const board_icons = ['🤡', '🐧', '🦚', '👽', '🤖', '🚀', '😄', '👻'];

	const [theme, setTheme] = useState('light');
	const [boardData, setBoardData] = useState([]);
	const [flippedCards, setFlippedCards] = useState([]);
	const [findCards, setFindCards] = useState([]);
	const [moves, setMoves] = useState(0);
	const [gameOver, setgameOver] = useState(false);

	useEffect(() => {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [theme]);

	useEffect(() => {
		initializeGame();
	}, []);

	useEffect(() => {
		if (findCards.length > 0 && findCards.length === boardData.length) {
			setgameOver(true);
		}
	}, [moves]);

	const switchTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

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
			if (flippedCards.length === 1) {
				const firstIndex = flippedCards[0];
				const secondIndex = index;
				if (boardData[firstIndex] === boardData[secondIndex]) {
					setFindCards([...findCards, firstIndex, secondIndex]);
				}
				setFlippedCards([...flippedCards, index]);
			} else if (flippedCards.length === 2) {
				setFlippedCards([index]);
			} else {
				setFlippedCards([...flippedCards, index]);
			}
			setMoves((prev) => prev + 1);
		}
	};

	return (
		<div className="bg-slate-50 h-screen dark:bg-slate-700 dark:transition-all duration-300">
			<header className="flex flex-col p-5 bg-slate-200 dark:bg-slate-700">
				<h1 className="text-center font-unb text-3xl text-slate-500 dark:text-slate-50">
					Find Two Game
				</h1>
				<div className="flex justify-center  m-5 items-center w-auto font-unb text-slate-500 dark:text-slate-50">
					<button
						className="p-2 border-2 border-slate-500 mr-5 dark:border-slate-50"
						onClick={switchTheme}
					>
						{theme === 'light' ? (<MdDarkMode/>) : (<BsSun/>)}
					</button>
					<p className="mr-10">Ходы: {moves}</p>
					<p className="ml-10">{`${
						gameOver ? 'Конец игры' : 'Игра в процессе'
					}`}</p>
				</div>
			</header>
			<div className="flex justify-center">
				<div className="grid grid-cols-4 place-content-center gap-10">
					{boardData.map((data, index) => {
						const flipped = flippedCards.includes(index)
							? 'rotateY(180deg)'
							: '';
						const found = findCards.includes(index)
							? 'rotateY(180deg) bg-emerald-400'
							: '';
						return (
							<div
								onClick={() => updateBoardData(index)}
								key={index}
								className={`relative h-20 w-20 transition-all cursor-pointer select-none mt-5`}
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
									className={`absolute left-0 top-0 w-full h-full bg-slate-300  dark:${found} transition-all rounded-full ${found}`}
								></div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="flex justify-center">
				<button
					className="py-2 px-4 rounded-full mt-10 hover:bg-slate-600 hover:text-slate-100 transition-all duration-300 disabled:bg-slate-400 disabled:text-slate-400 dark:bg-slate-300 dark:hover:bg-slate-600 dark:disabled:text-slate-300 dark:hover:disabled:bg-slate-300 disabled:cursor-not-allowed"
					onClick={() => initializeGame()}
					disabled={!gameOver}
				>
					Reset Game
				</button>
			</div>
		</div>
	);
};

export default App;
