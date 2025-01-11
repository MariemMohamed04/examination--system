
type ButtonProps = {
  text: string;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  text,
  type,
  className,
  onClick,
  disabled = false,
}) => {
  return (
    <>
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`w-[410px] h-[56px] rounded-[20px] p-[8px] gap-[8px] 
          bg-[#4461F2] text-white 
          shadow-[0_18px_30px_rgba(47,28,28,0.1)]
          ${className}`}
      >{text}</button>
    </>
  );
};

export default ButtonComponent;