import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const Task = ({ tasks, onDelete, onClick, onEdit }) => {
  return (
    <>
      {tasks.map((task) => (
        <span key={task.id}>
          <ListItem dense>
            <ListItemIcon>
              <Checkbox
                color="default"
                edge="start"
                checked={task.tachado}
                onChange={() => onClick(task.id)}
              />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={
                task.tachado
                  ? {
                      style: {
                        textDecoration: "line-through",
                        color: "lightgray",
                      },
                    }
                  : {}
              }
              primary={task.text}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => onEdit(task.id)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onDelete(task.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </span>
      ))}
    </>
  );
};

export default Task;
