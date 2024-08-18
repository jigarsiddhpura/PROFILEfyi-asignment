export const AnimatedButton = ({ children, onClick }) => {
    return (
        <button className="relative w-full bg-brand-primary text-white py-3 rounded-lg font-semibold mt-4 overflow-hidden group transition duration-300 ease-out hover:bg-brand-secondary"
        onClick={onClick}>
            <span className="relative z-10">{children}</span>
            <span className="
            absolute inset-0 bg-brand-secondary scale-x-0 group-hover:scale-x-100
            transition-transform duration-300 ease-out origin-center
        "></span>
        </button>
    );
};