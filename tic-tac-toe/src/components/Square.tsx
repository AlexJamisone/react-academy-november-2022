interface SquareProps {
	children: React.ReactNode;
}
const Square = ({ children }: SquareProps) => {
	return (
		<div className="h-36 border-solid border-4 border-slate-200 font-main text-7xl text-center flex justify-center items-center cursor-pointer">
			{children}
		</div>
	);
};

export default Square;
