import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Select,
    MultiSelect,
    TextInput,
    Button,
    Paper,
    Title,
    Group,
    Textarea,
} from "@mantine/core";
import classes from "../css/NavbarSimple.module.css";

const QueryBuilder = () => {
    const [tables, setTables] = useState<string[]>([]);
    const [columns, setColumns] = useState([]);
    const [selectedTable, setSelectedTable] = useState("");
    const [selectedColumns, setSelectedColumns] = useState<any>([]);
    const [conditions, setConditions] = useState("");
    const [queryResult, setQueryResult] = useState([]);

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await axios.get("http://localhost:8800/tables");
                console.log("response from table", response.data);
                setTables(["Campaign", "dyn_creatives", "bot_clicks"]);
                // setColumns(Object.keys(response.data.Campaign[0]));
            } catch (error) {
                console.error("Error fetching tables:", error);
            }
        };
        fetchTables();
    }, []);

    useEffect(() => {
        if (selectedTable) {
            axios
                .get(`http://localhost:8800/columns/${selectedTable}`)
                .then((response) => {
                    setColumns(response.data.columns);
                })
                .catch((error) => {
                    console.error("Error fetching columns:", error);
                });
        }
    }, [selectedTable]);

    const handleExecuteQuery = () => {
        let query;
        if (selectedTable === "Campaign") {
            query = `SELECT ${selectedColumns.join(", ")} FROM ${selectedTable} ${conditions ? `WHERE id = '${conditions}'` : ""
                }`;
        } else if (selectedTable === "dyn_creatives") {
            query = `SELECT ${selectedColumns.join(", ")} FROM ${selectedTable} ${conditions ? `WHERE adv_id = '${conditions}'` : ""
                }`;
        } else if (selectedTable === "bot_clicks") {
            console.log(conditions, " consition values fetched")
            query = `SELECT ${selectedColumns.join(", ")} FROM ${selectedTable} ${conditions ? `WHERE adv_eid = '${conditions}'` : ""
                }`;
        }
        axios
            .post("http://localhost:8800/query", { query })
            .then((response) => {
                setQueryResult(response.data.results);
            })
            .catch((error) => {
                console.error("Error executing query:", error);
            });
    };

    const getPlaceholderForConditions = () => {
        if (selectedTable === "Campaign") {
            return "Enter id";
        } else if (selectedTable === "dyn_creatives") {
            return "Enter adv_id";
        } else if (selectedTable === "bot_clicks") {
            return "Enter adv_eid"
        }
        return "Enter condition";
    };

    return (
        <Paper
            shadow="sm"
            p="xl"
            radius="md"
            style={{ border: "3px solid rgb(255, 20, 83)" }}
        >
            <Title order={1} mb="lg">
                SQL Query Builder
            </Title>
            <hr />
            <Group mb="lg" grow style={{ display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                    <Select
                        label="Table"
                        placeholder="Select a table"
                        value={selectedTable}
                        onChange={(value) => setSelectedTable(value || "")}
                        data={tables.map((table) => ({ value: table, label: table }))}
                        className={classes.label_Text}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <MultiSelect
                        label="Columns"
                        placeholder="Select columns"
                        value={selectedColumns}
                        onChange={(value) => setSelectedColumns(value)}
                        data={columns.map((column) => ({ value: column, label: column }))}
                        className={classes.label_Text}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <TextInput
                        label="Conditions"
                        placeholder={getPlaceholderForConditions()}
                        value={conditions}
                        onChange={(e) => setConditions(e.target.value)}
                        className={classes.label_Text}
                    />
                </div>
                <Button
                    onClick={handleExecuteQuery}
                    mt="lg"
                    style={{ backgroundColor: "#02D4C3", alignSelf: 'flex-end' }}
                >
                    Execute Query
                </Button>
            </Group>

            <Title order={2} mt="lg" mb="md">
                Query Result
            </Title>
            <Textarea
                value={JSON.stringify(queryResult, null, 2)}
                readOnly
                minRows={10}
                autosize
                variant="filled"
            />
        </Paper>
    );
};

export default QueryBuilder;
