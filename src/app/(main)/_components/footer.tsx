import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { buildAppolisLogo } from "./balogo"
import Link from "next/link";

const githubUrl = "https://github.com/hellocory/nexus-forge";
const baUrl = "https://buildappolis.com";
const ghostUrl = "https://gcodes.org?ref=hellocory/nexus-forge";
const creditURL = "https://twitter.com/iamtouha";

export const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container flex flex-col sm:flex-row items-center py-4 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4 w-full justify-between">
          <ThemeToggle />
          <div className="flex items-center space-x-2">
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-xs text-muted-foreground mb-[-2px] text-[10px]">Built by</span>
              <Link href={creditURL} target="_blank" className="group">
                <Badge variant="secondary" className="font-normal transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                  <TwitterLogoIcon className="h-3 w-3 mr-1 transition-transform group-hover:text-primary" />
                  iamtouha
                </Badge>
              </Link>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-xs text-muted-foreground mb-[-2px] text-[10px]">Juiced by</span>
              <Link href={ghostUrl} target="_blank" className="group">
                <Badge variant="secondary" className="font-normal transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                  <span className="mr-1">👻</span>
                  GH5T
                </Badge>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Link href={githubUrl} target="_blank" rel="noreferrer" className="group">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 transition-colors group-hover:bg-primary/10">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 transition-colors duration-300 ease-in-out group-hover:text-primary"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href={baUrl} target="_blank" rel="noreferrer" className="group">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 mt-2 transition-colors group-hover:bg-primary/10">
                <svg
                  viewBox="0 0 75 75"
                  className="h-8 w-8 transition-colors duration-300 ease-in-out group-hover:text-primary"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  dangerouslySetInnerHTML={{ __html: buildAppolisLogo }}
                />
                <span className="sr-only">BuildAppolis</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};