const sendEmail = (data) => {
  const { to, from, subject, body } = data;
  try {
    GmailApp.sendEmail(to, subject, body, {
      from,
    });
  } catch (f) {
    try {
      MailApp.sendEmail(to, subject, body, {
        from,
      });
    } catch (error) {
      return `Error: ${error.toString()}`;
    }
  }
  return `Email sent to ${to}`;
};

export default sendEmail;
