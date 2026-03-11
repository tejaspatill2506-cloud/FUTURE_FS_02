const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/leadflowCRM", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Lead = require("./models/Lead");

// CREATE Lead
app.post("/api/leads", async (req, res) => {
  const newLead = new Lead(req.body);
  await newLead.save();
  res.json(newLead);
});

// READ Leads
app.get("/api/leads", async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
});

// UPDATE Lead
app.put("/api/leads/:id", async (req, res) => {
  const updated = await Lead.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE Lead
app.delete("/api/leads/:id", async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ message: "Lead Deleted" });
});

app.listen(5000, () => console.log("CRM Server Running on http://localhost:5000"));
