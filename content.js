function getAttendees() {
    const attendees = [];
    const elements = document.querySelectorAll('[data-self-name="You"], [data-participant-id]');
    elements.forEach(el => {
      const name = el.textContent.trim();
      if (name && !attendees.includes(name)) {
        attendees.push(name);
      }
    });
    return attendees;
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getAttendees") {
      sendResponse({attendees: getAttendees()});
    }
  });