import { Link, LinkProps } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";

interface SmoothScrollLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

const SmoothScrollLink = ({ children, className, ...props }: SmoothScrollLinkProps) => {
  const scrollToTop = useScrollToTop();

  const handleClick = () => {
    scrollToTop();
  };

  return (
    <Link 
      {...props} 
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default SmoothScrollLink;
