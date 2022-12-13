import * as React from "react";
import { Navbar, Text, Button, Link } from "@nextui-org/react";

function ResponsiveAppBar() {
  return (
    <Navbar variant={"sticky"}>
      <Navbar.Content>
        <Navbar.Link href="#">About</Navbar.Link>
      </Navbar.Content>
      <Navbar.Brand>
        <Text
          h1
          size={42}
          css={{

            color : "Green"
          }}
          weight="bold"
          as={Link}
          href="/"
        >
          Kha₹che
        </Text>
      </Navbar.Brand>
      <Navbar.Content>
        <Button auto flat as={Link} href="#">
          Login
        </Button>
      </Navbar.Content>
    </Navbar>
  );
}
export default ResponsiveAppBar;
