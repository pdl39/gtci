const round = (num, precision) => {
  const multiplier = Math.pow(10, precision || 0);
  const roundedNum = Math.round(num * multiplier) / multiplier;

  return roundedNum;
}

module.exports = round;
