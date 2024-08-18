import { useEffect, useState } from "react";
import Product from "../components/Product";
import Spinner from "../components/Spinner";
import { useProductData } from "../hooks/useProductData";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  const { loading, posts } = useProductData();

  // TODO: CHECK DEVICE - MOBILE/DESKTOP
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // TODO: ADD INTERSECTION OBSERVER FOR MOBILES
  useEffect(() => {
    if (isMobile) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
            } else {
              entry.target.classList.remove('is-visible');
            }
          });
        },
        { threshold: 0.2, rootMargin: '0px' }
      );

      const products = document.querySelectorAll('.product-card');
      products.forEach((product) => observer.observe(product));

      return () => {
        products.forEach((product) => observer.unobserve(product));
      };
    }
  }, [posts, isMobile]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : posts.length > 0 ? (
        <div className="grid pl-6 pr-10 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl  mx-auto space-y-10 space-x-5 min-h-[80vh] ">
          {posts.map((post) => (
            <Product key={post.id} post={post} isMobile={isMobile} />
          ))}
        </div>
      ) : (
        <div>
          <p>No data found</p>
        </div>
      )}
    </div>
  );
};

export default Home;