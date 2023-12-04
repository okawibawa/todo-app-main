import Image from "next/image";

// components
import { Layout } from "./_components";

export default function Page() {
  return (
    <Layout>
      <div className="full-width relative w-full h-48">
        <Image src="/bg-mobile-dark.jpg" fill sizes="100px" alt="background image" style={{ objectFit: "cover" }} />
      </div>

      <h1>lorem.</h1>
    </Layout>
  );
}
