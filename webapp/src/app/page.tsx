import Image from "next/image";
import styles from "./page.module.css";
import { Box, Button, Heading, LinkBox, LinkOverlay } from "@chakra-ui/react";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Box>
          <Heading size="4xl" spaceY="4.5" textAlign="center">Welcome to the Rick and Morty World!</Heading>
          <Box p="4" spaceY="2" display="flex" justifyContent="center">
            <LinkBox>
              <LinkOverlay href="/explore">
                <Button size="lg" paddingX="8" paddingY="4">Explore</Button>
              </LinkOverlay>
            </LinkBox>
          </Box>          
        </Box>
      </main>
    </div>
  );
};
