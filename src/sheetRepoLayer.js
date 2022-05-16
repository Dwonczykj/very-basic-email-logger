export const saveThreadToSheetStorage = (emailFrom, emailSubject) => {
  const sheet = SpreadsheetApp.getActiveSheet();
  sheet.appendRow([emailFrom, emailSubject]);
};
