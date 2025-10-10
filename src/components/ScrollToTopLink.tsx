import { Link, LinkProps } from "react-router-dom";
import { useScrollToTopDirect } from "@/hooks/useScrollToTop";

interface ScrollToTopLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

const ScrollToTopLink = ({ children, className, ...props }: ScrollToTopLinkProps) => {
  const scrollToTopDirect = useScrollToTopDirect();

  const handleClick = () => {
    scrollToTopDirect();
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

export default ScrollToTopLink;
