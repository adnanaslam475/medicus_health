import type { NextPage } from "next";
import Container from "../src/common/components/Container/Container";

const Home: NextPage = () => {
  return (
    <Container
      style={{
        scrollMargin: "1rem",
      }}
    >
      <h1
        style={{
          margin: "1rem",
        }}
        className="text-3xl font-bold underline"
      >
        Landing page
      </h1>
    </Container>
  );
};

export default Home;
