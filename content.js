let attendees = {};

function updateAttendees() {
  const elements = document.querySelectorAll('[data-self-name="You"], [data-participant-id]');
  const currentTime = new Date().toISOString();
  
  elements.forEach(el => {
    const name = el.textContent.trim();
    if (name) {
      if (!attendees[name]) {
        attendees[name] = { joinTime: currentTime, leftTime: null };
      } else if (attendees[name].leftTime) {
        attendees[name].leftTime = null; // They've rejoined
      }
    }
  });

  // Mark absent attendees as left
  Object.keys(attendees).forEach(name => {
    if (!Array.from(elements).some(el => el.textContent.trim() === name)) {
      if (!attendees[name].leftTime) {
        attendees[name].leftTime = currentTime;
      }
    }
  });

  chrome.storage.local.set({ attendees: attendees });
}

setInterval(updateAttendees, 5000); // Check every 5 seconds

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getAttendees") {
    sendResponse({ attendees: Object.keys(attendees).filter(name => !attendees[name].leftTime) });
  }
});