import React from "react";
import { Text, Button, Grid, Link } from "@nextui-org/react";

const LandingSection = () => {
  return (
    <section className="landing-section">
      <div className="hero-text">
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
          }}
          weight="bold"
        >
          An easy way to keep track of your Expenses
        </Text>
        <Text
          h2
          size={24}
          css={{
            textGradient: "45deg, $red600 -20%, $pink600 50%",
          }}
          weight="normal"
        >
          Kharche is an easy to use expense tracker focused on a fast and
          delightful user experience.
        </Text>
        <Grid.Container gap={2}>
          <Grid>
            <Button
              shadow
              color="primary"
              auto
              size="lg"
              as={Link}
              href="/dashboard"
            >
              Sign Up
            </Button>
          </Grid>
          <Grid>
            <Button bordered color="primary" auto size="lg">
              Guest Login
            </Button>
          </Grid>
        </Grid.Container>
      </div>

      <div className="wave"></div>
    </section>
  );
};

export default LandingSection;
