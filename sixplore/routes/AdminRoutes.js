const express = require('express');
const router = express.Router();
const ProposalItem = require("../models/ProposalItem");
const ExplorationItem = require("../models/ExplorationItem");

router.get('/event-proposals', async (req, res) => {
    try {
        const proposalItems = await ProposalItem.find();

        res.json(proposalItems);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/new-event-proposal', async (req, res) => {
    try {
        const newProposalItem = new ProposalItem(req.body);

        const savedProposalItem = await newProposalItem.save();

        res.status(201).json(savedProposalItem);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/add-approved-event', async (req, res) => {
    try {
        const newExplorationItem = new ExplorationItem(req.body);

        const savedExplorationItem = await newExplorationItem.save();

        res.status(201).json(savedExplorationItem);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/delete-event-proposal/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProposalItem = await ProposalItem.findByIdAndDelete(id);
        if (!deletedProposalItem) {
            return res.status(404).json({ message: 'Proposal item not found' });
        }
        res.json({ message: 'Proposal item deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;