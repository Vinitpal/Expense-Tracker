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
            // textGradient: "45deg, $blue600 -20%, $pink600 50%",
            position: 'absolute',
            width: '656px',
            height: '320px',
            left: '86px',
            top: '319px',
            fontsize: '72px',
            cursor: 'pointer',

            fontweight: '400',
            color: '#0F9B0F',
            fontfamily: 'Inter',
            fontstyle: 'normal'
          }}
          weight="bold"
        >
          An easy way to keep track of your Expenses
        </Text>

        <Text
          h2
          size={24}
          css={{
            // textGradient: "45deg, $red600 -20%, $pink600 50%",
            height: '105px',
            width: '609px',
            fontFamily: 'Inter',
            left: '86px',
            marginTop: '90px',
            position: 'sticky',
            color: '#1E1E1E',
            top: '478px'
            // border-radius: undefinedpx

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
              css={{
                Fill: 'Solid',
                width: '151px',
                top: '98px',
                height: '55px',
                display: 'flex',
                alignitems: 'center',
                textalign: 'center',
                color: "#fff !important",
              }}

              href="/dashboard"
            >
              Sign Up
            </Button>
          </Grid>
          <Grid>
            <Button bordered color="primary" auto size="lg" css={{
              Fill: 'Solid',
              width: '151px',
              height: '55px',
              display: 'flex',
              top: '98px',
              alignitems: 'center',
              textalign: 'center'
            }}>
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
