import "./App.css";
import Task from "./Components/Task";
import { useState } from "react";
import { useEffect } from "react";
import { Button, TextField, Box, Input } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { v4 as uuidv4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState([
    {
      text: "This is your first task",
      id: 0,
      completed: false,
    },
    {
      text: "Another task",
      id: 1,
      completed: false,
    },
  ]);

  useEffect(() => {
    const datosguardados = localStorage.getItem("LocalStorageData");
    if (datosguardados) {
      setTasks(JSON.parse(datosguardados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("LocalStorageData", JSON.stringify(tasks));
  });

  const [text, setText] = useState("");
  const [inputtext, setInputtext] = useState("editar tarea...");
  const [editid, setEditid] = useState(0);
  const [open, setOpen] = useState(false);

  const onDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setTasks([
      ...tasks,
      { text: e.target[0].value, id: uuidv4(), completed: false },
    ]);
    setText("");
  };

  const onClick = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const onEdit = (id) => {
    setEditid(id);
    setInputtext(tasks.filter((task) => task.id === id)[0].text);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSubmit = () => {
    setOpen(false);
    setTasks(
      tasks.map((task) =>
        task.id === editid ? { ...task, text: inputtext } : task
      )
    );
    setInputtext("");
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4">TODO list</Typography>
        </Toolbar>
      </AppBar>

      <form noValidate autoComplete="off" onSubmit={onSubmit}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt={5}
          mb={3}
        >
          <TextField
            id="standard-basic"
            label="New task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            type="default"
            color="primary"
            variant="contained"
            size="small"
          >
            Add
          </Button>
        </Box>
      </form>

      <Container maxWidth="sm">
        <List component="nav" aria-label="secondary mailbox folders">
          <Divider />
          <Task
            tasks={tasks}
            onDelete={onDelete}
            onClick={onClick}
            onEdit={onEdit}
          />
        </List>
      </Container>

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit task</DialogTitle>
          <DialogContent>
            <Input
              autoFocus
              fullWidth
              value={inputtext}
              onChange={(e) => setInputtext(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCloseSubmit} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default App;
