"use client";

import Hero from "@/components/Hero";
import About from "@/components/About";
import sushi from "@/assets/images/sushi.png";
import WhoWeAreImg from "@/assets/images/who-we-are.png";
import ImageCards from "@/components/ImageCards";
import SectionBgImage from "@/assets/images/section-bg.webp";
import TokyoBlazeRamen from "@/assets/images/tokyo-blaze-ramen.png";
import ShoyuStreetClassic from "@/assets/images/shoyup-street-classic.png";
import CreamyTonkotsuDelight from "@/assets/images/creamy-tonkotsu-delight.png";
import doodleBottom from "@/assets/images/hero-vector-4.png";
import aboutVector from "@/assets/images/about-vector.png";
import Header1doodle from "@/assets/images/header 1.png";
import Header2doodle from "@/assets/images/header 2.png";
import dish1doodle from "@/assets/images/dish 1.png";
import dish2doodle from "@/assets/images/dish 2.png";

const myRamenItems = [
  {
    id: 1,
    name: "Tokyo Blaze Ramen",
    description:
      "A fiery miso-based ramen with tender char siu pork, chili oil, and a bold kick that warms your soul.",
    image: TokyoBlazeRamen,
     decorations: [
      {
        src: dish1doodle,
        className:
          "hidden md:block bottom-110 left-14 w-[10%] max-w-[50px] 2xl:bottom-90 2xl:left-16 lg:bottom-110 md:bottom-90",
      },
       {
        src: dish2doodle,
        className:
          "hidden md:block top-8 right-10 w-[20%] max-w-[50px] rotate-[20deg] 2xl:right-16",
      },
    ],
  },
  {
    id: 2,
    name: "Shoyu Street Classic",
    description:
      "A rich soy sauce broth with springy noodles, marinated egg, & fresh scallions, a true Tokyo alleyway classic.",
    image: ShoyuStreetClassic,
    decorations: [
      {
        src: dish1doodle,
        className:
          "hidden md:block bottom-110 left-14 w-[10%] max-w-[50px] 2xl:bottom-90 2xl:left-16 lg:bottom-110 md:bottom-90",
      },
       {
        src: dish2doodle,
        className:
          "hidden md:block top-8 right-10 w-[20%] max-w-[50px] rotate-[20deg] 2xl:right-16",
      },
    ],
  },
  {
    id: 3,
    name: "Creamy Tonkotsu Delight",
    description:
      "Slow-simmered pork bone broth with silky noodles, bamboo shoots, and melt-in-your-mouth pork belly.",
    image: CreamyTonkotsuDelight,
    decorations: [
     {
        src: dish1doodle,
        className:
          "hidden md:block bottom-110 left-14 w-[10%] max-w-[50px] 2xl:bottom-90 2xl:left-16 lg:bottom-110 md:bottom-90",
      },
       {
        src: dish2doodle,
        className:
          "hidden md:block top-8 right-10 w-[20%] max-w-[50px] rotate-[20deg] 2xl:right-16",
      },
    ],
  },
];


export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* <div className="backdrop-brightness-90 bg-black/60"></div> */}
        <Hero
          title="Welcome to Ramen Junction"
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis consectetur tellus. Cras dapibus congue egestas. Morbi vel faucibus lorem. "
          buttonLabel="Explore Menu"
          buttonLink="/menu"
          image={sushi}
  decorations={[
    {
      src: Header2doodle,
      className: "hidden md:block bottom-20 -left-10 w-[20%] max-w-[60px]",
    },
    {
      src: doodleBottom,
      className:
        "hidden md:block -bottom-8 left-70 w-[70%] max-w-[460px]",
    },
     {
      src: Header1doodle,
      className: "hidden md:block top-0 right-54 w-[20%] max-w-[60px]",
    },
  ]}
        />
      <div
  className="bg-[#263230] bg-cover bg-center"
  style={{ backgroundImage: `url(${SectionBgImage.src})` }}
>
        <section className="pt-50 2xl:pt-30 -mt-px relative">
          <About
            heading="Who we are?"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis
            consectetur tellus. Cras dapibus congue egestas. Morbi vel faucibus
            lorem. Nunc iaculis aliquet eros, et eleifend erat laoreet
            consectetur. Vestibulum ullamcorper, libero et condimentum aliquet,
            ipsum felis maximus diam, vel sodales enim felis et massa. In
            aliquet consequat vulputate. Proin ligula ante, tincidunt nec mauris
            eu, luctus vehicula sapien. Pellentesque sed blandit felis. Aliquam
            fringilla orci consequat turpis dictum facilisis. Nullam at dictum
            est, non convallis massa. Sed volutpat maximus posuere. Donec
            malesuada sollicitudin lacus accumsan placerat. Sed vitae
            pellentesque odio. Donec pharetra odio dui, a gravida justo
            condimentum et."
            buttonText="Read More"
            buttonLink="/our-story"
            imgPosition="left"
            image={WhoWeAreImg}
            decorations={[
    {
      src: aboutVector,
      className: "hidden lg:block bottom-[150px] left-50 w-[60%] max-w-[260px]",
    },
  ]}
             
          />
        </section>
        <ImageCards heading="Fan Favorites" items={myRamenItems}
         />
      </div>
    </main>
  );
}
