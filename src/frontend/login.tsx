import {
    Button,
    Card,
    Center,
    Container,
    Flex,
    PasswordInput,
    Stack,
    TextInput,
    Title,
    Image,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { Console } from "console";
import nextrollLogo from "../assets/nextroll_logo.svg";

export interface LoginData {
    email: string;
    password: string;
}
interface LoginPageProps {
    onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const navigate = useNavigate();

    const form = useForm<LoginData>({
        initialValues: {
            email: "",
            password: "",
        },
        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Invalid email format",
            password: (value) =>
                value.length > 5 ? null : "Password must be at least 6 characters long",
        },
    });

    const handleLogin = (loginDetails: LoginData) => {
        if (
            loginDetails.email === "guru.vishwa@nextroll.com" &&
            loginDetails.password === "Password@123"
        ) {
            onLogin();
            navigate("/main/html-val");
            console.log("The login is sucessful");
        } else {
            alert("The credential is wrong please enter valid credentials");
        }
    };

    return (
        // <Container h="100vh">
        //     <Center h="90%">
        //         <Card
        //             component="form"
        //             shadow="xl"
        //             radius="lg"
        //             p="lg"
        //             h={400}
        //             w={400}
        //             onSubmit={form.onSubmit((values) => handleLogin(values))}
        //         >
        //             <Flex direction="column" justify="space-around" align="center" h="100%">
        //                 <Image src={nextrollLogo} alt="Nextroll Logo" w={120} h={120} />
        //                 <Title order={5} fz={25}>
        //                     Fill out the credentials
        //                 </Title>
        //                 <Stack>
        //                     <TextInput
        //                         placeholder="Enter your email address"
        //                         required
        //                         miw={300}
        //                         {...form.getInputProps("email")}
        //                         error={form.errors.email}
        //                     />
        //                     <PasswordInput
        //                         placeholder="Enter your password"
        //                         required
        //                         miw={300}
        //                         {...form.getInputProps("password")}
        //                         error={form.errors.password}
        //                     />
        //                 </Stack>
        //                 <Button type="submit" color="#02D4C3">
        //                     Submit
        //                 </Button>
        //                 <Link to="/forgotPassword" style={{ color: "#02D4C3", fontWeight: "bold" }}>
        //                     Forgot Password?
        //                 </Link>
        //             </Flex>
        //         </Card>
        //     </Center>
        // </Container>

        <Container
            style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5f7fa",
            }}
        >
            <Center style={{ width: "100%", maxWidth: "400px" }}>
                <Card
                    component="form"
                    shadow="xl"
                    radius="lg"
                    p="xl"
                    style={{
                        width: "100%",
                        height: "100%",
                        maxHeight: "500px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        border: "2px solid #312D2D"
                    }}
                    onSubmit={form.onSubmit((values) => handleLogin(values))}
                >
                    <Flex
                        direction="column"
                        justify="center"
                        align="center"
                        style={{ flex: "1" }}
                    >
                        <Image
                            src={nextrollLogo}
                            alt="Nextroll Logo"
                            width={120}
                            height={120}
                            m="md"
                        />
                        <Title
                            order={2}
                            mb="lg"
                            style={{
                                marginTop: "20px",
                                fontSize: "24px",
                                fontWeight: "bold",
                            }}
                        >
                            Fill out the credentials
                        </Title>
                    </Flex>
                    <Stack style={{ width: "100%" }}>
                        <TextInput
                            placeholder="Enter your email address"
                            required
                            style={{ minWidth: "300px" }}
                            {...form.getInputProps("email")}
                            error={form.errors.email}
                        />
                        <PasswordInput
                            placeholder="Enter your password"
                            required
                            style={{ minWidth: "300px" }}
                            {...form.getInputProps("password")}
                            error={form.errors.password}
                        />
                    </Stack>
                    <Button
                        type="submit"
                        color="cyan"
                        my="lg"
                        style={{ width: "100%" }}
                    >
                        Submit
                    </Button>
                    <Link
                        to="/forgotPassword"
                        style={{ color: "#02D4C3", fontWeight: "bold" }}
                    >
                        Forgot Password?
                    </Link>
                </Card>
            </Center>
        </Container>
    );
};

export default LoginPage;
