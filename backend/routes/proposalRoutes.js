// backend/routes/proposalRoutes.js
const express = require('express');
const Proposal = require('../models/Proposal');
const AgendaItem = require('../models/AgendaItem');
const sendMail = require('../services/mailer');

const router = express.Router();

// Get all proposals
router.get('/proposals', async (req, res) => {
  const proposals = await Proposal.find();
  res.json(proposals);
});

// Create a new proposal
router.post('/proposals', async (req, res) => {
  const { title, description, author, email } = req.body;
  const newProposal = new Proposal({ title, description, author, email });
  await newProposal.save();

  // Send email notification for proposal submission
  sendMail(email, 'Proposal Submission Confirmation', `Your proposal titled "${title}" has been submitted.`)
    .then(() => {
      console.log('Submission email sent');
      res.status(201).json(newProposal);
    })
    .catch(error => {
      console.error('Error sending submission email:', error);
      res.status(500).json({ error: 'Error sending submission email' });
    });
});

// Approve a proposal
router.put('/proposals/:id/approve', async (req, res) => {
  try {
    const proposal = await Proposal.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    const newAgendaItem = new AgendaItem({ title: proposal.title, author: proposal.author });
    await newAgendaItem.save();

    // Send email notification for proposal approval
    sendMail(proposal.email, 'Proposal Approved', `Your proposal titled "${proposal.title}" has been approved and added to the agenda.`)
      .then(() => console.log('Approval email sent'))
      .catch(error => console.error('Error sending approval email:', error));

    res.json(proposal);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while approving the proposal' });
  }
});

// Reject a proposal
router.put('/proposals/:id/reject', async (req, res) => {
  try {
    const proposal = await Proposal.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );

    // Send email notification for proposal rejection
    sendMail(proposal.email, 'Proposal Rejected', `Your proposal titled "${proposal.title}" has been rejected.`)
      .then(() => console.log('Rejection email sent'))
      .catch(error => console.error('Error sending rejection email:', error));

    res.json(proposal);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while rejecting the proposal' });
  }
});

module.exports = router;
