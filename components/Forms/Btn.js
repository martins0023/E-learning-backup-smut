import { CgSpinner } from "react-icons/cg";

export const Btn = (props) => {
  return (
    <button
      className={`font-normal py-3 px-10 flex items-center justify-center w-[150px] focus:outline-none focus:shadow-outline rounded-full ${
        props.disabled ? "bg-gray-300 text-[#A0A0A0]" : "bg-primary text-white"
      }`}
      style={props.style}
      type="button"
      disabled={props.disabled || props.loading}
      onClick={props.handleClick}
    >
      {props.loading ? (
        <CgSpinner size={25} className="animate-spin" />
      ) : (
        props.label
      )}
    </button>
  );
};


export const ContinueBtn = (props) => {
  return (
    <button
      className={`rounded-full px-6 py-2 w-[250px] h-[50px] flex items-center justify-center font-semibold ${
        props.disabled ? "bg-gray-300 text-[#A0A0A0]" : "bg-primary text-white"
      }`}
      style={props.style}
      type="button"
      disabled={props.disabled || props.loading}
      onClick={props.handleClick}
    >
      {props.loading ? (
        <CgSpinner size={25} className="animate-spin" />
      ) : (
        props.label
      )}
    </button>
  );
};


export const PreviousBtn = (props) => {
  return (
    <button
      className={`text-primary border border-primary rounded-full px-6 py-2 w-[250px] h-[50px] font-semibold ${
        props.disabled && "bg-gray-300 text-[#A0A0A0]"
      }`}
      style={props.style}
      type="button"
      disabled={props.disabled || props.loading}
      onClick={props.handleClick}
    >
      {props.loading ? (
        <CgSpinner size={25} className="animate-spin" />
      ) : (
        props.label
      )}
    </button>
  );
};
