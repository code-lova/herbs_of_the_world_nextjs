import AboutUs from "@/components/AboutUs";
import Banner from "@/components/Banner";
import Disclaimer from "@/components/Disclaimer";
import { DiscountPromo } from "@/components/DiscountPromo";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import TestimonialSlider from "@/components/Testimonial";

export default function Home() {
  return (
    <main className="main">
      <Navbar />
      <section className="mt-20">
          <Hero />
      </section>
      <section className="xl:px-40 px-5 py-9 bg-gray-100">
        <Banner />
      </section>
      <section className="xl:px-40 py-9">
        <Products/>
      </section>
      <section className="xl:px-40 py-9 bg-gray-100">
        <DiscountPromo/>
      </section>
      <section className="xl:px-40 py-9">
        <AboutUs />
      </section>
      <section className="xl:px-40 py-9">
        <TestimonialSlider />
        <div className="py-6">
          <Disclaimer />
        </div>
      </section>


    </main>
  );
}