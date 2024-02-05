import Link from "next/link";

interface Props {
  children: React.ReactNode;
  url?: string;
  onClick?: () => void;
  as: "button" | "link";
}

const Button = ({ as, children, url, onClick }: Props) => {
  return as === "link" && url ? (
    <Link
      href={url}
      className="transition-colors duration-300 bg-yellow-400 hover:bg-white border-yellow-400 border-solid border-4 rounded-lg font-bold text-xs py-3 px-6 h-auto"
    >
      {children}
    </Link>
  ) : (
    <button
      type="button"
      onClick={onClick}
      className="transition-colors duration-300 bg-yellow-400 hover:bg-white border-yellow-400 border-solid border-4 rounded-lg font-bold text-xs py-3 px-6 h-auto"
    >
      {children}
    </button>
  );
};

export default Button;
