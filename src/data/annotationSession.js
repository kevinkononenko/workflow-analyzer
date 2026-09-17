const sessionCalibration = new Map();

export function updateSessionCalibration(recordId, changes) {
  const current = sessionCalibration.get(recordId) ?? {};
  sessionCalibration.set(recordId, { ...current, ...changes });
}

export function getSessionCalibration(recordId) {
  return sessionCalibration.get(recordId);
}
