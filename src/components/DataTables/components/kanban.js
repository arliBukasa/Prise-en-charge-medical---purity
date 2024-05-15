// Chakra imports
import Board from "@asseinfo/react-kanban";
import "@asseinfo/react-kanban/dist/styles.css";
import { AddIcon, AttachmentIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Flex,
  FormControl,
  IconButton,
  Image,
  Input,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
// Assets
import avatar2 from "../assets/avatar2.png";
import avatar3 from "../assets/avatar3.png";
import avatar4 from "../assets/avatar4.png";
import kanban1 from "../assets/kanban1.png";
import kanban2 from "../assets/kanban2.png";
import kanban3 from "../assets/kanban3.png";
import {
  kanbanRenderThumbDark,
  kanbanRenderThumbLight,
  kanbanRenderTrack,
  kanbanRenderView
} from "./scrollbar";
import { VSeparator } from "./separator";
import React, { useRef, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";

function Kanban() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const textGray = useColorModeValue("gray.400", "gray.300");
  const attachementsGray = useColorModeValue("gray.500", "gray.200");
  const kanbanCardBg = useColorModeValue("white", "gray.700");
  // Kanban Settings, states, etc.
  let initialBoard = {
    counter: 9,
    columns: [
      {
        id: 1,
        title: "Backlog",
        cards: [
          {
            id: 1.1,
            title: "Drag me to “In progress” section!"
          },
          {
            id: 1.2,
            title: "Click me to change the title"
          },
          {
            id: 1.3,
            image: kanban1,
            members: [avatar2, avatar3, avatar4],
            status: "PENDING",
            title:
              "Website Design: New cards for blog section and profile details!",
            attachements: "3"
          }
        ]
      },
      {
        id: 2,
        title: "In progress",
        cards: [
          {
            id: 2.1,
            title: "Fix Firefox Errors!",
            members: [avatar2, avatar3, avatar4],
            status: "ERRORS",
            attachements: "2"
          },
          {
            id: 2.2,
            title: "Purity UI Dashboard - PRO Version v1.0.1"
          },
          {
            id: 2.3,
            image: kanban2,
            members: [avatar2, avatar3, avatar4],
            status: "UPDATES",
            title:
              "Purity UI Update: Add RTL Page and the details about documentation",
            attachements: "9"
          }
        ]
      }
    ]
  };
  const [board, setBoard] = useState(initialBoard);
  function onCardNew(newCard) {
    const newCardLocal = { id: initialBoard.counter + 1, ...newCard };
    initialBoard.counter = initialBoard.counter + 1;
    setBoard(initialBoard);
    return newCardLocal;
  }

  return (
    <Flex
      direction="column"
      minH="100vh"
      align="center"
      pt={{ sm: "125px", lg: "75px" }}
      overflow="hidden"
    >
      <Flex maxWidth="100%">
        <Scrollbars
          autoHide
          renderTrackHorizontal={kanbanRenderTrack}
          renderThumbHorrenderTrackHorizontal={useColorModeValue(
            kanbanRenderThumbLight,
            kanbanRenderThumbDark
          )}
          renderView={kanbanRenderView}
        >
          <Board
            initialBoard={board}
            allowAddCard
            onNewCardConfirm={onCardNew}
            onCardNew={console.log}
            renderColumnHeader={function (
              { title },
              { removeColumn, renameColumn, addCard }
            ) {
              const kanbanForm = useRef(null);
              const cardInput = useRef(null);
              function kanbanFormOpen() {
                kanbanForm.current.style.display = "flex";
              }
              function kanbanFormClose() {
                kanbanForm.current.style.display = "none";
              }
              function formSubmit() {
                addCard({ title: cardInput.current.value });
                cardInput.current.value = "";
              }
              return (
                <Flex
                  flexDirection="column"
                  mb="24px"
                  fontWeight="bold"
                  w="100%"
                >
                  <Flex justify="space-between" align="center" mb="24px">
                    <Text fontSize="lg" mt="5px">
                      {title}
                    </Text>
                    <IconButton
                      w="92px"
                      h="35px"
                      aria-label="Search database"
                      variant="no-hover"
                      bg={kanbanCardBg}
                      icon={<AddIcon w="12px" h="12px" color="teal.300" />}
                      onClick={kanbanFormOpen}
                    />
                  </Flex>
                  <Flex flexDirection="column" ref={kanbanForm} display="none">
                    <FormControl>
                      <Input
                        borderRadius="15px"
                        mb="20px"
                        bg={kanbanCardBg}
                        border="none"
                        ref={cardInput}
                      />
                      <Flex>
                        <Button
                          colorScheme="teal"
                          me="14px"
                          onClick={formSubmit}
                        >
                          Add Card
                        </Button>
                        <Button
                          variant="no-hover"
                          bg={useColorModeValue("white", "gray.700")}
                          onClick={kanbanFormClose}
                        >
                          Cancel
                        </Button>
                      </Flex>
                    </FormControl>
                  </Flex>
                </Flex>
              );
            }}
            renderCard={(
              { image, title, attachements, status, members },
              { removeCard, dragging }
            ) => (
              <Flex
                mt="10px"
                dragging={dragging}
                flexDirection="column"
                bg={kanbanCardBg}
                p="25px"
                borderRadius="15px"
                w="270px"
              >
                {image ? (
                  <Image
                    borderRadius="15px"
                    w="220px"
                    h="164px"
                    src={image}
                    mb="20px"
                  />
                ) : null}
                {status ? (
                  <Badge
                    fontSize="10px"
                    fontWeight="bold"
                    variant="solid"
                    colorScheme="green"
                    mb="16px"
                    h="28px"
                    w="94px"
                    display="flex"
                    borderRadius="8px"
                    alignItems="center"
                    justifyContent="center"
                    bg={
                      status === "ERRORS"
                        ? "red.500"
                        : status === "PENDING"
                        ? "orange.300"
                        : status === "DONE"
                        ? "green.500"
                        : status === "UPDATES"
                        ? "blue.400"
                        : "teal"
                    }
                    colorScheme={
                      status === "ERRORS"
                        ? "red"
                        : status === "PENDING"
                        ? "orange"
                        : status === "DONE"
                        ? "green"
                        : status === "UPDATES"
                        ? "blue"
                        : "teal"
                    }
                  >
                    {status}
                  </Badge>
                ) : null}
                <Text fontSize="md" color={textGray}>
                  {title}
                </Text>

                {image ? (
                  members ? (
                    <Flex justify="space-between" align="center" mt="20px">
                      <Flex justify="center" align="center">
                        <AttachmentIcon me="2px" color={attachementsGray} />
                        <Text fontSize="sm" color={attachementsGray}>
                          {attachements}
                        </Text>
                      </Flex>

                      <AvatarGroup size="sm">
                        <Avatar src={avatar2} />
                        <Avatar src={avatar3} />
                        <Avatar src={avatar4} />
                      </AvatarGroup>
                    </Flex>
                  ) : null
                ) : null}
                {/* <Button colorScheme="teal" onClick={removeCard}></Button> */}
              </Flex>
            )}
          />
        </Scrollbars>
      </Flex>
    </Flex>
  );
}

export default Kanban;
