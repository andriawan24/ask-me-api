/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const portFix = parseInt(val, 10);

  if (Number.isNaN(portFix)) {
    return val;
  }

  if (portFix >= 0) {
    return portFix;
  }

  return false;
}

module.exports = normalizePort;
