import Home_Mobile from "./Home_Mobile";
import { useWindowSize } from "./../../CustomHooks/getWindowWidth";
import Home_Desktop from "./Home_Desktop";

function Home() {
  const [height, width] = useWindowSize();

  return <div>{width > 500 ? <Home_Desktop /> : <Home_Mobile />}</div>;
}

export default Home;
