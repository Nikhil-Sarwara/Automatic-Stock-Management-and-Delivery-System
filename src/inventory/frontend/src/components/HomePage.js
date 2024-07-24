import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Text,
  VStack,
  Link,
  Spacer,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// Example images (make sure you have these images in your public folder or adjust the URLs)
const logo =
  "https://t3.ftcdn.net/jpg/05/42/85/04/360_F_542850412_mbdrJttsmcColprJNmMeWgUoNsJLdFJn.jpg"; // Replace with your logo path
const heroImage =
  "https://ik.imagekit.io/ccyubla1p9v/wp-content/uploads/2023/07/inventory-management-hero.png"; // Replace with your hero image path

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      {/* Top Navigation Bar */}
      <Flex
        as="nav"
        bg="teal.600"
        color="white"
        p={4}
        align="center"
        justify="space-between"
        boxShadow="md"
        rounded={"lg"}
      >
        <Image src={logo} alt="Logo" boxSize="60px" rounded={"lg"} />
        <Flex gap={6}>
          <Link color="white" fontWeight="bold" onClick={() => navigate("/")}>
            Home
          </Link>
          <Link
            color="white"
            fontWeight="bold"
            onClick={() => navigate("/items")}
          >
            Inventory List
          </Link>
          <Link
            color="white"
            fontWeight="bold"
            onClick={() => navigate("/add-item")}
          >
            Add Item
          </Link>
        </Flex>
      </Flex>

      {/* Main Content */}
      <Box
        bgImage={`url(${heroImage})`}
        bgSize="cover"
        bgPosition="center"
        minH="calc(100vh - 80px)" // Adjust height based on navbar height
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={8}
        textAlign="center"
        color="white"
        bgOverlay="rgba(0, 0, 0, 0.5)"
      >
        <VStack
          spacing={6}
          bg="rgba(0, 0, 0, 0.5)"
          p={8}
          borderRadius="md"
          maxW="600px"
        >
          <Text fontSize="4xl" fontWeight="bold">
            Welcome to the Inventory Management System
          </Text>
          <Text fontSize="lg">
            Manage your inventory efficiently with our easy-to-use system. Add,
            update, and delete items with just a few clicks.
          </Text>
          <Button colorScheme="teal" onClick={() => navigate("/items")}>
            Go to Inventory List
          </Button>
        </VStack>
      </Box>

      {/* Footer */}
      <Box
        as="footer"
        bg="teal.600"
        color="white"
        p={4}
        textAlign="center"
        boxShadow="md"
        rounded={"md"}
      >
        <Text>
          &copy; {new Date().getFullYear()} Inventory Management System. All
          rights reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default HomePage;
