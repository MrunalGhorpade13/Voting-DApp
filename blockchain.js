class VotingBlockchain extends Blockchain {
  constructor(customCandidates) {
    super();
    // Initialize with custom names
    this.candidates = customCandidates.map((name, idx) => ({
      id: idx + 1,
      name,
      votes: 0,
    }));
  }

  vote(candidateName) {
    const candidate = this.candidates.find(c => c.name === candidateName);
    if (!candidate) return { success: false, message: "Invalid candidate" };

    candidate.votes++;
    this.addBlock(
      new Block(this.chain.length, new Date().toISOString(), { candidateName })
    );

    return { success: true, message: `Vote recorded for ${candidate.name}` };
  }

  getCandidates() {
    return this.candidates;
  }
}

// Export with your custom names
module.exports = new VotingBlockchain(["Madhura", "Rohan", "Sneha", "Karan"]);
