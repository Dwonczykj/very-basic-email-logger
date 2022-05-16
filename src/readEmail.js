import { saveThreadToSheetStorage } from './sheetRepoLayer';

export function isThreadProcessed(threadMsgs) {
  const key = 'joeyd filters';
  const props = PropertiesService.getScriptProperties();
  const when = threadMsgs[0].getDate().getTime();
  const last = props.getProperty(key) ? parseInt(props.getProperty(key), 10) : 0;
  props.setProperty(key, when.toString());
  if (threadMsgs.length === 1 && parseInt(when, 10) >= parseInt(last, 10)) {
    return false;
  }
  return true;
}

export function readGmail(limitCount = 20) {
  try {
    const threads = GmailApp.search('in:inbox is:unread', 0, limitCount);
    if (threads.length > 0) {
      for (let t = threads.length - 1; t >= 0; t -= 1) {
        const messages = threads[t].getMessages();
        if (!isThreadProcessed(messages)) {
          Logger.log(`Processing ${messages[0].getDate()} :: ${messages[0].getSubject()}`);
          // message.getRawContent();
          saveThreadToSheetStorage(messages[0].getFrom(), messages[0].getSubject());
        } else {
          Logger.log(`Skipping ${messages[0].getDate()} :: ${messages[0].getSubject()}`);
        }
      }
    }
  } catch (e) {
    Logger.log(e.toString());
  }
}
