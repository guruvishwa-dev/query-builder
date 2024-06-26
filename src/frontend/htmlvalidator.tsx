import { useState } from "react";
import JSZip from "jszip";
import {
    Button,
    Card,
    Container,
    FileInput,
    Group,
    Title,
    Grid,
    Notification,
    Text,
    LoadingOverlay,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "../css/NavbarSimple.module.css";

type FileState = File | null;

export const HtmlValidator = () => {
    const [file, setFile] = useState<FileState>(null);
    const [validationResults, setValidationResults] = useState<
        { fileName: string; results: string[] }[]
    >([]);
    const [visible, { open, close }] = useDisclosure(false);

    const handleFileUpload = (file: File | null) => {
        setFile(file);
    };

    const processZipFile = async () => {
        open();
        setTimeout(async () => {
            if (file) {
                if (file.size > 150 * 1024) {
                    setValidationResults([
                        { fileName: "", results: ["File size exceeds 150KB."] },
                    ]);
                    close();
                    return;
                }
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const zip = await JSZip.loadAsync(e.target?.result as ArrayBuffer);
                    const results: { fileName: string; results: string[] }[] = [];

                    for (const fileName in zip.files) {
                        if (fileName.endsWith(".html")) {
                            const content = await zip.files[fileName].async("string");
                            const adResults = validateAd(content);
                            results.push({ fileName, results: adResults });
                        }
                    }

                    setValidationResults(results);
                    close();
                };

                reader.readAsArrayBuffer(file);
            } else {
                setValidationResults([
                    { fileName: "", results: ["Please upload an HTML file."] },
                ]);
                close();
            }
        }, 4000);
    };

    const validateAd = (htmlContent: string): string[] => {
        const results: string[] = [];

        if (!htmlContent.includes("<!DOCTYPE html>")) {
            results.push("Missing DOCTYPE declaration.");
        } else {
            results.push("DOCTYPE declaration is present.");
        }

        if (!htmlContent.includes("<html>")) {
            results.push("Missing <html> tag.");
        } else {
            results.push("<html> tag is present.");
        }

        if (!htmlContent.includes("<body>")) {
            results.push("Missing <body> tag.");
        } else {
            results.push("<body> tag is present.");
        }

        const metaTagPattern =
            /<meta\s+name="ad.size"\s+content="width=\d+,\s*height=\d+"\s*\/?>/;
        if (!metaTagPattern.test(htmlContent)) {
            results.push('Missing or incorrect <meta name="ad.size"> tag.');
        } else {
            results.push('<meta name="ad.size"> tag is correct.');
        }

        const clickTagPattern = /var\s+clickTag\s*=\s*".*";/;
        if (!clickTagPattern.test(htmlContent)) {
            results.push("Missing clickTag variable.");
        } else {
            results.push("clickTag variable is present.");
        }

        const clickAreaPattern = /<div\s+id="clickArea"\s+style=".*"\s+onclick=/;
        if (!clickAreaPattern.test(htmlContent)) {
            results.push("Missing or incorrect click area <div> tag.");
        } else {
            results.push("Click area <div> tag is present.");
        }

        return results;
    };

    return (
        // <Container>
        //     <Title mb="lg">HTML5 Ad Validator Tool</Title>
        //     <Grid>
        //         <Grid.Col span={6}>
        //             <Card withBorder shadow="sm" p="lg">
        //                 <FileInput
        //                     label="Upload HTML5 Ad Zip File"
        //                     placeholder="Upload file"
        //                     onChange={(event) => handleFileUpload(event)}
        //                     accept=".zip"
        //                 />
        //                 <Group mt="md">
        //                     <Button onClick={processZipFile}>Validate Zip File</Button>
        //                 </Group>
        //             </Card>
        //         </Grid.Col>
        //         <Grid.Col span={6}>
        //             <Card withBorder shadow="sm" p="lg">
        //                 <Title order={4} mb="md">Validation Results</Title>
        //                 {validationResults.length === 0 ? (
        //                     <Text>No validation results yet.</Text>
        //                 ) : (
        //                     validationResults.map((resultSet, index) => (
        //                         <div key={index}>
        //                             <Text mb="xs">{resultSet.fileName.replace(/_/g, ' ')}</Text>
        //                             {resultSet.results.map((result, i) => (
        //                                 <Notification
        //                                     key={i}
        //                                     color={result.includes('Missing') || result.includes('incorrect') ? 'red' : 'green'}
        //                                     title={result.includes('Missing') || result.includes('incorrect') ? 'Error' : 'Success'}
        //                                 >
        //                                     {result}
        //                                 </Notification>
        //                             ))}
        //                         </div>
        //                     ))
        //                 )}
        //             </Card>
        //         </Grid.Col>
        //     </Grid>
        //     <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        // </Container>

        <Container pt="lg" pb="lg" style={{ margin: "0px auto" }}>
            <Card
                shadow="xl"
                radius="lg"
                p="xl"
                style={{
                    width: "100%",
                    height: "100%",
                    maxHeight: "700px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    border: "3px solid #FF1454",
                }}
            >
                <Title mb="lg" style={{ fontSize: "32px", fontWeight: "bold" }}>
                    HTML5 Ad Validator Tool
                </Title>
                <Grid gutter="xl">
                    <Grid.Col span={6}>
                        <Card withBorder shadow="sm" padding="lg" radius="md">
                            <FileInput
                                label="Upload HTML5 Ad Zip File"
                                placeholder="Upload file"
                                onChange={handleFileUpload}
                                accept=".zip"
                                style={{ marginBottom: "20px" }}
                                className={classes.label_Text}
                            />
                            <Group>
                                <Button
                                    onClick={processZipFile}
                                    style={{ backgroundColor: "#02D4C3" }}
                                >
                                    Validate Zip File
                                </Button>
                            </Group>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Card withBorder shadow="sm" padding="lg" radius="md">
                            <Title
                                order={4}
                                mb="md"
                                style={{ fontSize: "24px", fontWeight: "bold" }}
                            >
                                Validation Results
                            </Title>
                            {validationResults.length === 0 ? (
                                <Text>No validation results yet.</Text>
                            ) : (
                                validationResults.map((resultSet, index) => (
                                    <div key={index} style={{ marginBottom: "20px" }}>
                                        <Text mb="xs" style={{ fontWeight: "bold" }}>
                                            {resultSet.fileName.replace(/_/g, " ")}
                                        </Text>
                                        {resultSet.results.map((result, i) => (
                                            <Notification
                                                key={i}
                                                color={
                                                    result.includes("Missing") ||
                                                        result.includes("incorrect")
                                                        ? "red"
                                                        : "green"
                                                }
                                                title={
                                                    result.includes("Missing") ||
                                                        result.includes("incorrect")
                                                        ? "Error"
                                                        : "Success"
                                                }
                                                style={{ marginBottom: "10px" }}
                                            >
                                                {result}
                                            </Notification>
                                        ))}
                                    </div>
                                ))
                            )}
                        </Card>
                    </Grid.Col>
                </Grid>
                <LoadingOverlay
                    visible={visible}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 2 }}
                />
            </Card>
        </Container>
    );
};
