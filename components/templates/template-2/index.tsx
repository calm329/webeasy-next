import { Header } from "./Header";
import { Hero } from "./Hero";
import { SecondaryFeatures } from "./SecondaryFeatures";
import { Testimonials } from "./Testimonials";

export default function Template2() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* <PrimaryFeatures /> */}
        <SecondaryFeatures />
        {/* <CallToAction /> */}
        <Testimonials />
        {/* <Pricing /> */}
        {/* <Faqs /> */}
      </main>
      {/* <Footer /> */}
    </>
  );
}
