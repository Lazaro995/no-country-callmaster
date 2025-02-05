interface SectionProps {
	title: string;
	children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
	<div className="mb-4 p-4 border-b border-secondary1 bg-background1 rounded-md shadow-md">
		<h3 className="text-lg font-semibold font-montserrat text-primary3 mb-2">{title}</h3>
		{children}
	</div>
);
export default Section;