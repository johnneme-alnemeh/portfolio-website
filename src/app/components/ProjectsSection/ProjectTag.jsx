const ProjectTag = ({ name, onClick, isSelected }) => (
    <button
      onClick={() => onClick(name)}
      className={`border-2 rounded-full px-6 py-3 text-xl cursor-pointer ${
        isSelected ? "text-white border-purple-500" : "text-[#ADB7BE] border-slate-600 hover:border-white"
      }`}
    >
      {name}
    </button>
  );
  
  export default ProjectTag;
  