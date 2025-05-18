const ProjectTag = ({ name, onClick, isSelected }) => (
  <button
    onClick={() => onClick(name)}
    className={`relative px-5 py-2 text-sm font-medium transition-all duration-300 rounded-full ${isSelected 
      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/20" 
      : "bg-white/5 text-gray-300 hover:bg-white/10 backdrop-blur-sm"}`}
  >
    {isSelected && (
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-30 blur-md animate-pulse"></span>
    )}
    <span className="relative z-10">{name}</span>
  </button>
);

export default ProjectTag;