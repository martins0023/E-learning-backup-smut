export const Input = (props) => {
    const {handleChange, rel_styles, name, ...values} = props;
  return (
    <input
      className="appearance-none border w-full py-3 px-4 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline"
      {...values}
      style={rel_styles}
      onChange={(e) => handleChange(e, name)}
    />
  );
};

export const TextArea = (props) => {
  const {handleTextarea, rel_styles, name, ...values} = props;
  return (
    <textarea
    className="border border-gray-300 rounded-md w-[920px] h-[122px] p-2 text-black"
    {...values}
    style={rel_styles}
    onChange={(e) => props.handleTextarea(e, name)}
  />
  )
}
