const moment = require("moment");
const transectionModel = require("../models/transectionModel");

const getAllTransection = async (req, res) => {
  try {
    const { frequency, selectDate, type } = req.body;

    // Build the query object
    const query = {
      userid: req.body.userid,
      ...(type !== "all" && { type }), // Filter by type if it's not "all"
    };

    // Handle date filtering
    if (frequency !== "custom") {
      query.date = {
        $gt: moment().subtract(Number(frequency), "days").toDate(),
      };
    } else if (selectDate && selectDate.length === 2) {
      query.date = {
        $gte: moment(selectDate[0]).startOf("day").toDate(),
        $lte: moment(selectDate[1]).endOf("day").toDate(),
      };
    }

    // Fetch transactions based on the query
    const transections = await transectionModel.find(query).sort({ date: -1 });

    res.status(200).json(transections);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Failed to fetch transactions", error });
  }
};

const deleteTransection = async (req, res) => {
  try {
    await transectionModel.findByIdAndDelete(
      { _id: req.body.transectionId },
      req.body.payload
    );
    res.status(200).send("Delete SuccessFully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const editTransection = async (req, res) => {
  try {
    await transectionModel.findByIdAndUpdate(
      { _id: req.body.transectionId },
      req.body.payload
    );
    res.status(200).send("Edit SuccessFully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addTransection = async (req, res) => {
  try {
    const newTransection = new transectionModel(req.body);
    await newTransection.save();
    res.status(201).json({ message: "Transaction Created Successfully" });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ message: "Failed to create transaction", error });
  }
};

module.exports = {
  getAllTransection,
  addTransection,
  editTransection,
  deleteTransection,
};
