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
      <span className="font-mono font-medium text-[22px] leading-relaxed mb-[10px] text-black">
        {labelName}
      </span>
      {inputType === "file" ? (
        <div className="flex justify-center w-full ">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 rounded-[10px] cursor-pointer bg-transparent outline-none focus:border-emerald-500 hover:border-emerald-500 border-[3px]"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-[18px] text-black dark:text-gray-400">
                <span className="font-semibold">Click to upload</span>
              </p>
              <p className="text-[18px] text-black dark:text-gray-400">
                SVG, PNG or JPG
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="block text-[16px] text-black file:mr-4 file:py-2 file:px-4
              file:rounded-[10px] file:border-[3px]
              file:text-[16px] file:font-semibold
              file:bg-[#1c1c24] file:text-white
              hover:file:bg-emerald-500"
              onChange={handleChange}
            />
          </label>
        </div>
      ) : isTextArea ? (
        <textarea
          className="py-[10px] sm:px-[20px] px-[15px] outline-none focus:border-emerald-500 hover:border-emerald-500 text-[20px] py-[15px] px-[15px] border-[3px] font-epilogue text-black leading-[30px] placeholder:text-black rounded-[10px] bg-transparent"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      ) : (
        <input
          className="py-[10px] sm:px-[20px] px-[15px] outline-none focus:border-emerald-500 hover:border-emerald-500 text-[20px] py-[15px] px-[15px] border-[3px] font-epilogue text-black leading-[30px] placeholder:text-black rounded-[10px] bg-transparent"
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      )}
    </label>
  );
}
