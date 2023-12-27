import FrontImg from "../../../assets/images/front-img.jpg";
import Section from "./Section";

const Home = () => {
  return (
    <div>
      <div className="relative">
        <img src={FrontImg} alt="" className="w-full " />
        <div className="absolute top-20 left-20 w-1/3 bg-white py-6 px-8">
          <div className="text-4xl font-bold">Learning that gets you</div>
          <div className="text-xl py-4">
            Skills for your present (and your future). Get started with us.
          </div>
        </div>
      </div>
      <div className="mt-2 px-4">
        <p className="font-bold text-4xl">What to learn next</p>
        <p className="font-bold text-2xl mt-3">
          Popular Courses in Development
        </p>
        <div className="my-3">
          <Section />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Home;
