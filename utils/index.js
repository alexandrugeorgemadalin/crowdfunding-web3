export const daysLeft = (deadline) => {
  const remainingDays = (deadline - Date.now()) / (1000 * 60 * 60 * 24);

  return Math.max(remainingDays.toFixed(0), 0);
};

export const countBackers = (donations) => {
  const backers = donations.map((donation) => donation.backer);
  const uniqueBackers = [...new Set(backers)];

  return uniqueBackers.length;
};
