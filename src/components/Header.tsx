import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full py-4 px-6 bg-white/80 backdrop-blur-md fixed top-0 z-50 border-b border-border/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-white p-1 rounded flex items-center justify-center border border-border/50">
            <img
              src="/favicon.png"
              alt="SlideGenie Logo"
              className="w-6 h-6"
            />
          </div>
          <h1 className="text-xl font-display font-semibold text-foreground">SlidesGenie</h1>
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/chart-generator" className="text-foreground/80 hover:text-foreground transition-colors">
            Create Charts
          </Link>
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
            Templates
          </Link>
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
            Help
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          {/* <Button variant="ghost" className="hidden md:inline-flex">Sign In</Button>
          <Button variant="default" className="bg-brand-500 hover:bg-brand-600">Start Free</Button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
