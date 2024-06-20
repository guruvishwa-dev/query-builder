import { Button, Card, Center, Container, Flex, PasswordInput, Stack, TextInput, Title, Image } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";

export interface LoginData {
    email: string;
    password: string;
}

const LoginPage = () => {
    const navigate = useNavigate();

    const form = useForm<LoginData>({
        initialValues: {
            email: "",
            password: ""
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email format'),
            password: (value) => (value.length > 5 ? null : 'Password must be at least 6 characters long'),
        },
    });

    const handleLogin = (loginDetails: LoginData) => {
        if (loginDetails.email === "guru.vishwa@gmail.com" && loginDetails.password === "Password@123") {
            navigate("/main/MainComponent");
        } else {
            alert("The credential is wrong please enter valid credentials");
        }
    }

    return (
        <Container h="100vh">
            <Center h="90%">
                <Card
                    component="form"
                    shadow="xl"
                    radius="lg"
                    p="lg"
                    h={400}
                    w={400}
                    withBorder
                    onSubmit={form.onSubmit((values) => handleLogin(values))}
                >
                    <Flex direction="column" justify="space-around" align="center" h="100%">
                        <Image src=" " alt="Nextroll Logo" w={120} h={120} />
                        <Title order={5} fz={25}>
                            Fill out the credentials
                        </Title>
                        <Stack>
                            <TextInput
                                placeholder="Enter your email address"
                                required
                                miw={300}
                                {...form.getInputProps("email")}
                                error={form.errors.email}
                            />
                            <PasswordInput
                                placeholder="Enter your password"
                                required
                                miw={300}
                                {...form.getInputProps("password")}
                                error={form.errors.password}
                            />
                        </Stack>
                        <Button type="submit">
                            Submit
                        </Button>
                        <Link to="/forgotPassword" style={{ color: "#26d0df", fontWeight: "bold" }}>
                            Forgot Password?
                        </Link>
                    </Flex>
                </Card>
            </Center>
        </Container>
    );
}

export default LoginPage;
