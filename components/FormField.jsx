export default function FormField({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
}) {
  return (
    <label className="flex flex-col flex-1 w-full">
      <span className="font-mono font-medium text-lg leading-relaxed mb-[10px]">
        {labelName}
      </span>
      {inputType === "file" ? (
        <input
          className="placeholder-black caret-black outline-none focus:border-emerald-500 hover:border-emerald-500 text-md py-[15px] px-[15px] border-[3px] bg-transparent rounded-[10px]"
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      ) : isTextArea ? (
        <textarea
          className="placeholder-black caret-black outline-none focus:border-emerald-500 hover:border-emerald-500 text-md py-[15px] px-[15px] border-[3px] bg-transparent rounded-[10px]"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      ) : (
        <input
          className="placeholder-black caret-black outline-none focus:border-emerald-500 hover:border-emerald-500 text-md py-[15px] px-[15px] border-[3px] bg-transparent rounded-[10px]"
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      )}
    </label>
  );
}
