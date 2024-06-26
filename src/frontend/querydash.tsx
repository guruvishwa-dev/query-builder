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

const QueryBuilder = () => {
  const [tables, setTables] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [conditions, setConditions] = useState("");
  const [queryResult, setQueryResult] = useState([]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get("http://localhost:8800/tables");
        console.log("response from table", response.data);
        setTables(["Campaign"]);
        setColumns(Object.keys(response.data.Campaign[0]));
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
    const query = `SELECT ${selectedColumns.join(", ")} FROM ${selectedTable} ${
      conditions ? `WHERE ${conditions}` : ""
    }`;
    axios
      .post("http://localhost:8800/query", { query })
      .then((response) => {
        setQueryResult(response.data.results);
      })
      .catch((error) => {
        console.error("Error executing query:", error);
      });
  };

  return (
    // <Paper shadow="sm" p="md">
    //     <Title order={1} mb="md">SQL Query Builder</Title>
    //     <Group >
    //         <Select
    //             label="Table"
    //             placeholder="Select a table"
    //             value={selectedTable}
    //             onChange={(value) => setSelectedTable(value || '')}
    //             data={tables.map(table => ({ value: table, label: table }))}
    //         />
    //         <MultiSelect
    //             label="Columns"
    //             placeholder="Select columns"
    //             value={selectedColumns}
    //             onChange={(value) => setSelectedColumns(value)}
    //             data={columns.map(column => ({ value: column, label: column }))}
    //         />
    //         <TextInput
    //             label="Conditions"
    //             placeholder="e.g., id > 10"
    //             value={conditions}
    //             onChange={(e) => setConditions(e.target.value)}
    //         />
    //         <Button onClick={handleExecuteQuery}>Execute Query</Button>
    //     </Group>
    //     <Title order={2} mt="md">Query Result</Title>
    //     <Textarea value={JSON.stringify(queryResult, null, 2)} readOnly minRows={10} />
    // </Paper>

    <Paper shadow="sm" p="xl" radius="md" 
    // style={{border:"2px solid #FF1454"}}
    >
      <Title order={1} mb="lg">
        SQL Query Builder
      </Title>
      <Group mb="lg" grow>
        <Select
          label="Table"
          placeholder="Select a table"
          value={selectedTable}
          onChange={(value) => setSelectedTable(value || "")}
          data={tables.map((table) => ({ value: table, label: table }))}
        />
        <MultiSelect
          label="Columns"
          placeholder="Select columns"
          value={selectedColumns}
          onChange={(value) => setSelectedColumns(value)}
          data={columns.map((column) => ({ value: column, label: column }))}
        />
        <TextInput
          label="Conditions"
          placeholder="e.g., id > 10"
          value={conditions}
          onChange={(e) => setConditions(e.target.value)}
        />
        <Button
          onClick={handleExecuteQuery}
          mt="lg"
          style={{ backgroundColor: "#02D4C3" }}
          //   variant="gradient"
          //   gradient={{ from: 'indigo', to: 'cyan' }}
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
