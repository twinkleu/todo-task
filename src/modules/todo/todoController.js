import Todo from "../../models/task";
import moment from "moment";

export const createTodo = async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;
    if (!title || !description || !dueDate || !status) {
      return res.status(400).json({
        success: false,
        message: "Complete details are requred to creating the task",
      });
    }
    const userId = req.user._id;

    const task = Todo.create({
      title: title,
      description: description,
      dueDate: dueDate,
      status: status,
      userId: userId,
    });
    if (!task) {
      return res
        .status(500)
        .json({ success: false, message: "Error while creating task" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Created Successfully", data: task });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error while creating task" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const { title, description, dueDate, status } = req.body;

    if (!title || !description || !dueDate || !status) {
      return res.status(400).json({
        success: false,
        message: "Complete details are requred to updating the task",
      });
    }
    const todo = Todo.findByIdAndUpdate(
      {
        id: id,
        userId: userId,
      },
      {
        $set: {
          title: title,
          description: description,
          dueDate: dueDate,
          status: status,
        },
      },
      {
        new: true,
      }
    );

    if (!todo) {
      return res
        .status(500)
        .json({ success: false, message: "Error while updating the task" });
    }

    return res.status(200).json({
      success: true,
      message: "Todo Updated Successfully",
      data: todo,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error while updating task" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const todo = Todo.findByIdAndUpdate(
      {
        id: id,
        userId: userId,
      },
      {
        $set: {
          isDeleted: true,
        },
      },
      {
        new: true,
      }
    );

    if (!todo) {
      return res
        .status(500)
        .json({ success: false, message: "Error while deleting the task" });
    }

    return res.status(200).json({
      success: true,
      message: "Todo deleted Successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error while deleting task" });
  }
};

export const getTodos = async (req, res) => {
  try {
    const { status } = req.query;
    const userId = req.user._id;

    if (status) {
      if (!["TODO", "Backlog", "In-Progress", "Done"].includes(status)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid Value" });
      }
    }

    const todo = Todo.find({
      userId: userId,
      status: status,
    });
    if (!todo || todo.length === 0) {
      return res
        .status(500)
        .json({ success: false, message: "No Tasks Found" });
    }

    return res.status(200).json({
      success: true,
      message: "Todo Found Successfully",
      data: todo,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "No Tasks Found" });
  }
};

export const getOverDueTodos = async (req, res) => {
  try {
    const userId = req.user._id;

    const todo = Todo.find({
      userId: userId,
      status: { $ne: "DONE" },
      dueDate: { $lt: moment().toDate() }, //date will come before from today
    });
    if (!todo || todo.length === 0) {
      return res
        .status(500)
        .json({ success: false, message: "No Tasks Found" });
    }

    return res.status(200).json({
      success: true,
      message: "Todo Found Successfully",
      data: todo,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "No Tasks Found" });
  }
};
