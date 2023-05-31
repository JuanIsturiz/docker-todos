import {
  ActionIcon,
  ColorScheme,
  Container,
  Input,
  MantineProvider,
  Tooltip,
} from "@mantine/core";
import { trpc } from "./utils/trpc";
import { type FC, useState, useRef } from "react";
import { IconPlus, IconSunFilled, IconMoonFilled } from "@tabler/icons-react";

function App() {
  const [theme, setTheme] = useState<ColorScheme>("dark");
  const contentRef = useRef<HTMLInputElement | null>(null);
  const { data, isLoading, error } = trpc.todo.findAll.useQuery();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ content: contentRef.current?.value });
  };

  console.log(data);

  return (
    <MantineProvider
      theme={{ colorScheme: theme }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Container>
        <ThemeModeIcon
          theme={theme}
          onTheme={() =>
            setTheme((prev) => (prev === "light" ? "dark" : "light"))
          }
        />
        <form onSubmit={handleSubmit}>
          <Input
            ref={contentRef}
            placeholder="Place your content here.."
            rightSection={
              <Tooltip label="Add todo!" position="top-end" withArrow>
                <div>
                  <IconPlus
                    size="1rem"
                    style={{ display: "block", opacity: 0.5 }}
                  />
                </div>
              </Tooltip>
            }
          />
        </form>
      </Container>
    </MantineProvider>
  );
}

interface ThemeModeIconProps {
  theme: ColorScheme;
  onTheme: () => void;
}

const ThemeModeIcon: FC<ThemeModeIconProps> = ({ theme, onTheme }) => {
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

export default App;
