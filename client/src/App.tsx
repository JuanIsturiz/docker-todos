import {
  ActionIcon,
  Box,
  Button,
  Card,
  Checkbox,
  ColorScheme,
  Container,
  Flex,
  Group,
  Input,
  MantineProvider,
  Modal,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";

import { type RouterOutputs, trpc } from "./utils/trpc";
import { type FC, useState, useRef } from "react";
import {
  IconPlus,
  IconSunFilled,
  IconMoonFilled,
  IconTrash,
} from "@tabler/icons-react";
import { Notifications, notifications } from "@mantine/notifications";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useDisclosure } from "@mantine/hooks";

type Todo = RouterOutputs["todo"]["findAll"][number];

function App() {
  const [theme, setTheme] = useState<ColorScheme>("dark");

  const { data: todos } = trpc.todo.findAll.useQuery();
  const { data: example } = trpc.example.test.useQuery();

  console.log({ example });

  return (
    <MantineProvider
      theme={{ colorScheme: theme }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Notifications />
      <Container size={"md"}>
        <ThemeModeIcon
          theme={theme}
          onTheme={() =>
            setTheme((prev) => (prev === "light" ? "dark" : "light"))
          }
        />
        <NewTodoWizard />
        <TodoList todos={todos} />
      </Container>
    </MantineProvider>
  );
}

const NewTodoWizard: FC = () => {
  const contentRef = useRef<HTMLInputElement | null>(null);

  const ctx = trpc.useContext();

  const { mutate: createTodo } = trpc.todo.create.useMutation({
    async onSuccess() {
      await ctx.todo.findAll.invalidate();
      if (!contentRef.current?.value) return;
      contentRef.current.value = "";
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const content = contentRef.current?.value;
    if (!content) return;
    createTodo({
      content,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="content"
        size="md"
        ref={contentRef}
        placeholder="Place your content here.."
        rightSection={
          <Tooltip label="Add todo!" position="top-end" withArrow>
            <ActionIcon variant="subtle" color="blue" type="submit">
              <IconPlus
                cursor={"pointer"}
                size="1.2rem"
                style={{ display: "block", opacity: 0.5 }}
              />
            </ActionIcon>
          </Tooltip>
        }
      />
    </form>
  );
};

const ThemeModeIcon: FC<{ theme: ColorScheme; onTheme: () => void }> = ({
  theme,
  onTheme,
}) => {
  return (
    <ActionIcon
      size="lg"
      onClick={onTheme}
      color="blue"
      variant="filled"
      pos={"absolute"}
      top={20}
      right={20}
    >
      {theme === "light" ? (
        <IconMoonFilled size="1.2rem" />
      ) : (
        <IconSunFilled size="1.2rem" />
      )}
    </ActionIcon>
  );
};

const TodoList: FC<{ todos: Todo[] | undefined }> = ({ todos }) => {
  const [animationParent] = useAutoAnimate();

  const [opened, { open, close }] = useDisclosure(false);

  const ctx = trpc.useContext();
  const { mutate: clearAll } = trpc.todo.clearAll.useMutation({
    onSuccess() {
      ctx.todo.findAll.invalidate();
    },
  });

  if (!todos) return null;

  return (
    <Container pt={"2rem"}>
      <Modal opened={opened} onClose={close} title="Danger!">
        <Text size={"xl"}>Clear all todos?</Text>
        <Group
          sx={{
            float: "right",
            marginBottom: ".75rem",
          }}
        >
          <Button color="blue" variant="light" onClick={close}>
            Cancel
          </Button>
          <Button
            color="red"
            variant="light"
            onClick={() => {
              clearAll();
              close();
            }}
          >
            Delete all
          </Button>
        </Group>
      </Modal>
      <Stack ref={animationParent}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </Stack>
      {todos.length > 1 ? (
        <Text
          w={"fit-content"}
          pt={".5rem"}
          pr={".5rem"}
          color="red"
          opacity={0.8}
          sx={{
            float: "right",
            ":hover": {
              textDecoration: "underline",
              cursor: "pointer",
            },
          }}
          onClick={open}
        >
          Clear All
        </Text>
      ) : null}
    </Container>
  );
};

const TodoItem: FC<{ todo: Todo }> = ({ todo }) => {
  const { id, content, completed } = todo;
  const ctx = trpc.useContext();
  const { mutate: updateTodo } = trpc.todo.update.useMutation({
    async onMutate() {
      ctx.todo.findAll.cancel();
      const previousTodos = ctx.todo.findAll.getData();
      if (!previousTodos) return;
      ctx.todo.findAll.setData(undefined, (old) => {
        return old?.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        );
      });
      return { previousTodos };
    },
    onError(err, _newTodos, context) {
      ctx.todo.findAll.setData(undefined, context?.previousTodos);
      notifications.show({
        title: "Ups!",
        message: err.message,
      });
    },
  });

  const { mutate: deleteTodo } = trpc.todo.remove.useMutation({
    onSuccess() {
      ctx.todo.findAll.invalidate();
    },
  });

  return (
    <Card shadow="sm" p={"xs"} radius="md" withBorder>
      <Flex justify={"space-between"} align={"center"}>
        <Box>
          <Text strikethrough={completed}>{content}</Text>
        </Box>
        <Group>
          <Checkbox
            size={"md"}
            checked={completed}
            onChange={() => updateTodo({ id, completed })}
          />
          <ActionIcon size="lg" color="red" variant="light">
            <IconTrash size={"1.2rem"} onClick={() => deleteTodo({ id })} />
          </ActionIcon>
        </Group>
      </Flex>
    </Card>
  );
};

export default App;
