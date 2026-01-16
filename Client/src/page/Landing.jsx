import HeroSection from "./Hero_Section";
import Jobs from "./Jobs";
import { GridBackground } from "../components/grid";

function Landings() {
  return (
    <div className="w-full relative">

      <div className="absolute inset-0 -z-10">
      </div>

      <GridBackground>
        <div className="relative z-10">
          <HeroSection />
          <Jobs />
        </div>
      </GridBackground>
    </div>
  );
}

export default Landings;
